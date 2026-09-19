import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useCart } from '../state/cart'
import { useFlavor } from '../state/flavor'
import { LogoMark } from './Logo'

const links = [
  { href: '#flavors', label: 'Вкусы' },
  { href: '#constructor', label: 'Конструктор' },
  { href: '#ritual', label: 'Ритуал' },
  { href: '#photos', label: 'Атмосфера' },
  { href: '#contact', label: 'Контакты' },
]

export function Nav() {
  const { selected } = useFlavor()
  const cart = useCart()
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  // меню закрывается, если экран стал широким
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const close = () => mq.matches && setOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[var(--f-glow)] flavor-tween"
      />

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-10 sm:py-5"
      >
        <a href="#top" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <LogoMark
            id="logo-nav"
            flavorAware
            className="h-10 w-10 shrink-0 drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)] transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-105"
          />
          <span className="font-display text-lg tracking-tight text-milk">
            bubble<span className="italic text-[var(--f-glow)] flavor-tween">tea</span>love
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/8 p-1.5 backdrop-blur-xl md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-[13px] font-medium text-cream/75 transition-colors duration-300 hover:bg-white/12 hover:text-milk"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => cart.setOpen(true)}
            aria-label="Открыть корзину"
            className="group relative flex items-center gap-2.5 rounded-full bg-milk py-2 pl-4 pr-2 text-[13px] font-semibold text-bark transition-transform duration-500 hover:-translate-y-0.5"
          >
            <span className="hidden tabular-nums sm:inline">
              {cart.count > 0 ? `${cart.total} ₽` : `${selected.price} ₽`}
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--f-glow)] flavor-tween">
              <CartIcon />
            </span>
            <AnimatePresence>
              {cart.count > 0 && (
                <motion.span
                  key={cart.pulse}
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: [1.4, 1], opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-bark px-1 text-[10px] font-bold text-milk ring-2 ring-[var(--f-bg-b)]"
                >
                  {cart.count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md md:hidden"
          >
            <span className="relative flex h-3.5 w-5 flex-col justify-between">
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-0.5 w-full rounded-full bg-milk"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="h-0.5 w-full rounded-full bg-milk"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-0.5 w-full rounded-full bg-milk"
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 6%)' }}
            animate={{ opacity: 1, clipPath: 'circle(140% at 90% 6%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 6%)' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[45] flex flex-col justify-center gap-2 px-8 md:hidden"
            style={{
              background:
                'radial-gradient(120% 80% at 80% 0%, var(--f-bg-a) 0%, var(--f-bg-b) 60%, #100507 100%)',
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-white/10 py-4 font-display text-4xl text-milk transition-colors duration-300 active:text-[var(--f-glow)]"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-xs uppercase tracking-[0.25em] text-cream/45"
            >
              Москва, Никольская 4 · 10:00 — 22:00
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#2a1114" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2.5 3.5h3l2.2 11.2h10.1l2-8.2H6.2" />
    </svg>
  )
}
