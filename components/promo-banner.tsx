export function PromoBanner() {
  return (
    <section className="relative py-20 lg:py-28 px-4 lg:px-8 overflow-hidden bg-card border-y-4 border-border">
      {/* Speed lines decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={`promo-speed-${i}`}
            className="absolute h-0.5"
            style={{
              top: `${5 + i * 8}%`,
              left: "-30%",
              right: "-30%",
              transform: `rotate(${-5 + i * 1}deg)`,
              background: `linear-gradient(90deg, transparent, ${i % 3 === 0 ? "#FF00FF" : "#F7EF00"}15, transparent)`,
            }}
          />
        ))}
      </div>

      {/* Japanese accent */}
      <div
        className="absolute top-4 left-4 lg:left-12 font-display text-[100px] lg:text-[200px] leading-none text-cyber-yellow/6 select-none pointer-events-none"
        aria-hidden="true"
      >
        {"\u30BB\u30FC\u30EB"}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-block bg-neon-pink px-6 py-2 border-4 border-border mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground">
            OFFRE LIMITEE
          </span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl lg:text-7xl uppercase tracking-wider text-off-white mb-4">
          REDUCTION <span className="text-cyber-yellow text-glow-yellow">FLASH</span>
        </h2>

        <p className="text-sm lg:text-base text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
          Profitez de nos offres speciales sur une selection de figurines et
          packs & boosters. Offre valable dans la limite des stocks
          disponibles.
        </p>

        <a
          href="#promotions"
          className="inline-block bg-cyber-yellow text-secondary-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest border-4 border-border hover:bg-neon-pink hover:text-primary-foreground transition-all hover:translate-x-1 hover:-translate-y-1"
        >
          VOIR LES PROMOTIONS
        </a>
      </div>
    </section>
  )
}
