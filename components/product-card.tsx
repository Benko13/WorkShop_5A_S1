"use client"

import Image from "next/image"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

interface ProductCardProps {
  name: string
  price: string
  franchise: string
  badge?: string
  badgeColor?: "pink" | "yellow"
  image?: string
  className?: string
  productId?: string
}

export function ProductCard({
  name,
  price,
  franchise,
  badge,
  badgeColor = "pink",
  image,
  className,
  productId,
}: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const id = productId || name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    addItem({ id, name, price, franchise })
  }

  const CardContent = (
    <>
      {/* Badge */}
      {badge && (
        <div
          className={cn(
            "absolute top-0 left-0 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-b-2 border-r-2 border-border",
            badgeColor === "pink"
              ? "bg-neon-pink text-primary-foreground"
              : "bg-cyber-yellow text-secondary-foreground"
          )}
        >
          {badge}
        </div>
      )}

      {/* Wishlist */}
      <button
        className="absolute top-3 right-3 z-10 p-1.5 bg-background/80 text-off-white/50 hover:text-neon-pink transition-colors"
        aria-label="Ajouter a la liste de souhaits"
      >
        <Heart className="w-4 h-4" />
      </button>

      {/* Image */}
      <div className="relative aspect-square bg-muted flex items-center justify-center overflow-hidden">
        {image ? (
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="text-center">
            <div className="font-display text-2xl text-neon-pink/20 mb-1">{"\u5546\u54C1"}</div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">IMAGE</p>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-neon-pink text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-border opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
            VOIR LE PRODUIT
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-neon-pink uppercase tracking-widest mb-1">
          {franchise}
        </p>
        <h3 className="font-display text-sm text-off-white mb-3 flex-1 leading-snug">
          {name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-neon-pink shrink-0">
            <span className="text-cyber-yellow mr-0.5">&euro;</span>
            {price}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-neon-pink text-primary-foreground px-2 sm:px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-colors shrink-0 whitespace-nowrap"
          >
            AJOUTER
          </button>
        </div>
      </div>
    </>
  )

  const cardClassName = cn(
    "group relative bg-card border-4 border-border hover:border-neon-pink transition-all flex flex-col",
    className
  )

  if (productId) {
    return (
      <Link href={`/produit/${productId}`} className={cardClassName}>
        {CardContent}
      </Link>
    )
  }

  return <div className={cardClassName}>{CardContent}</div>
}
