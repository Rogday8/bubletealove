import { motion } from 'motion/react'
import { Reveal } from './Reveal'

const reviews = [
  { name: 'Аня', text: 'Сакура милк — единственный розовый напиток, который не отдаёт сиропом. Беру два.', flavor: 'Sakura Milk' },
  { name: 'Тимур', text: 'Жемчуг реально свежий: тянется, а не хрустит. Видно, что варят день в день.', flavor: 'Brown Sugar' },
  { name: 'Лера', text: 'Взяла матчу на 30% сахара — горчинка на месте, сладость не перебивает.', flavor: 'Matcha Cloud' },
  { name: 'Даша', text: 'Таро дрим как ванильное мороженое, только пить можно. Сын требует каждую субботу.', flavor: 'Taro Dream' },
  { name: 'Рома', text: 'Собрал свой стакан в конструкторе, пришёл — сделали ровно как на экране.', flavor: 'Конструктор' },
  { name: 'Ника', text: 'Блю лагуна выглядит как из рекламы, а на вкус — лайм и кокос, не химия.', flavor: 'Blue Lagoon' },
]

export function Reviews() {
  const row = [...reviews, ...reviews]

  return (
    <section className="relative z-10 overflow-hidden bg-[var(--f-bg-b)] py-24 flavor-tween sm:py-32">
      <Reveal className="mb-12 px-5 text-center sm:px-10">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--f-glow)] flavor-tween">
          Отзывы
        </p>
        <h2 className="font-display text-[clamp(2.3rem,6vw,5.5rem)] leading-[0.95] text-milk">
          Что говорят <span className="italic">у стойки</span>
        </h2>
      </Reveal>

      <div className="edge-fade flex overflow-hidden">
        <motion.div
          className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
        >
          {row.map((r, i) => (
            <figure
              key={i}
              className="flex w-[280px] shrink-0 flex-col justify-between rounded-3xl border border-white/12 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-white/30 hover:bg-white/10 sm:w-[340px] sm:p-8"
            >
              <Stars />
              <blockquote className="mt-5 font-display text-lg leading-snug text-milk/90 sm:text-xl">
                «{r.text}»
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs uppercase tracking-[0.18em]">
                <span className="text-milk/80">{r.name}</span>
                <span className="text-[var(--f-glow)] flavor-tween">{r.flavor}</span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Stars() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-[var(--f-glow)] flavor-tween">
          <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6L2.5 9.5l6.6-.9z" />
        </svg>
      ))}
    </div>
  )
}
