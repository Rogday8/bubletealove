import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { useCart } from '../state/cart'
import { Reveal } from './Reveal'

/** Конструктор стакана: выбор собирается прямо в превью слева. */

const bases = [
  { id: 'classic', label: 'Классик', price: 350, top: '#cf9b78', bottom: '#8b5136', foam: '#f4ddc9' },
  { id: 'matcha', label: 'Матча', price: 400, top: '#bad683', bottom: '#6b8f3a', foam: '#eef5dd' },
  { id: 'strawberry', label: 'Клубника', price: 380, top: '#f3907f', bottom: '#c8402f', foam: '#fbdcd4' },
  { id: 'taro', label: 'Таро', price: 390, top: '#c9aee6', bottom: '#8d6bc4', foam: '#f6ecfd' },
  { id: 'mango', label: 'Манго', price: 380, top: '#f7b061', bottom: '#e3811f', foam: '#fdeacb' },
]

const toppings = [
  { id: 'pearl', label: 'Тапиока', price: 40, color: '#2c1611' },
  { id: 'lychee', label: 'Личи-желе', price: 50, color: '#e79aa8' },
  { id: 'coconut', label: 'Кокос-желе', price: 50, color: '#fbf3e6' },
  { id: 'pudding', label: 'Пудинг', price: 60, color: '#f2c85c' },
  { id: 'popping', label: 'Попинг-боба', price: 60, color: '#f28a3c' },
]

const sizes = [
  { id: 'm', label: 'M · 450 мл', price: 0, scale: 0.88 },
  { id: 'l', label: 'L · 600 мл', price: 70, scale: 1 },
]

const sugars = [0, 30, 50, 80, 100]
const ices = [0, 50, 100]

