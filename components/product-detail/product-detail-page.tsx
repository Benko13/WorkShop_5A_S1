"use client"

import { ProductGallery } from "./product-gallery"
import { ProductInfo } from "./product-info"
import { ProductTabs } from "./product-tabs"
import { JapaneseAccent } from "@/components/section-wrapper"
import { ChevronRight } from "lucide-react"
import type { Product } from "@/lib/product-data"
import Link from "next/link"

interface ProductDetailPageProps {
  product: Product
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const categorySlug = product.category.toLowerCase().replace(/\s+/g, "-")
  const franchiseSlug = product.franchise.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className="relative">
      {/* Breadcrumb */}
      <nav
        className="px-4 lg:px-8 py-4 border-b-2 border-border/30"
        aria-label="Fil d'Ariane"
      >
        <ol className="flex items-center gap-1 text-[10px] uppercase tracking-widest max-w-7xl mx-auto flex-wrap">
          <li>
            <Link href="/" className="text-muted-foreground hover:text-neon-pink transition-colors">
              Accueil
            </Link>
          </li>
          <li><ChevronRight className="w-3 h-3 text-border/50" /></li>
          <li>
            <Link href={`/catalogue?category=${categorySlug}`} className="text-muted-foreground hover:text-neon-pink transition-colors">
              {product.category}
            </Link>
          </li>
          <li><ChevronRight className="w-3 h-3 text-border/50" /></li>
          <li>
            <Link href={`/catalogue?franchise=${franchiseSlug}`} className="text-muted-foreground hover:text-neon-pink transition-colors">
              {product.franchise}
            </Link>
          </li>
          <li><ChevronRight className="w-3 h-3 text-border/50" /></li>
          <li className="text-neon-pink font-bold">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main Product Section */}
      <section className="relative px-4 lg:px-8 py-8 lg:py-16">
        {/* Background Decorative Elements */}
        <JapaneseAccent
          text={"\u30B4\u30B4\u30B4\u30B4"}
          className="top-8 right-4 lg:right-16 rotate-12 opacity-50"
        />
        <JapaneseAccent
          text={"\u7121\u91CF\u7A7A\u51E6"}
          className="bottom-32 left-4 lg:left-16 -rotate-6 opacity-50 text-cyber-yellow/10"
        />

        <div className="max-w-7xl mx-auto">
          {/* Product Grid: Gallery + Info */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
            {/* Gallery - 3/5 width on desktop */}
            <div className="lg:col-span-3">
              <ProductGallery product={product} />
            </div>

            {/* Product Info - 2/5 width on desktop */}
            <div className="lg:col-span-2">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Product Tabs Section */}
      <section className="px-4 lg:px-8 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <ProductTabs product={product} />
        </div>
      </section>
    </div>
  )
}
