"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/product-data"

interface ProductInfoProps {
  product: Product
}

const statusConfig = {
  "En Stock": { label: "EN STOCK", className: "bg-cyber-yellow text-secondary-foreground" },
  "Stock Limite": { label: "STOCK FAIBLE", className: "bg-neon-pink text-primary-foreground" },
  "Precommande": { label: "PRECOMMANDE", className: "bg-background text-off-white border-border" },
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [wishlisted, setWishlisted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const status = statusConfig[product.availability] || statusConfig["En Stock"]
  const sku = product.id.toUpperCase().replace(/-/g, "-")

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Product Info Card */}
      <div className="border-4 lg:border-6 border-border bg-background p-6 lg:p-8 flex flex-col gap-6">
        {/* Franchise & Title */}
        <div>
          <p className="text-[10px] text-neon-pink uppercase tracking-[0.2em] font-bold mb-2">
            {product.franchise}
          </p>
          <h1 className="font-display text-2xl lg:text-[32px] text-off-white leading-tight">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground tracking-wide">
            {product.type} {product.scale && `- Échelle ${product.scale}`} {product.manufacturer && `par ${product.manufacturer}`}
          </p>
        </div>

        {/* Price & Status */}
        <div className="flex items-end gap-4 flex-wrap">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl lg:text-5xl font-bold text-cyber-yellow font-mono">
              &euro;
            </span>
            <span className="text-3xl lg:text-5xl font-bold text-neon-pink font-mono text-glow-pink">
              {product.price.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <span
            className={cn(
              "px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-2",
              status.className
            )}
          >
            {status.label}
          </span>
        </div>

        {/* Quantity & CTA */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <label
              htmlFor="quantity"
              className="text-xs uppercase tracking-wider text-muted-foreground font-bold"
            >
              Quantite
            </label>
            <div className="flex items-center border-4 border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-off-white hover:bg-neon-pink hover:text-primary-foreground transition-colors text-sm font-bold"
                aria-label="Reduire la quantite"
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))
                }
                className="w-12 text-center bg-transparent text-off-white text-sm font-bold border-x-4 border-border outline-none py-2 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="px-3 py-2 text-off-white hover:bg-neon-pink hover:text-primary-foreground transition-colors text-sm font-bold"
                aria-label="Augmenter la quantite"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider border-4 border-border transition-all",
                addedToCart
                  ? "bg-cyber-yellow text-secondary-foreground"
                  : "bg-neon-pink text-primary-foreground hover:bg-cyber-yellow hover:text-secondary-foreground neon-pink-glow"
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              {addedToCart ? "AJOUTE !" : "AJOUTER AU PANIER"}
            </button>
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={cn(
                "p-4 border-4 border-border transition-all",
                wishlisted
                  ? "bg-neon-pink text-primary-foreground"
                  : "bg-transparent text-off-white hover:text-neon-pink"
              )}
              aria-label={wishlisted ? "Retirer de la liste de souhaits" : "Ajouter a la liste de souhaits"}
            >
              <Heart className={cn("w-5 h-5", wishlisted && "fill-current")} />
            </button>
          </div>
        </div>

        {/* SKU & Manufacturer */}
        <div className="flex items-center gap-6 text-xs text-muted-foreground pt-2 border-t-2 border-border/30 flex-wrap">
          <span>
            <span className="uppercase tracking-wider">REF :</span>{" "}
            <span className="text-off-white font-bold">{sku}</span>
          </span>
          {product.manufacturer && (
            <span>
              <span className="uppercase tracking-wider">Fabricant :</span>{" "}
              <span className="text-off-white font-bold">{product.manufacturer}</span>
            </span>
          )}
          {product.character && (
            <span>
              <span className="uppercase tracking-wider">Personnage :</span>{" "}
              <span className="text-off-white font-bold">{product.character}</span>
            </span>
          )}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { icon: Truck, label: "Livraison\nrapide" },
          { icon: ShieldCheck, label: "Produit\nauthentique" },
          { icon: RotateCcw, label: "Retour\n14 jours" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 p-3 border-2 border-border/50 bg-card text-center"
          >
            <Icon className="w-5 h-5 text-cyber-yellow" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider whitespace-pre-line leading-tight">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
