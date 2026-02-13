export function NewsletterSection() {
  return (
    <section className="relative py-16 lg:py-24 px-4 lg:px-8 border-t-4 border-border">
      <div className="max-w-3xl mx-auto text-center">
        {/* Japanese accent */}
        <div
          className="font-display text-sm text-neon-pink/40 tracking-[0.5em] uppercase mb-4"
          aria-hidden="true"
        >
          {"\u30CB\u30E5\u30FC\u30B9\u30EC\u30BF\u30FC"}
        </div>

        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-off-white mb-4">
          RESTEZ <span className="text-neon-pink text-glow-pink">CONNECTE</span>
        </h2>

        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
          Recevez en avant-premiere les nouvelles sorties, les offres exclusives
          et les actualites du monde manga.
        </p>

        <div className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="votre@email.fr"
            className="flex-1 bg-input text-off-white px-5 py-4 text-sm font-mono border-4 border-border outline-none focus:border-neon-pink transition-colors placeholder:text-muted-foreground"
          />
          <button className="bg-neon-pink text-primary-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest border-4 border-border border-l-0 sm:border-l-4 hover:bg-cyber-yellow hover:text-secondary-foreground transition-colors shrink-0">
            {"S'INSCRIRE"}
          </button>
        </div>

        <p className="text-[10px] text-muted-foreground/60 mt-4">
          En vous inscrivant, vous acceptez notre Politique de Confidentialite.
        </p>
      </div>
    </section>
  )
}
