import { SectionWrapper } from "@/components/section-wrapper"
import { Layers, Trophy, Sparkles } from "lucide-react"

const categories = [
  {
    title: "CARTES DE COLLECTION",
    description: "Boosters, decks et cartes a l'unite de vos jeux preferes",
    icon: Layers,
    jp: "\u30AB\u30FC\u30C9",
    accentColor: "#FF00FF",
    franchises: ["Yu-Gi-Oh!", "Pokemon", "Magic", "One Piece", "Dragon Ball Super"],
  },
  {
    title: "FIGURINES & STATUETTES",
    description: "Figurines de collection premium et statuettes",
    icon: Trophy,
    jp: "\u30D5\u30A3\u30AE\u30E5\u30A2",
    accentColor: "#F7EF00",
    franchises: ["Naruto", "One Piece", "Dragon Ball", "Demon Slayer", "Jujutsu Kaisen"],
  },
  {
    title: "ACCESSOIRES",
    description: "Protege-cartes, classeurs, tapis de jeu et vitrines",
    icon: Sparkles,
    jp: "\u30A2\u30AF\u30BB\u30B5\u30EA\u30FC",
    accentColor: "#FF00FF",
    franchises: ["Protege-cartes", "Classeurs", "Deck Boxes", "Tapis de jeu", "Vitrines"],
  },
]

export function CategoryBlocks() {
  return (
    <SectionWrapper
      title="EXPLORER PAR CATEGORIE"
      subtitle="Trouvez exactement ce que vous cherchez"
      accent="pink"
      id="categories"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <a
              key={cat.title}
              href="/catalogue"
              className="group relative bg-card border-4 border-border hover:border-neon-pink p-8 lg:p-10 flex flex-col min-h-72 transition-all"
            >
              {/* Background Japanese text */}
              <span
                className="absolute bottom-4 right-4 font-display text-5xl lg:text-7xl text-off-white/5 select-none pointer-events-none"
                aria-hidden="true"
              >
                {cat.jp}
              </span>

              {/* Icon */}
              <div
                className="w-14 h-14 flex items-center justify-center border-4 border-border mb-6"
                style={{ backgroundColor: cat.accentColor }}
              >
                <Icon className="w-6 h-6 text-primary-foreground" />
              </div>

              {/* Title */}
              <h3
                className="font-display text-lg lg:text-xl tracking-wider mb-3"
                style={{ color: cat.accentColor }}
              >
                {cat.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                {cat.description}
              </p>

              {/* Sub-franchise tags */}
              <div className="flex flex-wrap gap-2">
                {cat.franchises.map((f) => (
                  <span
                    key={f}
                    className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border/50 px-2 py-1"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: cat.accentColor }}
              />
            </a>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
