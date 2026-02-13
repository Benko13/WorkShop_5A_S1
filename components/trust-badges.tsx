import { Shield, Truck, RotateCcw, CreditCard } from "lucide-react"

const badges = [
  {
    icon: Shield,
    title: "PRODUITS OFFICIELS",
    description: "Distributeur agree, authenticite garantie",
  },
  {
    icon: Truck,
    title: "LIVRAISON RAPIDE",
    description: "Colissimo & Mondial Relay en France",
  },
  {
    icon: RotateCcw,
    title: "RETOUR 14 JOURS",
    description: "Droit de retractation conforme a la loi",
  },
  {
    icon: CreditCard,
    title: "PAIEMENT SECURISE",
    description: "Cartes Bancaires, Visa, Mastercard, PayPal",
  },
]

export function TrustBadges() {
  return (
    <section className="py-10 lg:py-14 px-4 lg:px-8 border-y-4 border-border bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {badges.map((badge) => {
            const Icon = badge.icon
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center text-center gap-3 p-4"
              >
                <div className="w-12 h-12 flex items-center justify-center border-4 border-border bg-background">
                  <Icon className="w-5 h-5 text-cyber-yellow" />
                </div>
                <div>
                  <h4 className="font-display text-xs tracking-wider text-off-white mb-1">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
