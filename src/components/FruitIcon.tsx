import type { FruitKind } from '../data/flavors'

/**
 * Векторные «фрукты» для карточек вкусов.
 * Рисую их в SVG, а не картинками: масштабируются без потерь и красятся градиентами.
 */
export function FruitIcon({ kind, className }: { kind: FruitKind; className?: string }) {
  const uid = `fr-${kind}`
  return (
    <svg viewBox="0 0 120 120" className={className} role="presentation" aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-hl`} cx="34%" cy="26%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-leaf`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fbf5a" />
          <stop offset="100%" stopColor="#3f7a32" />
        </linearGradient>
        {gradients[kind](uid)}
      </defs>
      <g>{shapes[kind](uid)}</g>
    </svg>
  )
}

const gradients: Record<FruitKind, (u: string) => React.ReactNode> = {
  sakura: (u) => (
    <radialGradient id={`${u}-a`} cx="50%" cy="52%" r="58%">
      <stop offset="0%" stopColor="#fff2f4" />
      <stop offset="55%" stopColor="#f9c2cd" />
      <stop offset="100%" stopColor="#ef8fa6" />
    </radialGradient>
  ),
  strawberry: (u) => (
    <linearGradient id={`${u}-a`} x1="0.25" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stopColor="#f2604f" />
      <stop offset="55%" stopColor="#d92e28" />
      <stop offset="100%" stopColor="#8f1414" />
    </linearGradient>
  ),
  mango: (u) => (
    <linearGradient id={`${u}-a`} x1="0.2" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stopColor="#ffd97a" />
      <stop offset="45%" stopColor="#f5a33a" />
      <stop offset="100%" stopColor="#d45f1c" />
    </linearGradient>
  ),
  boba: (u) => (
    <radialGradient id={`${u}-a`} cx="34%" cy="28%" r="72%">
      <stop offset="0%" stopColor="#6b4636" />
      <stop offset="45%" stopColor="#331b14" />
      <stop offset="100%" stopColor="#120806" />
    </radialGradient>
  ),
  peach: (u) => (
    <linearGradient id={`${u}-a`} x1="0.2" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stopColor="#ffd9b6" />
      <stop offset="45%" stopColor="#f6a883" />
      <stop offset="100%" stopColor="#dd6a55" />
    </linearGradient>
  ),
  pea: (u) => (
    <radialGradient id={`${u}-a`} cx="50%" cy="38%" r="70%">
      <stop offset="0%" stopColor="#8fe2f2" />
      <stop offset="45%" stopColor="#3f9ad6" />
      <stop offset="100%" stopColor="#23408f" />
    </radialGradient>
  ),
  matcha: (u) => (
    <linearGradient id={`${u}-a`} x1="0.2" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stopColor="#c7e28a" />
      <stop offset="45%" stopColor="#8db94a" />
      <stop offset="100%" stopColor="#3f6b23" />
    </linearGradient>
  ),
  taro: (u) => (
    <linearGradient id={`${u}-a`} x1="0.2" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stopColor="#efe2f8" />
      <stop offset="45%" stopColor="#c3a4e0" />
      <stop offset="100%" stopColor="#6d4b9c" />
    </linearGradient>
  ),
  sugar: (u) => (
    <linearGradient id={`${u}-a`} x1="0.15" y1="0" x2="0.9" y2="1">
      <stop offset="0%" stopColor="#e6ab63" />
      <stop offset="50%" stopColor="#b26a28" />
      <stop offset="100%" stopColor="#5e3110" />
    </linearGradient>
  ),
  lychee: (u) => (
    <radialGradient id={`${u}-a`} cx="36%" cy="30%" r="72%">
      <stop offset="0%" stopColor="#ffd9d8" />
      <stop offset="45%" stopColor="#ee98a4" />
      <stop offset="100%" stopColor="#b64a56" />
    </radialGradient>
  ),
  coconut: (u) => (
    <linearGradient id={`${u}-a`} x1="0.2" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stopColor="#9d7047" />
      <stop offset="55%" stopColor="#6b4526" />
      <stop offset="100%" stopColor="#3a2413" />
    </linearGradient>
  ),
  grape: (u) => (
    <radialGradient id={`${u}-a`} cx="34%" cy="28%" r="70%">
      <stop offset="0%" stopColor="#c79ae6" />
      <stop offset="45%" stopColor="#8a55bf" />
      <stop offset="100%" stopColor="#3f1f6b" />
    </radialGradient>
  ),
}

const petal =
  'M60 62 C 42 54, 33 33, 45 20 C 52 12, 56 16, 60 23 C 64 16, 68 12, 75 20 C 87 33, 78 54, 60 62 Z'

