import Link from "next/link"

// Helper function to build catalogue URL with filters
const buildCatalogueUrl = (params: { category?: string; availability?: string }) => {
  const searchParams = new URLSearchParams()
  if (params.category) {
    searchParams.set("category", params.category)
  }
  if (params.availability) {
    searchParams.set("availability", params.availability)
  }
  return `/catalogue${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
}

export function SiteFooter() {
  return (
    <footer className="bg-background border-t-4 border-border asanoha-bg">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-display text-2xl tracking-wider text-neon-pink">
                ARTS
              </span>
              <span className="font-display text-2xl tracking-wider text-cyber-yellow">
                ET SHOP
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Votre boutique en ligne pour packs & boosters, figurines,
              statuettes et accessoires du monde Manga et Japanimation.
            </p>
            <p className="text-xs text-muted-foreground">
              contact@artsetshop.fr
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-base tracking-wider text-off-white mb-6">
              NAVIGATION
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href={buildCatalogueUrl({ category: "Booster" })}
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  PACKS & BOOSTERS
                </Link>
              </li>
              <li>
                <Link
                  href={buildCatalogueUrl({ category: "Figurines" })}
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  FIGURINES & STATUETTES
                </Link>
              </li>
              <li>
                <Link
                  href={buildCatalogueUrl({ category: "Autres" })}
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  ACCESSOIRES
                </Link>
              </li>
              <li>
                <Link
                  href={buildCatalogueUrl({ availability: "Precommande" })}
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  PRÉCOMMANDES
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue"
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  PROMOTIONS
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-display text-base tracking-wider text-off-white mb-6">
              MON COMPTE
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/mon-compte"
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  MON COMPTE
                </Link>
              </li>
              <li>
                <Link
                  href="/mon-compte"
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  HISTORIQUE DES COMMANDES
                </Link>
              </li>
              <li>
                <Link
                  href="/mon-compte"
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  MON CLASSEUR
                </Link>
              </li>
              <li>
                <Link
                  href="/mon-compte"
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  SUIVI DE COMMANDE
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-base tracking-wider text-off-white mb-6">
              INFORMATIONS
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  MENTIONS LÉGALES
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  CONDITIONS GÉNÉRALES DE VENTE
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  POLITIQUE DE CONFIDENTIALITÉ
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-wider"
                >
                  CONTACTEZ-NOUS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t-2 border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Paiement securise :
              </span>
              <div className="flex items-center gap-3">
                <span className="border-2 border-border px-3 py-1 text-xs font-bold text-off-white">
                  CB
                </span>
                <span className="border-2 border-border px-3 py-1 text-xs font-bold text-off-white">
                  VISA
                </span>
                <span className="border-2 border-border px-3 py-1 text-xs font-bold text-off-white">
                  MASTERCARD
                </span>
                <span className="border-2 border-border px-3 py-1 text-xs font-bold text-off-white">
                  PAYPAL
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Livraison :
              </span>
              <div className="flex items-center gap-3">
                <span className="border-2 border-border px-3 py-1 text-xs font-bold text-off-white">
                  COLISSIMO
                </span>
                <span className="border-2 border-border px-3 py-1 text-xs font-bold text-off-white">
                  MONDIAL RELAY
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t-2 border-border/30">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} artsetshop.fr — Tous droits
            reserves.
          </p>
        </div>
      </div>
    </footer>
  )
}
