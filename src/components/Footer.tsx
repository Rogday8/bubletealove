import { motion } from 'motion/react'
import { useCart } from '../state/cart'
import { useFlavor } from '../state/flavor'
import { LogoMark } from './Logo'
import { Reveal } from './Reveal'

export function Footer() {
  const { selected } = useFlavor()
  const cart = useCart()

  return (
    <footer id="contact" className="relative z-10 overflow-hidden bg-[var(--f-bg-b)] px-5 pb-10 pt-24 flavor-tween sm:px-10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60 blur-[90px] flavor-tween"
        style={{ background: 'radial-gradient(50% 100% at 50% 0%, var(--f-glow), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <Reveal className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-cream/50">Забрать сегодня</p>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.6rem,8vw,7rem)] leading-[0.9] text-milk">
            Собери свой <span className="italic text-[var(--f-glow)] flavor-tween">{selected.name}</span>
          </h2>
          <motion.button
            type="button"
            onClick={() => {
              cart.add({
                id: `flavor-${selected.id}`,
                title: selected.name,
                subtitle: selected.ru,
                price: selected.price,
                color: selected.colors.bottom,
              })
              cart.setOpen(true)
            }}
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 inline-flex items-center gap-4 rounded-full bg-milk py-4 pl-8 pr-4 text-sm font-semibold text-bark"
          >
            Заказать за {selected.price} ₽
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--f-glow)] flavor-tween">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#2a1114" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </motion.button>
        </Reveal>

        <div className="mt-24 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <LogoMark id="logo-footer" flavorAware className="mb-4 h-12 w-12" />
            <p className="font-display text-2xl text-milk">bubble tea love</p>
            <p className="mt-2 text-sm text-cream/50">Чайная с жемчужным чаем ручной сборки</p>
          </div>
          <FooterCol title="Адрес" lines={['Москва, Никольская 4', 'вход со двора']} />
          <FooterCol title="Часы" lines={['пн–чт 10:00 — 22:00', 'пт–вс 10:00 — 00:00']} />
          <FooterCol title="Связь" lines={['+7 900 000-00-00', 'hi@bubbletealove.ru']} />
        </div>

        <p className="mt-12 text-center text-xs text-cream/35">
          © {new Date().getFullYear()} Bubble Tea Love · концепт для портфолио
        </p>
      </div>
    </footer>
  )
}

function FooterCol({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div>
      <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-cream/45">{title}</p>
      {lines.map((l) => (
        <p key={l} className="text-sm text-milk/80">
          {l}
        </p>
      ))}
    </div>
  )
}
