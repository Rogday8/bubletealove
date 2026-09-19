import { motion } from 'motion/react'
import { useMemo } from 'react'
import { useFlavor } from '../state/flavor'

/**
 * Стакан бабл-ти целиком нарисован вектором — поэтому напиток
 * перекрашивается «в живую» через CSS-переменные вкуса (--f-*),
 * а не подменяется картинкой.
 */

const CUP = 'M92 148 L146 604 Q230 636 314 604 L368 148 Z'

export function BobaCup({ className }: { className?: string }) {
  const { pour } = useFlavor()

  const pearls = useMemo(
    () =>
      [
        [160, 592, 15],
        [196, 604, 17],
        [234, 598, 16],
        [272, 606, 15],
        [304, 590, 14],
        [178, 566, 14],
        [214, 574, 16],
        [252, 570, 15],
        [288, 564, 14],
        [166, 540, 13],
        [200, 546, 14],
        [238, 542, 15],
        [276, 538, 13],
        [306, 552, 12],
        [186, 518, 12],
        [224, 514, 13],
        [262, 518, 12],
        [296, 522, 11],
      ] as const,
    [],
  )

  const bubbles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        x: 120 + ((i * 97) % 220),
        r: 3 + ((i * 7) % 6),
        delay: (i * 0.53) % 7,
        dur: 5 + ((i * 1.7) % 4),
      })),
    [],
  )

  return (
    <svg viewBox="0 0 460 700" className={className} aria-label="Стакан бабл-ти">
      <defs>
        <clipPath id="cup-clip">
          <path d={CUP} />
        </clipPath>

        {/* стеклянный корпус */}
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42" />
          <stop offset="14%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="52%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="86%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.34" />
        </linearGradient>

        {/* затемнение ко дну — даёт объём без смены цвета */}
        <linearGradient id="depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="62%" stopColor="#000" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id="straw" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff6f1" />
          <stop offset="38%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e7c6bd" />
        </linearGradient>

        <linearGradient id="lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.16" />
        </linearGradient>

        <radialGradient id="pearl-shine" cx="34%" cy="28%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>

        <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="softer" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      {/* ореол вкуса за стаканом */}
      <ellipse
        cx="230"
        cy="420"
        rx="180"
        ry="250"
        fill="var(--f-glow)"
        opacity="0.35"
        filter="url(#softer)"
        className="flavor-tween"
      />

      {/* тень на «столе» */}
      <ellipse cx="230" cy="640" rx="150" ry="26" fill="#000" opacity="0.45" filter="url(#soft)" />

      {/* трубочка — нижняя часть, внутри напитка */}
      <g clipPath="url(#cup-clip)">
        <rect x="246" y="150" width="30" height="420" rx="15" fill="#fff" opacity="0.28" transform="rotate(9 250 300)" />
      </g>

      {/* сам напиток */}
      <g clipPath="url(#cup-clip)">
        <motion.g
          key={pour}
          initial={{ y: 26, opacity: 0.9 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 90, damping: 12, mass: 0.9 }}
          style={{ transformOrigin: '230px 620px' }}
        >
          {/* основная толща */}
          <path d="M80 236 H380 V660 H80 Z" fill="var(--f-bottom)" className="flavor-tween" />
          {/* верхняя, более светлая половина */}
          <path
            d="M80 236 H380 V430 C 330 452, 292 404, 232 424 C 176 442, 132 404, 80 428 Z"
            fill="var(--f-top)"
            className="flavor-tween"
          />
          {/* молочная шапка с волной */}
          <path
            d="M80 214 H380 V300 C 330 322, 300 276, 240 296 C 180 316, 134 280, 80 302 Z"
            fill="var(--f-foam)"
            className="flavor-tween"
          />
          {/* сливочный развод посередине */}
          <path
            d="M104 470 C 148 436, 190 500, 240 470 C 292 440, 330 500, 368 474 C 352 520, 300 522, 250 508 C 196 492, 150 516, 104 470 Z"
            fill="var(--f-foam)"
            opacity="0.5"
            filter="url(#soft)"
            className="flavor-tween"
          />

          {/* поверхность напитка */}
          <ellipse cx="230" cy="214" rx="130" ry="18" fill="var(--f-foam)" className="flavor-tween" />
          <ellipse cx="230" cy="211" rx="108" ry="13" fill="#fff" opacity="0.35" />

          {/* лёд */}
          <g opacity="0.5">
            <rect x="120" y="250" width="66" height="60" rx="16" fill="#fff" opacity="0.5" transform="rotate(-12 150 280)" />
            <rect x="196" y="232" width="74" height="64" rx="18" fill="#fff" opacity="0.42" transform="rotate(8 230 264)" />
            <rect x="276" y="258" width="62" height="58" rx="15" fill="#fff" opacity="0.46" transform="rotate(-6 306 286)" />
            <rect x="160" y="316" width="58" height="52" rx="14" fill="#fff" opacity="0.3" transform="rotate(14 190 342)" />
          </g>

          {/* пузырьки, поднимающиеся со дна */}
          <g opacity="0.55">
            {bubbles.map((b, i) => (
              <circle
                key={i}
                cx={b.x}
                cy={600}
                r={b.r}
                fill="#fff"
                style={{ animation: `rise ${b.dur}s linear ${b.delay}s infinite` }}
              />
            ))}
          </g>

          {/* тапиока */}
          <g>
            {pearls.map(([x, y, r], i) => (
              <motion.g
                key={i}
                animate={{ y: [0, -3, 0, 2, 0] }}
                transition={{ duration: 5 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              >
                <circle cx={x} cy={y} r={r} fill="var(--f-pearl)" className="flavor-tween" />
                <circle cx={x} cy={y} r={r} fill="url(#pearl-shine)" />
              </motion.g>
            ))}
          </g>

          <path d="M80 214 H380 V660 H80 Z" fill="url(#depth)" />
        </motion.g>
      </g>

      {/* стекло поверх напитка */}
      <path d={CUP} fill="url(#glass)" />
      <path d={CUP} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.5" />
      <path
        d="M120 186 C 112 300, 128 430, 152 560"
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M340 200 C 344 300, 330 420, 312 520"
        stroke="#fff"
        strokeOpacity="0.28"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* конденсат */}
      <g opacity="0.5" fill="#fff">
        {[
          [136, 330, 3],
          [150, 402, 2.4],
          [166, 470, 3.2],
          [300, 360, 2.6],
          [318, 300, 3],
          [286, 460, 2.2],
          [182, 540, 2.6],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} />
        ))}
      </g>

      {/* крышка */}
      <g>
        <ellipse cx="230" cy="150" rx="140" ry="26" fill="#fff" opacity="0.2" />
        <path
          d="M84 150 C 84 128, 140 114, 230 114 C 320 114, 376 128, 376 150 C 376 162, 320 172, 230 172 C 140 172, 84 162, 84 150 Z"
          fill="url(#lid)"
        />
        <ellipse cx="230" cy="146" rx="142" ry="27" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="2.5" />
        <ellipse cx="230" cy="128" rx="112" ry="17" fill="#fff" opacity="0.16" />
      </g>

      {/* трубочка над крышкой */}
      <g transform="rotate(9 250 300)">
        <rect x="246" y="34" width="30" height="130" rx="15" fill="url(#straw)" />
        <rect x="252" y="40" width="7" height="116" rx="3.5" fill="#fff" opacity="0.8" />
        <ellipse cx="261" cy="36" rx="15" ry="5" fill="#fff" opacity="0.95" />
      </g>

      {/* всплеск при смене вкуса */}
      <motion.g
        key={`splash-${pour}`}
        initial={{ opacity: 0.85, scale: 0.4 }}
        animate={{ opacity: 0, scale: 1.5 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        style={{ transformOrigin: '230px 300px' }}
      >
        <circle cx="230" cy="300" r="90" fill="none" stroke="var(--f-foam)" strokeWidth="4" opacity="0.6" />
      </motion.g>
    </svg>
  )
}
