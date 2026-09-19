import { motion } from 'motion/react'
import { useEffect } from 'react'

const WORD = 'bubble tea love'
const DURATION = 1500

/** Короткая заставка: стакан наливается, слово собирается по буквам — и экран уходит. */
export function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, DURATION)
    const skip = () => onDone()
    window.addEventListener('pointerdown', skip)
    window.addEventListener('keydown', skip)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
    }
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-void"
      exit={{ opacity: 0, filter: 'blur(24px)', scale: 1.08 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(45% 40% at 50% 46%, #7a3346 0%, transparent 70%)',
        }}
        initial={{ opacity: 0.2, scale: 0.8 }}
        animate={{ opacity: 0.9, scale: 1.15 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <div className="relative flex flex-col items-center gap-7">
        <svg viewBox="0 0 120 170" className="h-32 w-auto sm:h-40">
          <defs>
            <clipPath id="splash-cup">
              <path d="M22 40 L32 140 Q60 152 88 140 L98 40 Z" />
            </clipPath>
            <linearGradient id="splash-liquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde7e4" />
              <stop offset="40%" stopColor="#f6c3c8" />
              <stop offset="100%" stopColor="#e98fa0" />
            </linearGradient>
          </defs>

          <g clipPath="url(#splash-cup)">
            <motion.rect
              x="0"
              width="120"
              fill="url(#splash-liquid)"
              initial={{ y: 160, height: 0 }}
              animate={{ y: 52, height: 110 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />
            {[38, 56, 74, 90].map((x, i) => (
              <motion.circle
                key={x}
                cx={x}
                r="7"
                fill="#6b2a33"
                initial={{ cy: -20, opacity: 0 }}
                animate={{ cy: 128 - (i % 2) * 14, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.35 + i * 0.09, ease: [0.5, 0, 0.75, 0] }}
              />
            ))}
          </g>

          <path d="M22 40 L32 140 Q60 152 88 140 L98 40 Z" fill="none" stroke="#fff6f1" strokeOpacity="0.85" strokeWidth="3" />
          <rect x="14" y="30" width="92" height="13" rx="6.5" fill="#fff6f1" />
          <motion.rect
            x="66"
            y="4"
            width="11"
            height="42"
            rx="5.5"
            fill="#fff6f1"
            initial={{ rotate: -14, originX: '72px', originY: '46px' }}
            animate={{ rotate: 8 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </svg>

        <div className="flex overflow-hidden font-display text-2xl tracking-tight text-milk sm:text-3xl">
          {WORD.split('').map((c, i) => (
            <motion.span
              key={i}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
              className={c === 't' || c === 'e' ? 'italic text-rose' : undefined}
            >
              {c === ' ' ? ' ' : c}
            </motion.span>
          ))}
        </div>

        <div className="h-px w-40 overflow-hidden bg-white/15">
          <motion.div
            className="h-full bg-rose"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: DURATION / 1000, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
