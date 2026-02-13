import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16 lg:pt-20 flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-4">
          <h1 className="font-display text-4xl lg:text-6xl text-neon-pink mb-4">
            Produit introuvable
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Le produit que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link
            href="/catalogue"
            className="inline-block bg-neon-pink text-primary-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider border-4 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-colors"
          >
            Retour au catalogue
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
