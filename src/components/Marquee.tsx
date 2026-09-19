const words = ['жемчужный чай', 'свежая тапиока', 'без порошковых смесей', 'варим каждые 4 часа', 'сахар — по вкусу']

export function Marquee() {
  return (
    <div className="relative z-10 border-y border-white/10 bg-[var(--f-bg-b)] py-5 flavor-tween">
      <div className="edge-fade flex w-full overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...words, ...words].map((w, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 whitespace-nowrap">
              <span className="font-display text-2xl italic text-milk/80 sm:text-3xl">{w}</span>
              <span className="h-2 w-2 rounded-full bg-[var(--f-glow)] flavor-tween" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
