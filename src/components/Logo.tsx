/**
 * Логотип чайной: стакан с жемчугом и сердце вместо пара.
 * `flavorAware` красит значок в цвет выбранного вкуса.
 */
export function LogoMark({
  className,
  flavorAware = false,
  id = 'logo',
}: {
  className?: string
  flavorAware?: boolean
  id?: string
}) {
  const from = flavorAware ? 'var(--f-glow)' : '#f7cbcc'
  const to = flavorAware ? 'var(--f-bottom)' : '#c46251'

  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Bubble Tea Love">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} className={flavorAware ? 'flavor-tween' : undefined} />
          <stop offset="100%" stopColor={to} className={flavorAware ? 'flavor-tween' : undefined} />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="60" height="60" rx="19" fill={`url(#${id}-bg)`} />
      <rect x="2" y="2" width="60" height="60" rx="19" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" />

      {/* трубочка */}
      <rect x="35" y="6" width="5.2" height="17" rx="2.6" fill="#fff6f1" transform="rotate(14 37.6 14.5)" />

      {/* стакан */}
      <path d="M19.5 25 L24.2 49.5 Q32 53.6 39.8 49.5 L44.5 25 Z" fill="#fff6f1" />
      <path d="M19.5 25 L24.2 49.5 Q32 53.6 39.8 49.5 L44.5 25 Z" fill="#2a1114" fillOpacity="0.06" />
      <rect x="16.4" y="19" width="31.2" height="6.4" rx="3.2" fill="#fff6f1" />

      {/* жемчуг */}
      <g fill="#3c1c18">
        <circle cx="27.4" cy="45.2" r="2.9" />
        <circle cx="32.8" cy="46.4" r="3.1" />
        <circle cx="38.2" cy="45" r="2.8" />
        <circle cx="30.1" cy="40.2" r="2.4" />
        <circle cx="35.6" cy="40.6" r="2.3" />
      </g>

      {/* сердце вместо пара */}
      <g transform="translate(49.5 13) scale(0.92)">
        <path d="M0 5 C -7 -1, -5.4 -9.2, 0 -4.6 C 5.4 -9.2, 7 -1, 0 5 Z" fill="#fff6f1" />
      </g>
    </svg>
  )
}

/** Значок + название в строку */
export function Logo({ className, flavorAware = true }: { className?: string; flavorAware?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <LogoMark className="h-9 w-9 shrink-0" flavorAware={flavorAware} id="logo-nav" />
      <span className="font-display text-lg leading-none tracking-tight text-milk">
        bubble<span className="italic text-[var(--f-glow)] flavor-tween">tea</span>love
      </span>
    </span>
  )
}
