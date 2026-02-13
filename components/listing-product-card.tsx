"use client"

import { Heart, Star, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/product-data"
import Image from "next/image"
import Link from "next/link"

interface ListingProductCardProps {
  product: Product
  variant?: "normal" | "featured"
}

export function ListingProductCard({
  product,
  variant = "normal",
}: ListingProductCardProps) {
  const isFeatured = variant === "featured"

  return (
    <Link
      href={`/produit/${product.id}`}
      className={cn(
        "group relative bg-card border-4 border-border hover:border-neon-pink transition-all flex flex-col block",
        isFeatured && "md:col-span-2 md:row-span-2"
      )}
    >
      {/* Badge */}
      {product.badge && (
        <div
          className={cn(
            "absolute top-0 left-0 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-b-2 border-r-2 border-border",
            product.badgeColor === "yellow"
              ? "bg-cyber-yellow text-secondary-foreground"
              : "bg-neon-pink text-primary-foreground"
          )}
        >
          {product.badge}
        </div>
      )}

      {/* Wishlist */}
      <button
        type="button"
        className="absolute top-3 right-3 z-10 p-1.5 text-off-white/50 hover:text-neon-pink transition-colors"
        aria-label="Ajouter a la liste de souhaits"
      >
        <Heart className="w-4 h-4" />
      </button>

      {/* Image */}
      <div
        className={cn(
          "relative bg-muted overflow-hidden",
          isFeatured ? "aspect-square" : "aspect-square"
        )}
      >
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-neon-pink text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-border opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            VOIR LE PRODUIT
          </span>
        </div>
      </div>

      {/* Info */}
      <div className={cn("p-3 lg:p-4 flex flex-col flex-1", isFeatured && "lg:p-6")}>
        {/* Franchise tag */}
        <p className="text-[10px] text-neon-pink uppercase tracking-widest mb-1">
          {product.franchise}
        </p>

        {/* Product name */}
        <h3
          className={cn(
            "font-display text-off-white mb-2 flex-1 leading-snug",
            isFeatured ? "text-sm lg:text-lg" : "text-xs lg:text-sm"
          )}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={`star-${product.id}-${i}`}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(product.rating)
                    ? "fill-cyber-yellow text-cyber-yellow"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Availability */}
        <div className="mb-2">
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              product.availability === "En Stock" && "text-cyber-yellow",
              product.availability === "Stock Limite" && "text-neon-pink",
              product.availability === "Precommande" && "text-off-white"
            )}
          >
            {product.availability === "En Stock" && "EN STOCK"}
            {product.availability === "Stock Limite" && "STOCK LIMITE"}
            {product.availability === "Precommande" && "PRECOMMANDE"}
          </span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "font-bold text-neon-pink",
              isFeatured ? "text-xl lg:text-2xl" : "text-base lg:text-lg"
            )}
          >
            <span className="text-cyber-yellow mr-0.5">{"€"}</span>
            {product.price.toFixed(2).replace(".", ",")}
          </span>
          <button
            type="button"
            className={cn(
              "bg-neon-pink text-primary-foreground font-bold uppercase tracking-wider border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-colors flex items-center gap-1.5",
              isFeatured
                ? "px-4 py-2 text-[11px]"
                : "px-2 py-1.5 text-[10px]"
            )}
          >
            <ShoppingCart className={cn(isFeatured ? "w-3.5 h-3.5" : "w-3 h-3")} />
            <span className="hidden sm:inline">AJOUTER</span>
          </button>
        </div>
      </div>
    </Link>
  )
}