const shapes: Record<FruitKind, (u: string) => React.ReactNode> = {
  sakura: (u) => (
    <g>
      {[0, 72, 144, 216, 288].map((deg) => (
        <path
          key={deg}
          d={petal}
          fill={`url(#${u}-a)`}
          transform={`rotate(${deg} 60 62)`}
          stroke="#e58aa0"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      ))}
      <circle cx="60" cy="62" r="8" fill="#fdeef1" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 60 62)`}>
          <line x1="60" y1="62" x2="60" y2="50" stroke="#f0b7c3" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="60" cy="49" r="2.4" fill="#f6c85a" />
        </g>
      ))}
    </g>
  ),
  strawberry: (u) => (
    <g>
      <path
        d="M60 30 C 88 30, 100 50, 99 68 C 98 90, 76 112, 60 112 C 44 112, 22 90, 21 68 C 20 50, 32 30, 60 30 Z"
        fill={`url(#${u}-a)`}
      />
      {seeds.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={2.2} ry={3.2} fill="#ffe9b0" opacity="0.92" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <path
        d="M60 36 C 44 36, 34 30, 28 22 C 40 20, 48 22, 54 26 C 52 18, 54 12, 60 8 C 66 12, 68 18, 66 26 C 72 22, 80 20, 92 22 C 86 30, 76 36, 60 36 Z"
        fill={`url(#${u}-leaf)`}
      />
      <rect x="57.5" y="4" width="5" height="12" rx="2.5" fill="#4d8a34" />
    </g>
  ),
  mango: (u) => (
    <g>
      <path
        d="M66 26 C 90 26, 104 48, 100 72 C 96 96, 74 112, 56 109 C 32 105, 20 84, 24 62 C 28 40, 44 26, 66 26 Z"
        fill={`url(#${u}-a)`}
      />
      <path d="M78 34 C 94 44, 98 66, 90 84" stroke="#ffe9a8" strokeOpacity="0.5" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M66 26 C 74 14, 92 8, 106 12 C 100 26, 84 32, 70 30 Z" fill={`url(#${u}-leaf)`} />
      <path d="M66 27 C 78 22, 92 16, 104 13" stroke="#2f5f27" strokeOpacity="0.5" strokeWidth="1.4" fill="none" />
    </g>
  ),
  boba: (u) => (
    <g>
      <path d="M60 40 C 50 30, 44 18, 46 6 C 58 10, 66 22, 66 38 Z" fill={`url(#${u}-leaf)`} />
      {[
        [40, 74, 26],
        [80, 70, 24],
        [60, 94, 22],
        [86, 100, 16],
        [34, 104, 14],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={`url(#${u}-a)`} />
          <ellipse cx={x - r * 0.3} cy={y - r * 0.38} rx={r * 0.34} ry={r * 0.24} fill="#fff" opacity="0.4" transform={`rotate(-24 ${x} ${y})`} />
        </g>
      ))}
    </g>
  ),
  peach: (u) => (
    <g>
      <path
        d="M60 28 C 86 20, 106 42, 103 70 C 100 96, 82 112, 60 112 C 38 112, 20 96, 17 70 C 14 42, 34 20, 60 28 Z"
        fill={`url(#${u}-a)`}
      />
      <path d="M60 30 C 52 52, 52 86, 62 110" stroke="#c9563f" strokeOpacity="0.35" strokeWidth="3" fill="none" />
      <path d="M62 28 C 72 14, 90 8, 104 10 C 98 26, 80 34, 64 32 Z" fill={`url(#${u}-leaf)`} />
      <rect x="57" y="10" width="5" height="16" rx="2.5" fill="#6b4126" transform="rotate(-12 59 18)" />
    </g>
  ),
  pea: (u) => (
    <g>
      <path
        d="M60 100 C 24 100, 10 74, 19 50 C 28 26, 55 20, 60 20 C 65 20, 92 26, 101 50 C 110 74, 96 100, 60 100 Z"
        fill={`url(#${u}-a)`}
      />
      <path
        d="M60 92 C 36 92, 26 74, 32 56 C 38 38, 55 33, 60 33 C 65 33, 82 38, 88 56 C 94 74, 84 92, 60 92 Z"
        fill="#2f6fc0"
        opacity="0.55"
      />
      <ellipse cx="60" cy="70" rx="16" ry="12" fill="#fdf6e0" opacity="0.92" />
      <ellipse cx="60" cy="70" rx="7" ry="5" fill="#f4c752" />
      <path d="M60 20 C 58 12, 52 6, 44 4" stroke="#4e8b3c" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  matcha: (u) => (
    <g>
      <path
        d="M62 108 C 24 96, 10 58, 26 22 C 66 26, 96 52, 94 92 C 84 100, 74 106, 62 108 Z"
        fill={`url(#${u}-a)`}
      />
      <path d="M30 26 C 52 46, 66 74, 70 104" stroke="#27491a" strokeOpacity="0.45" strokeWidth="3" fill="none" strokeLinecap="round" />
      {[[42,40],[54,56],[64,74]].map(([x,y],i)=>(
        <path key={i} d={`M${x} ${y} C ${x+10} ${y-8}, ${x+20} ${y-6}, ${x+24} ${y+2}`} stroke="#27491a" strokeOpacity="0.3" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      ))}
      <circle cx="26" cy="96" r="7" fill="#8db94a" opacity="0.75" />
      <circle cx="40" cy="106" r="5" fill="#6f9c37" opacity="0.7" />
    </g>
  ),
  taro: (u) => (
    <g>
      <path
        d="M60 26 C 80 26, 92 46, 92 66 C 92 92, 78 110, 60 110 C 42 110, 28 92, 28 66 C 28 46, 40 26, 60 26 Z"
        fill={`url(#${u}-a)`}
      />
      {[48, 64, 80, 94].map((y, i) => (
        <path
          key={y}
          d={`M${31 + i * 1.6} ${y} C 45 ${y + 6}, 75 ${y + 6}, ${89 - i * 1.6} ${y}`}
          stroke="#4a2d70"
          strokeOpacity="0.32"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      <path d="M60 28 C 56 16, 62 6, 74 2 C 76 14, 70 24, 60 28 Z" fill={`url(#${u}-leaf)`} />
      <path d="M60 28 C 48 22, 42 12, 42 2 C 54 6, 60 16, 60 28 Z" fill={`url(#${u}-leaf)`} opacity="0.75" />
    </g>
  ),
  sugar: (u) => (
    <g>
      <path d="M34 46 L60 30 L96 46 L96 84 L60 102 L34 84 Z" fill={`url(#${u}-a)`} />
      <path d="M34 46 L60 62 L96 46" fill="none" stroke="#f0c98d" strokeOpacity="0.55" strokeWidth="3" />
      <path d="M60 62 L60 102" fill="none" stroke="#3d1f08" strokeOpacity="0.4" strokeWidth="3" />
      <path d="M34 46 L60 30 L96 46 L60 62 Z" fill="#f2c489" opacity="0.35" />
      <path
        d="M24 28 C 30 42, 22 52, 26 66 C 28 74, 22 80, 18 86"
        stroke="#c9873f"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
    </g>
  ),
  lychee: (u) => (
    <g>
      <circle cx="60" cy="68" r="42" fill={`url(#${u}-a)`} />
      {Array.from({ length: 26 }, (_, i) => {
        const a = (i * 137.5 * Math.PI) / 180
        const r = 8 + (i % 5) * 6.5
        return <circle key={i} cx={60 + Math.cos(a) * r} cy={68 + Math.sin(a) * r} r={3.1} fill="#a83c4b" opacity="0.45" />
      })}
      <path d="M60 28 C 58 18, 52 10, 42 6 C 46 18, 50 26, 58 30 Z" fill={`url(#${u}-leaf)`} />
      <rect x="57" y="20" width="5" height="12" rx="2.5" fill="#6b4126" />
    </g>
  ),
  coconut: (u) => (
    <g>
      <path d="M18 62 A 42 42 0 0 1 102 62 C 102 92, 84 110, 60 110 C 36 110, 18 92, 18 62 Z" fill={`url(#${u}-a)`} />
      <ellipse cx="60" cy="62" rx="42" ry="15" fill="#fff8ee" />
      <ellipse cx="60" cy="64" rx="32" ry="10" fill="#f0e2cf" />
      <ellipse cx="60" cy="64" rx="18" ry="5.5" fill="#e6d0b4" opacity="0.8" />
      {[[34, 84], [52, 96], [76, 86], [64, 74], [42, 70]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="5" ry="3" fill="#2f1c0f" opacity="0.35" transform={`rotate(${i * 34} ${x} ${y})`} />
      ))}
    </g>
  ),
  grape: (u) => (
    <g>
      <path d="M62 30 C 56 18, 60 8, 72 4 C 74 16, 70 26, 62 32 Z" fill={`url(#${u}-leaf)`} />
      <rect x="58" y="18" width="5" height="16" rx="2.5" fill="#5c7a35" />
      {[
        [42, 48, 14], [74, 48, 14], [58, 58, 15],
        [32, 70, 13], [58, 84, 15], [86, 70, 13],
        [44, 94, 12], [74, 94, 12], [59, 108, 11],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={`url(#${u}-a)`} />
          <ellipse cx={x - r * 0.28} cy={y - r * 0.36} rx={r * 0.32} ry={r * 0.22} fill="#fff" opacity="0.35" transform={`rotate(-25 ${x} ${y})`} />
        </g>
      ))}
    </g>
  ),
}

const seeds: [number, number, number][] = [
  [45, 48, -18],
  [62, 44, 8],
  [78, 54, 22],
  [38, 66, -12],
  [55, 64, 4],
  [72, 72, 16],
  [46, 84, -8],
  [64, 88, 10],
  [84, 74, 26],
  [58, 102, 2],
]
