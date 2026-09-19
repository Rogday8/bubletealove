import { animate, useMotionValue, type MotionValue } from 'motion/react'
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { flavors, type Flavor } from '../data/flavors'

/** Пауза между самостоятельными поворотами ленты. */
const AUTOPLAY_MS = 6000
/** Столько тишины должно пройти после клика или свайпа, чтобы лента поехала сама. */
const RESUME_MS = 2500
/** Длительность одного поворота. */
const STEP_S = 1.3

const N = flavors.length

type FlavorState = {
  /** вкус, который сейчас в стакане (округление позиции ленты) */
  flavor: Flavor
  selected: Flavor
  index: number
  selectedIndex: number
  /** шаг налива — по нему стакан делает «всплеск» */
  pour: number
  /** непрерывная позиция ленты: 2.5 — ровно между третьим и четвёртым вкусом */
  pos: MotionValue<number>
  /** доехать до вкуса по кратчайшему пути */
  select: (index: number) => void
  next: () => void
  prev: () => void
  /** палец на ленте: остановить всё, что крутится */
  beginInteract: () => void
  /** палец убрали: через пару секунд лента поедет сама */
  endInteract: () => void
  /** пока тянем — не делаем «всплеск» на каждый промежуточный вкус */
  setDragging: (on: boolean) => void
}

const Ctx = createContext<FlavorState | null>(null)

export function FlavorProvider({ children }: { children: ReactNode }) {
  const pos = useMotionValue(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [pour, setPour] = useState(0)
  const dragging = useRef(false)
  const timer = useRef<number | null>(null)
  const running = useRef<{ stop: () => void } | null>(null)

  const api = useMemo<FlavorState>(() => {
    const stopMotion = () => {
      running.current?.stop()
      running.current = null
    }
    const clearTimer = () => {
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = null
    }
    const goTo = (target: number, duration = STEP_S) => {
      stopMotion()
      running.current = animate(pos, target, {
        duration,
        ease: [0.32, 0.72, 0.24, 1],
        onComplete: () => {
          running.current = null
        },
      })
    }
    /** ближайшее представление индекса i относительно текущей позиции */
    const nearest = (i: number) => {
      const p = pos.get()
      let d = (((i - p) % N) + N) % N
      if (d > N / 2) d -= N
      return p + d
    }
    const step = () => {
      goTo(Math.round(pos.get()) + 1)
      clearTimer()
      timer.current = window.setTimeout(step, AUTOPLAY_MS + STEP_S * 1000)
    }
    const beginInteract = () => {
      clearTimer()
      stopMotion()
    }
    const endInteract = () => {
      clearTimer()
      timer.current = window.setTimeout(step, RESUME_MS)
    }

    return {
      flavor: flavors[selectedIndex],
      selected: flavors[selectedIndex],
      index: selectedIndex,
      selectedIndex,
      pour,
      pos,
      select: (i) => {
        beginInteract()
        goTo(nearest(i), 0.9)
        endInteract()
      },
      next: () => {
        beginInteract()
        goTo(Math.round(pos.get()) + 1, 0.9)
        endInteract()
      },
      prev: () => {
        beginInteract()
        goTo(Math.round(pos.get()) - 1, 0.9)
        endInteract()
      },
      beginInteract,
      endInteract,
      setDragging: (on) => {
        dragging.current = on
      },
    }
  }, [pos, selectedIndex, pour])

  // Цвета пересчитываются на каждом кадре — поэтому при свайпе напиток
  // перетекает из вкуса во вкус, а не переключается рывком.
  useEffect(() => {
    const apply = (p: number) => {
      const w = ((p % N) + N) % N
      const i = Math.floor(w)
      const j = (i + 1) % N
      const t = w - i
      const a = flavors[i].colors
      const b = flavors[j].colors
      const root = document.documentElement.style
      root.setProperty('--f-foam', mix(a.foam, b.foam, t))
      root.setProperty('--f-top', mix(a.top, b.top, t))
      root.setProperty('--f-bottom', mix(a.bottom, b.bottom, t))
      root.setProperty('--f-pearl', mix(a.pearl, b.pearl, t))
      root.setProperty('--f-glow', mix(a.glow, b.glow, t))
      root.setProperty('--f-ink', mix(a.ink, b.ink, t))
      root.setProperty('--f-bg-a', mix(a.bgA, b.bgA, t))
      root.setProperty('--f-bg-b', mix(a.bgB, b.bgB, t))

      const nearestIndex = Math.round(w) % N
      setSelectedIndex((prev) => {
        if (prev === nearestIndex) return prev
        if (!dragging.current) setPour((n) => n + 1)
        return nearestIndex
      })
    }
    apply(pos.get())
    return pos.on('change', apply)
  }, [pos])

  // Первый самостоятельный поворот
  useEffect(() => {
    api.endInteract()
    return () => api.beginInteract()
    // запускаем один раз: дальше цикл поддерживает сам себя
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Стрелки клавиатуры листают вкусы
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') api.next()
      if (e.key === 'ArrowLeft') api.prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [api])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useFlavor() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useFlavor должен вызываться внутри <FlavorProvider/>')
  return ctx
}

/** Линейная смесь двухhex-цветов */
function mix(a: string, b: string, t: number) {
  const pa = parse(a)
  const pb = parse(b)
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t))
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

function parse(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}
