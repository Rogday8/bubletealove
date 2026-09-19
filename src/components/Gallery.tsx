import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import blueLagoon from '../assets/media/blue-lagoon.webp'
import sakuraCups from '../assets/media/sakura-cups.webp'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Reveal } from './Reveal'

/**
 * Палитра заведения: две фотографии заказчика.
 * Колонки одной высоты (lg:h-[640px]), фото тянутся на всю карточку —
 * поэтому под ними не остаётся пустоты.
 */
export function Gallery() {
  const ref = useRef<HTMLElement>(null)
  const wide = useMediaQuery('(min-width: 1024px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], ['2.5%', '-2.5%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['-2.5%', '2.5%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.02, 1.12])

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative z-10 overflow-hidden bg-[var(--f-bg-b)] px-5 py-24 flavor-tween sm:px-10 sm:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] items-stretch gap-4 sm:gap-6 lg:grid-cols-12 lg:grid-rows-[640px]">
        {/* большой кадр */}
        <motion.div
          style={wide ? { y: y1 } : undefined}
          className="relative aspect-4/5 overflow-hidden rounded-[32px] border border-white/12 sm:aspect-16/10 lg:col-span-7 lg:aspect-auto lg:h-full lg:min-h-0"
        >
          <motion.img
            style={{ scale }}
            src={sakuraCups}
            alt="Ряд стаканов бабл-ти на фоне цветущей сакуры"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-milk/70">Витрина дня</p>
            <p className="mt-2 font-display text-3xl leading-tight text-milk sm:text-4xl">
              Пять стаканов — пять настроений
            </p>
          </div>
        </motion.div>

        {/* правая колонка: текст сверху, кадр снизу — обе карточки тянутся по высоте */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-5 lg:h-full lg:min-h-0">
          <Reveal className="shrink-0 rounded-[32px] border border-white/10 bg-white/5 p-7 backdrop-blur-sm sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--f-glow)] flavor-tween">
              Первый глоток
            </p>
            <p className="mt-4 font-display text-[clamp(1.5rem,2.2vw,2.1rem)] leading-tight text-milk">
              Сначала слышно, как жемчуг стучит о трубочку. Вкус приходит вторым.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/55">
              Сверху — холодная молочная шапка, посередине чай со льдом, на дне тёплая карамель и жемчуг, который
              ещё помнит кастрюлю. Пока дойдёшь до дна, стакан успевает поменять вкус трижды — и ни разу
              не повторится.
            </p>
          </Reveal>

          <motion.div
            style={wide ? { y: y2 } : undefined}
            className="relative aspect-16/10 overflow-hidden rounded-[32px] border border-white/12 sm:aspect-16/9 lg:aspect-auto lg:min-h-0 lg:flex-1"
          >
            <img
              src={blueLagoon}
              alt="Голубой бабл-ти со льдом и тапиокой"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-milk backdrop-blur-md sm:bottom-6 sm:left-6">
              Blue Lagoon · лимит 40 стаканов
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
