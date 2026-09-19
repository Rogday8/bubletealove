import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Reveal } from './Reveal'

const faq = [
  {
    q: 'Из чего вы варите жемчуг?',
    a: 'Тапиоковый крахмал, вода и тростниковый сахар — больше ничего. Варим партиями каждые четыре часа: после этого срока жемчуг теряет упругость, и мы его списываем.',
  },
  {
    q: 'Можно совсем без сахара?',
    a: 'Да, в конструкторе есть 0%. Чайная основа останется прежней — поменяется только сироп. Для манго и клубники советуем хотя бы 30%, иначе кислит.',
  },
  {
    q: 'Есть ли безлактозные варианты?',
    a: 'Любой молочный вкус собираем на овсяном или кокосовом молоке без доплаты. Кокос Сноу изначально готовится на кокосовом.',
  },
  {
    q: 'Как быстро отдаёте заказ?',
    a: 'В среднем 90 секунд на стакан. В час пик берём предзаказ через сайт: приходите ко времени и забираете с отдельной полки.',
  },
  {
    q: 'Что с упаковкой?',
    a: 'Стаканы из rPET, трубочки — бумага с плотным ламинированием, крышку запечатываем плёнкой. За свою многоразовую кружку снимаем 40 ₽.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative z-10 bg-[var(--f-bg-b)] px-5 py-24 flavor-tween sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--f-glow)] flavor-tween">
            Вопросы
          </p>
          <h2 className="font-display text-[clamp(2.3rem,6vw,4.5rem)] leading-[0.95] text-milk">
            Коротко <span className="italic">о главном</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/55">
            Не нашли ответ — напишите в телеграм, отвечаем в течение часа в рабочее время.
          </p>
        </Reveal>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faq.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 0.05} y={20}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={`font-display text-xl transition-colors duration-500 sm:text-2xl ${
                      isOpen ? 'text-[var(--f-glow)]' : 'text-milk group-hover:text-[var(--f-glow)]'
                    }`}
                  >
                    {item.q}
                  </span>
                  <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 transition-colors duration-500 group-hover:border-white/50">
                    <span className="absolute h-px w-3.5 bg-milk" />
                    <motion.span
                      className="absolute h-3.5 w-px bg-milk"
                      animate={{ scaleY: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-sm leading-relaxed text-cream/60">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
