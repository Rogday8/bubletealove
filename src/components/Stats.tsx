import { animate, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const items = [
  { value: 12, suffix: '', label: 'вкусов в меню' },
  { value: 4, suffix: ' ч', label: 'живёт партия тапиоки' },
  { value: 90, suffix: ' сек', label: 'от заказа до стакана' },
  { value: 38, suffix: ' тыс.', label: 'стаканов за год' },
]

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section className="relative z-10 border-y border-white/10 bg-[var(--f-bg-b)] px-5 py-16 flavor-tween sm:px-10">
      <div ref={ref} className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={it.label} className="px-2 text-center lg:border-r lg:border-white/10 lg:last:border-r-0">
            <p className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-none text-milk tabular-nums">
              <Counter to={it.value} run={seen} delay={i * 0.12} />
              <span className="text-[var(--f-glow)] flavor-tween">{it.suffix}</span>
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-cream/50">{it.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Counter({ to, run, delay }: { to: number; run: boolean; delay: number }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!run) return
    const controls = animate(0, to, {
      duration: 1.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [run, to, delay])

  return <>{n}</>
}
