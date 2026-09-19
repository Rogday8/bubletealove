import { motion } from 'motion/react'
import { flavors } from '../data/flavors'
import { useCart } from '../state/cart'
import { useFlavor } from '../state/flavor'
import { FruitIcon } from './FruitIcon'
import { Reveal } from './Reveal'

export function Flavors() {
  const { selectedIndex, select } = useFlavor()
  const cart = useCart()

  return (
    <section id="flavors" className="relative z-10 bg-[var(--f-bg-b)] px-5 py-24 flavor-tween sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2.1rem,5.4vw,5rem)] leading-[0.95] text-milk">
            Двенадцать вкусов, <span className="italic text-[var(--f-glow)] flavor-tween">одна любовь</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-cream/60">
            Каждую основу завариваем отдельно: улун держим 4 минуты, тапиоку варим порционно и не храним дольше четырёх
            часов. Нажми на вкус — стакан наверху нальётся заново.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flavors.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full overflow-hidden rounded-[28px] border border-white/12 p-7"
                style={{
                  background: `linear-gradient(160deg, ${f.colors.bgA}, ${f.colors.bgB})`,
                  boxShadow: i === selectedIndex ? `0 30px 70px -30px ${f.colors.glow}` : undefined,
                }}
              >
                {/* вся карточка — кнопка «налить», кнопка корзины лежит поверх */}
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`Налить ${f.ru} в стакан наверху`}
                  className="absolute inset-0 z-0 rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--f-glow)]"
                />

                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-45 blur-3xl transition-opacity duration-700 group-hover:opacity-80"
                  style={{ background: f.colors.glow }}
                />

                <div className="pointer-events-none relative flex items-start justify-between">
                  <div className="grid h-20 w-20 place-items-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110">
                    <FruitIcon kind={f.fruit} className="h-14 w-14" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {f.badge && (
                      <span
                        className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-bark"
                        style={{ background: f.colors.glow }}
                      >
                        {f.badge}
                      </span>
                    )}
                    <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-milk/70">
                      {i === selectedIndex ? 'в стакане' : 'налить'}
                    </span>
                  </div>
                </div>

                <h3 className="pointer-events-none relative mt-8 font-display text-3xl text-milk">{f.name}</h3>
                <p className="pointer-events-none relative mt-1 text-sm text-cream/60">
                  {f.ru} · {f.tagline}
                </p>

                <div className="relative mt-7 flex items-center justify-between gap-4 border-t border-white/12 pt-5">
                  <span className="pointer-events-none text-xs uppercase tracking-[0.18em] text-cream/55">
                    {f.notes.join(' · ')}
                  </span>
                  <motion.button
                    type="button"
                    onClick={() =>
                      cart.add({
                        id: `flavor-${f.id}`,
                        title: f.name,
                        subtitle: f.ru,
                        price: f.price,
                        color: f.colors.bottom,
                      })
                    }
                    whileTap={{ scale: 0.94 }}
                    aria-label={`Добавить ${f.ru} в корзину`}
                    className="relative z-10 flex shrink-0 items-center gap-2 rounded-full bg-white/10 py-2 pl-4 pr-2 font-display text-xl tabular-nums text-milk ring-1 ring-white/15 transition-colors duration-300 hover:bg-milk hover:text-bark"
                  >
                    {f.price} ₽
                    <span
                      className="grid h-7 w-7 place-items-center rounded-full text-bark"
                      style={{ background: f.colors.glow }}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
