import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductDetailPage } from "@/components/product-detail/product-detail-page"
import { allProducts } from "@/lib/product-data"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = allProducts.find((p) => p.id === id)
  
  if (!product) {
    return {
      title: "Produit introuvable | ARTS ET SHOP",
    }
  }

  return {
    title: `${product.name} | ARTS ET SHOP`,
    description: `Achetez ${product.name} - ${product.franchise} sur ARTS ET SHOP. ${product.category} de qualité premium. Livraison rapide en France.`,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = allProducts.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <ProductDetailPage product={product} />
      </main>
      <SiteFooter />
    </div>
  )
}
