import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from './Reveal'

const steps = [
  {
    n: '01',
    title: 'Завариваем',
    text: 'Листовой улун и ассам, вода 85° и ровно четыре минуты. Никаких порошковых концентратов.',
  },
  {
    n: '02',
    title: 'Варим тапиоку',
    text: 'Жемчуг варится 25 минут и ещё полчаса настаивается в тростниковом сиропе — остаётся упругим.',
  },
  {
    n: '03',
    title: 'Собираем слоями',
    text: 'Сначала жемчуг, потом лёд, следом чай и молочная шапка. Тот самый градиент в стакане.',
  },
  {
    n: '04',
    title: 'Отдаём за 90 секунд',
    text: 'Стакан запечатывается плёнкой, трубочка широкая — жемчуг проходит свободно.',
  },
]

export function Ritual() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8])
  const line = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '100%'])

  return (
    <section
      id="ritual"
      ref={ref}
      className="relative z-10 overflow-hidden bg-[var(--f-bg-b)] px-5 py-24 flavor-tween sm:px-10 sm:py-32"
    >
      <motion.div
        style={{ y, rotate }}
        className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl flavor-tween"
      >
        <div className="h-full w-full rounded-full bg-[var(--f-glow)]" />
      </motion.div>

      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 max-w-2xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--f-glow)] flavor-tween">
            Ритуал
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-milk">
            Как рождается <span className="italic">стакан</span>
          </h2>
        </Reveal>

        <div className="relative grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 top-0 hidden h-px w-full bg-white/10 lg:block">
            <motion.div style={{ width: line }} className="h-px bg-[var(--f-glow)] flavor-tween" />
          </div>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.09} className="group relative border-t border-white/10 pt-8 lg:border-t-0">
              <span className="font-display text-6xl text-milk/15 transition-colors duration-700 group-hover:text-[var(--f-glow)]">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-2xl text-milk">{s.title}</h3>
              <p className="mt-3 max-w-xs pr-6 text-sm leading-relaxed text-cream/55">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
