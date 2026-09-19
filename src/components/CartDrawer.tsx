import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useCart } from '../state/cart'

export function CartDrawer() {
  const { items, count, total, open, setOpen, inc, dec, remove, clear } = useCart()
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, setOpen])

  useEffect(() => {
    if (!open) setSent(false)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-black/65 backdrop-blur-sm"
          />

          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-[440px] flex-col border-l border-white/12"
            style={{
              background: 'linear-gradient(200deg, var(--f-bg-a) -20%, var(--f-bg-b) 45%, #0f0507 100%)',
            }}
            role="dialog"
            aria-label="Корзина"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="font-display text-2xl text-milk">Корзина</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-cream/45">
                  {count === 0 ? 'пока пусто' : `${count} ${plural(count)}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть корзину"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/8 text-milk transition-colors hover:bg-white/15"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <EmptyCup />
                  <p className="max-w-[240px] text-sm leading-relaxed text-cream/55">
                    Выберите вкус на главной или соберите свой стакан в конструкторе.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((i) => (
                      <motion.li
                        key={i.id}
                        layout
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <span
                          className="mt-1 h-10 w-10 shrink-0 rounded-xl ring-1 ring-white/20"
                          style={{ background: `linear-gradient(160deg, ${i.color}, #00000055)` }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-display text-lg text-milk">{i.title}</p>
                          <p className="mt-0.5 truncate text-[11px] uppercase tracking-[0.14em] text-cream/45">
                            {i.subtitle}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2.5 rounded-full border border-white/15 px-1.5 py-1">
                              <Round onClick={() => dec(i.id)} label="Убрать одну">−</Round>
                              <span className="min-w-4 text-center text-sm tabular-nums text-milk">{i.qty}</span>
                              <Round onClick={() => inc(i.id)} label="Добавить одну">+</Round>
                            </div>
                            <span className="font-display text-xl tabular-nums text-milk">{i.price * i.qty} ₽</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(i.id)}
                          aria-label="Удалить позицию"
                          className="self-start text-cream/35 transition-colors hover:text-[var(--f-glow)]"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M6 6l12 12M18 6L6 18" />
                          </svg>
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            <footer className="border-t border-white/10 px-6 pb-7 pt-5">
              <div className="flex items-end justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] text-cream/45">Итого</span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={total}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-3xl tabular-nums text-milk"
                  >
                    {total} ₽
                  </motion.span>
                </AnimatePresence>
              </div>

              <motion.button
                type="button"
                disabled={items.length === 0}
                onClick={() => {
                  setSent(true)
                  window.setTimeout(() => {
                    clear()
                    setSent(false)
                    setOpen(false)
                  }, 1800)
                }}
                whileHover={items.length ? { y: -3 } : undefined}
                whileTap={items.length ? { scale: 0.98 } : undefined}
                className="mt-4 w-full rounded-full bg-milk py-3.5 text-sm font-semibold text-bark transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={sent ? 'sent' : 'idle'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="block"
                  >
                    {sent ? 'Заказ принят — ждём вас 🧋' : 'Оформить заказ'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {items.length > 0 && !sent && (
                <button
                  type="button"
                  onClick={clear}
                  className="mt-3 w-full text-center text-[11px] uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-cream/70"
                >
                  Очистить
                </button>
              )}
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function Round({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-sm leading-none text-milk transition-colors hover:bg-white/25"
    >
      {children}
    </button>
  )
}

function EmptyCup() {
  return (
    <svg viewBox="0 0 120 160" className="h-28 w-auto opacity-45">
      <path d="M26 44 L36 128 Q60 140 84 128 L94 44 Z" fill="none" stroke="var(--f-glow)" strokeWidth="3" />
      <rect x="18" y="32" width="84" height="12" rx="6" fill="var(--f-glow)" opacity="0.7" />
      <rect x="66" y="6" width="10" height="34" rx="5" fill="var(--f-glow)" opacity="0.7" transform="rotate(10 71 23)" />
      <circle cx="48" cy="114" r="6" fill="var(--f-glow)" opacity="0.5" />
      <circle cx="66" cy="118" r="6" fill="var(--f-glow)" opacity="0.5" />
    </svg>
  )
}

function plural(n: number) {
  const d = n % 10
  const h = n % 100
  if (d === 1 && h !== 11) return 'стакан'
  if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return 'стакана'
  return 'стаканов'
}
