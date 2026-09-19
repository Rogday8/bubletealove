import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import sakuraBlur from '../assets/media/sakura-blur.webp'
import { useFlavor } from '../state/flavor'
import { BobaCup } from './BobaCup'
import { FlavorArc } from './FlavorArc'
import { Mound } from './Mound'

export function Hero() {
  const { flavor } = useFlavor()
  const stage = useRef<HTMLDivElement>(null)

  // Параллакс от курсора: каждый слой едет со своей скоростью
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 })

  const bgX = useTransform(sx, [-1, 1], [26, -26])
  const bgY = useTransform(sy, [-1, 1], [18, -18])
  const arcX = useTransform(sx, [-1, 1], [-18, 18])
  const cupX = useTransform(sx, [-1, 1], [-34, 34])
  const cupY = useTransform(sy, [-1, 1], [-16, 16])
  const cupRot = useTransform(sx, [-1, 1], [-4, 4])
  const titleX = useTransform(sx, [-1, 1], [14, -14])

  useEffect(() => {
    const el = stage.current
    if (!el) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
      my.set(((e.clientY - r.top) / r.height) * 2 - 1)
    }
    const onLeave = () => {
      mx.set(0)
      my.set(0)
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [mx, my])

  return (
    <section
      id="top"
      ref={stage}
      className="grain relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      {/* ——— слой 1: фон ——— */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute -inset-16 z-0">
        <div
          className="absolute inset-0 flavor-tween"
          style={{
            background:
              'radial-gradient(95% 70% at 50% 6%, color-mix(in oklab, var(--f-bg-a) 72%, #ffffff) 0%, var(--f-bg-a) 34%, var(--f-bg-b) 74%, #100507 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-85 flavor-tween"
          style={{
            background:
              'radial-gradient(34% 30% at 50% 48%, color-mix(in oklab, var(--f-glow) 85%, transparent) 0%, transparent 72%)',
            filter: 'blur(30px)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(75% 55% at 50% 100%, rgba(10,4,6,0.85), transparent 70%)' }}
        />
        <img
          src={sakuraBlur}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-soft-light"
        />
        <AmbientBubbles />
      </motion.div>

      <Mound />

      {/* ——— слой 2: крупная надпись, стакан её перекрывает ——— */}
      <motion.h1
        style={{ x: titleX }}
        className="pointer-events-none absolute bottom-[3.5vh] left-1/2 z-10 w-full -translate-x-1/2 whitespace-nowrap px-3 text-center font-display text-[clamp(2.3rem,8.8vw,9.5rem)] leading-[0.85] text-milk/90"
      >
        <span className="italic">Выбери</span> свой вкус
      </motion.h1>

      {/* ——— слой 3: имя вкуса — над крышкой, чтобы стакан его не закрывал ——— */}
      <div className="pointer-events-none absolute inset-x-0 top-[15%] z-[15] flex justify-center px-4 sm:top-[14%] lg:top-[12%]">
        <AnimatePresence mode="wait">
          <motion.span
            key={flavor.id}
            initial={{ opacity: 0, y: 26, filter: 'blur(14px)' }}
            animate={{ opacity: 0.95, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -26, filter: 'blur(14px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="whitespace-nowrap font-display text-[clamp(1.9rem,5.2vw,5rem)] italic leading-none text-milk"
            style={{ textShadow: '0 14px 40px rgba(20,6,8,0.55)' }}
          >
            {flavor.name}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ——— слой 4: веер вкусов ——— */}
      <motion.div style={{ x: arcX }} className="absolute inset-0 z-20">
        <FlavorArc />
      </motion.div>

      {/* ——— слой 5: сам стакан, отдельным «вырезанным» слоем ——— */}
      <motion.div
        style={{ x: cupX, y: cupY, rotate: cupRot }}
        className="pointer-events-none relative z-30 -mt-[6vh] h-[52svh] max-h-[760px] min-h-[320px] sm:-mt-[4vh] sm:h-[64svh] lg:h-[70svh]"
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="h-full"
        >
          <BobaCup className="h-full w-auto drop-shadow-[0_50px_60px_rgba(0,0,0,0.45)]" />
        </motion.div>
      </motion.div>

      {/* ——— слой 6: интерфейс ——— */}
      <div className="pointer-events-none absolute inset-0 z-40">
        {/* компактная подпись вкуса — для экранов, где боковых колонок нет */}
        <div className="absolute inset-x-0 top-[66%] flex justify-center px-6 lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={flavor.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
            >
              <span className="text-[13px] font-semibold text-milk">{flavor.ru}</span>
              <span className="h-3 w-px bg-white/25" />
              <span className="text-[13px] font-bold tabular-nums text-[var(--f-glow)] flavor-tween">
                {flavor.price} ₽
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* состав слева */}
        <div className="absolute left-5 top-[34%] hidden -translate-y-1/2 lg:block xl:left-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-cream/45">Состав</p>
          <AnimatePresence mode="wait">
            <motion.ul
              key={flavor.id}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-1.5"
            >
              {flavor.notes.map((n) => (
                <li key={n} className="font-display text-xl italic text-milk/85">
                  {n}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* цифры справа */}
        <div className="absolute right-5 top-[34%] hidden -translate-y-1/2 text-right lg:block xl:right-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={flavor.id}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <Stat label="ккал" value={String(flavor.kcal)} />
              <Stat label="сладость" value={`${flavor.sweetness}%`} />
              <div className="flex justify-end">
                <div className="h-24 w-1.5 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="w-full rounded-full bg-[var(--f-glow)] flavor-tween"
                    style={{ height: `${flavor.sweetness}%`, marginTop: `${100 - flavor.sweetness}%` }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-3xl leading-none text-milk tabular-nums">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-cream/45">{label}</p>
    </div>
  )
}

function AmbientBubbles() {
  const dots = Array.from({ length: 22 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    size: 6 + ((i * 11) % 46),
    delay: (i * 0.9) % 16,
    dur: 12 + ((i * 3) % 12),
  }))
  return (
    <div className="absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full border border-white/20 bg-white/5 backdrop-blur-[1px]"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animation: `drift ${d.dur}s ease-in-out ${d.delay}s infinite`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  )
}
