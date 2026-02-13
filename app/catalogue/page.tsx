import type { Metadata } from "next"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductListingPage } from "@/components/product-listing-page"

export const metadata: Metadata = {
  title:
    "Catalogue | ARTS ET SHOP - Cartes, Figurines & Accessoires Manga",
  description:
    "Parcourez notre catalogue complet de cartes de collection, figurines, statuettes et accessoires manga. Filtrez par franchise, prix, rarete et plus.",
}

function CatalogueLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="text-neon-pink text-lg font-bold uppercase tracking-wider">
          Chargement du catalogue...
        </div>
      </div>
    </div>
  )
}

export default function CataloguePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <Suspense fallback={<CatalogueLoading />}>
          <ProductListingPage />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
