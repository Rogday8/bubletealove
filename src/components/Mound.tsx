/**
 * Горка сахарной пудры, на которой стоит стакан — как насыпь матчи в референсе.
 * Живёт между фоном и карточками, поэтому веер проезжает перед ней.
 */
export function Mound() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[34vh] min-h-[200px]">
      <svg viewBox="0 0 1200 380" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
        <defs>
          <linearGradient id="mound-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--f-top)" stopOpacity="0.42" />
            <stop offset="38%" stopColor="var(--f-bottom)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#120608" stopOpacity="0.98" />
          </linearGradient>
          <linearGradient id="mound-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <filter id="mound-soft" x="-10%" y="-20%" width="120%" height="150%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* дальние холмы */}
        <path
          d="M0 380 L0 300 C 160 296, 250 236, 380 244 C 470 250, 520 300, 640 292 C 780 282, 860 226, 980 238 C 1080 248, 1140 292, 1200 288 L1200 380 Z"
          fill="var(--f-bottom)"
          opacity="0.32"
          filter="url(#mound-soft)"
          className="flavor-tween"
        />
        {/* основная насыпь */}
        <path
          d="M0 380 L0 330 C 170 328, 290 314, 400 272 C 480 242, 520 150, 600 128 C 682 150, 722 244, 802 274 C 912 314, 1032 328, 1200 332 L1200 380 Z"
          fill="url(#mound-fill)"
        />
        {/* подсвеченный гребень */}
        <path
          d="M400 272 C 480 242, 520 150, 600 128 C 682 150, 722 244, 802 274"
          fill="none"
          stroke="url(#mound-rim)"
          strokeWidth="3"
        />
        {/* рассыпавшиеся жемчужины */}
        {[
          [330, 316, 9],
          [372, 330, 7],
          [860, 312, 8],
          [906, 328, 6],
          [268, 340, 6],
          [960, 344, 7],
        ].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill="var(--f-pearl)" className="flavor-tween" />
            <circle cx={x - r * 0.3} cy={y - r * 0.35} r={r * 0.3} fill="#fff" opacity="0.4" />
          </g>
        ))}
      </svg>
    </div>
  )
}
