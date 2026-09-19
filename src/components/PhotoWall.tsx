import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Reveal } from './Reveal'

type Shot = { src: string; alt: string; caption: string }

/** Все снимки импортируются, поэтому при сборке уезжают внутрь index.html */
const files = import.meta.glob('../assets/photos/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const photo = (name: string) => files[`../assets/photos/${name}.webp`]

const shots: Shot[] = [
  { src: 'brown-sugar', alt: 'Стакан с карамельными подтёками', caption: 'Brown Sugar' },
  { src: 'sakura-hand', alt: 'Стакан бабл-ти в руке под цветущей сакурой', caption: 'Сакура в апреле' },
  { src: 'amber-glow', alt: 'Янтарный чай с жемчугом в тёмном зале', caption: 'Вечерняя витрина' },
  { src: 'matcha-taro', alt: 'Матча и таро со взбитой шапкой', caption: 'Матча и таро' },
  { src: 'sunlit-tea', alt: 'Чай со льдом в солнечном свете', caption: 'Полдень на веранде' },
  { src: 'strawberry-studio', alt: 'Клубничный напиток на красном фоне', caption: 'Клубника-студия' },
  { src: 'tall-glass', alt: 'Высокий бокал с жемчугом', caption: 'Классика' },
  { src: 'counter-row', alt: 'Ряд стаканов на стойке во время сборки', caption: 'Сборка заказа' },
]

export function PhotoWall() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<Shot | null>(null)
  // на узких экранах колонки не смещаем — сетка должна быть ровной
  const wide = useMediaQuery('(min-width: 1024px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const colA = useTransform(scrollYProgress, [0, 1], ['4%', '-8%'])
  const colB = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section
      id="photos"
      ref={ref}
      className="relative z-10 overflow-hidden bg-[var(--f-bg-b)] px-5 py-24 flavor-tween sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2.3rem,6vw,5.5rem)] leading-[0.95] text-milk">
            Атмосфера <span className="italic text-[var(--f-glow)] flavor-tween">чайной</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-cream/60">
            Снимки из зала и со стойки. Нажми на любой — откроется крупно.
          </p>
        </Reveal>

        {/* четыре колонки одинаковой ширины: две крайние едут медленнее — сетка остаётся ровной */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[0, 1, 2, 3].map((col) => (
            <motion.div
              key={col}
              style={wide ? { y: col % 2 === 0 ? colA : colB } : undefined}
              className="flex flex-col gap-3 sm:gap-4"
            >
              {shots
                .filter((_, i) => i % 4 === col)
                .map((s, i) => (
                  <Tile key={s.src} shot={s} delay={i * 0.08} onOpen={() => setOpen(s)} />
                ))}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center bg-black/85 p-4 backdrop-blur-xl sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.figure
              layoutId={`shot-${open.src}`}
              className="relative max-h-full w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/15"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={photo(`${open.src}-wide`)} alt={open.alt} className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 font-display text-2xl text-milk">
                {open.caption}
              </figcaption>
            </motion.figure>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Закрыть"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-milk transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Tile({ shot, delay, onOpen }: { shot: Shot; delay: number; onOpen: () => void }) {
  return (
    <Reveal delay={delay} y={30}>
      <motion.button
        type="button"
        layoutId={`shot-${shot.src}`}
        onClick={onOpen}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="group relative block aspect-4/5 w-full overflow-hidden rounded-2xl border border-white/12 sm:rounded-3xl"
      >
        <img
          src={photo(shot.src)}
          alt={shot.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-3 left-4 right-4 text-left text-[11px] uppercase tracking-[0.18em] text-milk/85 sm:bottom-4 sm:left-5">
          {shot.caption}
        </span>
      </motion.button>
    </Reveal>
  )
}