export function Constructor() {
  const [base, setBase] = useState(bases[0])
  const [topping, setTopping] = useState(toppings[0])
  const [size, setSize] = useState(sizes[1])
  const [sugar, setSugar] = useState(50)
  const [ice, setIce] = useState(50)
  const cart = useCart()

  const price = base.price + topping.price + size.price + (sugar > 80 ? 10 : 0)

  return (
    <section
      id="constructor"
      className="relative z-10 overflow-hidden bg-[var(--f-bg-b)] px-5 py-24 flavor-tween sm:px-10 sm:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 opacity-30 blur-[120px]"
        style={{ background: `radial-gradient(50% 50% at 50% 50%, ${base.bottom}, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--f-glow)] flavor-tween">
            Конструктор
          </p>
          <h2 className="font-display text-[clamp(2.3rem,6vw,5.5rem)] leading-[0.95] text-milk">
            Собери стакан <span className="italic">под себя</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-cream/60">
            Основа, топпинг, сахар и лёд — всё считается на лету, а стакан слева наполняется прямо во время выбора.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
          {/* превью */}
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="relative grid place-items-center overflow-hidden rounded-[32px] border border-white/12 px-6 py-10"
              style={{ background: `linear-gradient(165deg, ${base.bottom}33, #12060880)` }}
            >
              <MiniCup base={base} topping={topping} ice={ice} sugar={sugar} scale={size.scale} />

              <div className="mt-8 w-full rounded-2xl border border-white/12 bg-black/25 p-5 backdrop-blur-md">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-2xl text-milk">{base.label}</span>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={price}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-3xl tabular-nums text-milk"
                    >
                      {price} ₽
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-cream/50">
                  {topping.label} · {size.label} · сахар {sugar}% · лёд {ice}%
                </p>
                <motion.button
                  type="button"
                  onClick={() =>
                    cart.add({
                      id: `build-${base.id}-${topping.id}-${size.id}-${sugar}-${ice}`,
                      title: `${base.label} · своя сборка`,
                      subtitle: `${topping.label} · ${size.label} · сахар ${sugar}% · лёд ${ice}%`,
                      price,
                      color: base.bottom,
                    })
                  }
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-milk py-3 text-sm font-semibold text-bark"
                >
                  Добавить в корзину
                </motion.button>
              </div>
            </div>
          </Reveal>

          {/* опции */}
          <div className="space-y-10">
            <Group title="Основа">
              {bases.map((b) => (
                <Chip key={b.id} active={b.id === base.id} onClick={() => setBase(b)} dot={b.bottom}>
                  {b.label}
                </Chip>
              ))}
            </Group>

            <Group title="Топпинг">
              {toppings.map((t) => (
                <Chip key={t.id} active={t.id === topping.id} onClick={() => setTopping(t)} dot={t.color}>
                  {t.label} <span className="opacity-50">+{t.price} ₽</span>
                </Chip>
              ))}
            </Group>

            <Group title="Размер">
              {sizes.map((s) => (
                <Chip key={s.id} active={s.id === size.id} onClick={() => setSize(s)}>
                  {s.label}
                  {s.price > 0 && <span className="opacity-50"> +{s.price} ₽</span>}
                </Chip>
              ))}
            </Group>

            <Group title="Сахар">
              {sugars.map((v) => (
                <Chip key={v} active={v === sugar} onClick={() => setSugar(v)}>
                  {v}%
                </Chip>
              ))}
            </Group>

            <Group title="Лёд">
              {ices.map((v) => (
                <Chip key={v} active={v === ice} onClick={() => setIce(v)}>
                  {v}%
                </Chip>
              ))}
            </Group>
          </div>
        </div>
      </div>
    </section>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal y={24}>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-cream/45">{title}</p>
      <div className="flex flex-wrap gap-2.5">{children}</div>
    </Reveal>
  )
}

function Chip({
  children,
  active,
  onClick,
  dot,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
  dot?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm transition-all duration-400 ease-[cubic-bezier(.22,1,.36,1)] ${
        active
          ? 'border-transparent bg-milk text-bark shadow-[0_14px_36px_-16px_rgba(255,246,241,0.7)]'
          : 'border-white/15 bg-white/5 text-cream/75 hover:border-white/35 hover:bg-white/10 hover:text-milk'
      }`}
    >
      {dot && <span className="h-2.5 w-2.5 rounded-full ring-1 ring-black/20" style={{ background: dot }} />}
      {children}
    </button>
  )
}

function MiniCup({
  base,
  topping,
  ice,
  sugar,
  scale,
}: {
  base: (typeof bases)[number]
  topping: (typeof toppings)[number]
  ice: number
  sugar: number
  scale: number
}) {
  const cubes = useMemo(
    () =>
      [
        [96, 176, -12],
        [150, 158, 8],
        [206, 180, -6],
        [124, 216, 14],
        [186, 220, -10],
      ].slice(0, ice === 0 ? 0 : ice === 50 ? 3 : 5),
    [ice],
  )
  const pearls = useMemo(
    () => [
      [86, 400, 16], [124, 412, 17], [162, 404, 16], [200, 414, 15], [232, 400, 14],
      [104, 376, 14], [142, 382, 15], [180, 378, 14], [216, 374, 13],
      [120, 350, 12], [158, 346, 13], [196, 350, 12],
    ],
    [],
  )

  return (
    <motion.svg
      viewBox="0 0 300 470"
      className="h-[260px] w-auto sm:h-[320px]"
      animate={{ scale }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
    >
      <defs>
        <clipPath id="mini-clip">
          <path d="M52 108 L84 414 Q150 442 216 414 L248 108 Z" />
        </clipPath>
        <linearGradient id="mini-depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      <ellipse cx="150" cy="436" rx="96" ry="16" fill="#000" opacity="0.4" />

      <g clipPath="url(#mini-clip)">
        <motion.rect
          x="40"
          y="120"
          width="220"
          height="340"
          animate={{ fill: base.bottom }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d="M40 120 H260 V300 C 214 318, 186 274, 150 292 C 110 312, 76 280, 40 300 Z"
          animate={{ fill: base.top }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d="M40 118 H260 V196 C 214 214, 186 176, 150 192 C 110 210, 76 182, 40 200 Z"
          animate={{ fill: base.foam, opacity: 0.5 + sugar / 250 }}
          transition={{ duration: 0.6 }}
        />

        <AnimatePresence>
          {cubes.map(([x, y, r], i) => (
            <motion.rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="52"
              height="46"
              rx="12"
              fill="#fff"
              opacity="0.4"
              transform={`rotate(${r} ${x + 26} ${y + 23})`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{ transformOrigin: `${x + 26}px ${y + 23}px` }}
            />
          ))}
        </AnimatePresence>

        {pearls.map(([x, y, r], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            animate={{ fill: topping.color }}
            transition={{ duration: 0.5, delay: i * 0.02 }}
          />
        ))}

        <rect x="40" y="118" width="220" height="342" fill="url(#mini-depth)" />
      </g>

      <path d="M52 108 L84 414 Q150 442 216 414 L248 108 Z" fill="#fff" fillOpacity="0.08" />
      <path d="M52 108 L84 414 Q150 442 216 414 L248 108 Z" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2.5" />
      <path d="M76 140 C 70 230, 82 320, 100 384" stroke="#fff" strokeOpacity="0.4" strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect x="36" y="92" width="228" height="26" rx="13" fill="#fff" fillOpacity="0.28" />
      <ellipse cx="150" cy="105" rx="114" ry="18" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2.5" />
      <rect x="168" y="20" width="24" height="96" rx="12" fill="#fff6f1" transform="rotate(9 180 70)" />
    </motion.svg>
  )
}
