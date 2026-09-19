import { motion, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { flavors, type Flavor } from '../data/flavors'
import { useFlavor } from '../state/flavor'
import { FruitIcon } from './FruitIcon'

const N = flavors.length

/**
 * Лента вкусов: карточки едут по эллиптической дуге вокруг стакана.
 * Её можно тянуть мышкой или пальцем — цвет напитка перетекает по дороге.
 * За стаканом в покое никто не прячется: посередине дуги оставлен просвет.
 */
export function FlavorArc() {
  const { pos, select, beginInteract, endInteract, setDragging, selectedIndex } = useFlavor()
  const geo = useArcGeometry()

  const dragging = useRef(false)
  const startX = useRef(0)
  const startPos = useRef(0)
  const moved = useRef(0)
  const lastX = useRef(0)
  const lastT = useRef(0)
  const velocity = useRef(0)
  const downIndex = useRef<number | null>(null)
  const [grabbing, setGrabbing] = useState(false)

  const pxPerCard = (geo.rx * geo.step * Math.PI) / 180 / 1.6

  const onDown = (e: React.PointerEvent) => {
    downIndex.current = cardUnder(e.clientX, e.clientY)
    dragging.current = true
    setGrabbing(true)
    setDragging(true)
    startX.current = e.clientX
    lastX.current = e.clientX
    lastT.current = performance.now()
    velocity.current = 0
    startPos.current = pos.get()
    moved.current = 0
    beginInteract()
    try {
      ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    } catch {
      /* указателя уже нет — переживём */
    }
  }

  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - startX.current
    moved.current = Math.max(moved.current, Math.abs(dx))
    pos.set(startPos.current - dx / pxPerCard)

    const now = performance.now()
    const dt = now - lastT.current
    if (dt > 8) {
      velocity.current = (e.clientX - lastX.current) / dt
      lastX.current = e.clientX
      lastT.current = now
    }
  }

  const onUp = () => {
    if (!dragging.current) return
    dragging.current = false
    setGrabbing(false)

    if (moved.current <= 6 && downIndex.current !== null) {
      // это был клик по карточке, а не свайп
      select(downIndex.current)
    } else {
      // резкий свайп добрасывает на соседний вкус
      const fling = Math.max(-1, Math.min(1, Math.round((-velocity.current * 220) / pxPerCard)))
      const target = Math.round(pos.get()) + fling
      select(((target % N) + N) % N)
    }
    downIndex.current = null
    setDragging(false)
    endInteract()
  }

  return (
    <div
      className={`absolute inset-0 z-20 ${grabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      role="group"
      aria-label="Лента вкусов: тяните в сторону или нажмите на карточку"
    >
      <div className="absolute left-1/2 top-1/2" style={{ transform: `translate(-50%, ${geo.pivot}px)` }}>
        {flavors.map((f, i) => (
          <ArcCard
            key={f.id}
            flavor={f}
            index={i}
            geo={geo}
            pos={pos}
            active={i === selectedIndex}
            onPick={(fromKeyboard) => {
              if (!fromKeyboard) return
              select(i)
              endInteract()
            }}
          />
        ))}
      </div>
    </div>
  )
}

/** какая карточка под точкой — прозрачные не в счёт */
function cardUnder(x: number, y: number): number | null {
  for (const el of document.elementsFromPoint(x, y)) {
    const card = (el as HTMLElement).closest?.('[data-flavor-index]') as HTMLElement | null
    if (!card) continue
    const wrap = card.parentElement
    if (wrap && Number(getComputedStyle(wrap).opacity) < 0.35) return null
    return Number(card.dataset.flavorIndex)
  }
  return null
}

type Geo = ReturnType<typeof useArcGeometry>

function ArcCard({
  flavor,
  index,
  geo,
  pos,
  active,
  onPick,
}: {
  flavor: Flavor
  index: number
  geo: Geo
  pos: MotionValue<number>
  active: boolean
  onPick: (fromKeyboard: boolean) => void
}) {
  /** угол карточки на дуге; +0.5 шага — чтобы по центру, за стаканом, был просвет */
  const angle = useTransform(pos, (p) => {
    let d = (((index - p) % N) + N) % N
    if (d > N / 2) d -= N
    return (d + 0.5) * geo.step
  })

  const x = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * geo.rx)
  const y = useTransform(angle, (a) => geo.ry - Math.cos((a * Math.PI) / 180) * geo.ry)
  const rotate = useTransform(angle, (a) => a * 0.42)
  // Видны только четыре ближние карточки: следующая пара гаснет раньше,
  // чем успевает сползти на фон.
  const opacity = useTransform(angle, (a) => {
    const start = geo.step * 1.6
    const end = geo.step * 2.15
    return Math.max(0, Math.min(1, (end - Math.abs(a)) / (end - start)))
  })
  const scale = useTransform(angle, (a) => 1 - (Math.min(Math.abs(a), 120) / 120) * 0.32)

  return (
    <motion.div className="absolute left-0 top-0" style={{ x, y, rotate, opacity, scale }}>
      <button
        type="button"
        onClick={(e) => onPick(e.detail === 0)}
        aria-label={`Вкус ${flavor.ru}`}
        aria-pressed={active}
        data-flavor-index={index}
        className="group absolute left-0 top-0 rounded-[28%] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--f-glow)]"
        style={{
          width: geo.card,
          height: geo.card,
          marginLeft: -geo.card / 2,
          marginTop: -geo.card / 2,
        }}
      >
        <div
          className="relative grid h-full w-full place-items-center rounded-[28%] border bg-milk transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5 group-hover:scale-105"
          style={{
            borderColor: active ? 'var(--f-glow)' : 'rgba(255,255,255,0.55)',
            boxShadow: active
              ? '0 26px 70px -18px color-mix(in oklab, var(--f-glow) 80%, transparent)'
              : '0 30px 60px -22px rgba(0,0,0,0.7)',
          }}
        >
          <FruitIcon
            kind={flavor.fruit}
            className="pointer-events-none h-[70%] w-[70%] drop-shadow-[0_10px_14px_rgba(0,0,0,0.25)]"
          />
          <span className="pointer-events-none absolute bottom-[8%] font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-bark/70">
            {flavor.name.split(' ')[0]}
          </span>
        </div>
      </button>
    </motion.div>
  )
}

/** Дуга — эллипс: шире, чем выше, поэтому карточки обходят стакан по бокам */
function useArcGeometry() {
  const [w, setW] = useState(() => (typeof window === 'undefined' ? 1440 : window.innerWidth))

  useEffect(() => {
    const onResize = () => setW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (w < 640) return { rx: 330, ry: 150, pivot: 80, card: 74, step: 54 }
  if (w < 1024) return { rx: 520, ry: 300, pivot: 10, card: 110, step: 44 }
  if (w < 1440) return { rx: 600, ry: 350, pivot: -20, card: 130, step: 42 }
  return { rx: 660, ry: 390, pivot: -40, card: 150, step: 40 }
}
