"use client"

import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"

function CartItemRow({
  item,
}: {
  item: { id: string; name: string; price: string; franchise: string; quantity: number }
}) {
  const { removeItem, updateQuantity } = useCart()

  const unitPrice = parseFloat(item.price.replace(",", "."))
  const lineTotal = (unitPrice * item.quantity).toFixed(2).replace(".", ",")

  return (
    <div className="flex gap-3 border-4 border-border bg-card p-3">
      {/* Product image placeholder */}
      <div className="shrink-0 w-20 h-20 bg-muted border-2 border-border flex items-center justify-center">
        <span className="font-display text-lg text-neon-pink/30">{"\u5546"}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[9px] text-neon-pink uppercase tracking-widest mb-0.5">
          {item.franchise}
        </p>
        <h4 className="text-xs font-bold text-off-white leading-tight mb-2 line-clamp-2">
          {item.name}
        </h4>

        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div className="flex items-center border-2 border-border">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 text-off-white hover:bg-neon-pink hover:text-primary-foreground transition-colors"
              aria-label="Diminuer la quantite"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 text-xs font-bold text-cyber-yellow min-w-[24px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 text-off-white hover:bg-neon-pink hover:text-primary-foreground transition-colors"
              aria-label="Augmenter la quantite"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Price */}
          <span className="text-sm font-bold text-neon-pink">
            <span className="text-cyber-yellow mr-0.5">&euro;</span>
            {lineTotal}
          </span>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.id)}
        className="shrink-0 self-start p-1 text-muted-foreground hover:text-destructive transition-colors"
        aria-label={`Supprimer ${item.name} du panier`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

export function CartSheet() {
  const { items, isOpen, setIsOpen, totalItems, totalPrice, clearCart } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="bg-background border-l-4 border-border w-full sm:max-w-md p-0 flex flex-col"
      >
        {/* Custom close button override - hide default */}
        <style>{`[data-slot="sheet-content"] > button[data-slot="sheet-close"] { display: none; }`}</style>

        {/* Header */}
        <SheetHeader className="p-0">
          <div className="flex items-center justify-between px-5 py-4 border-b-4 border-border bg-card">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-neon-pink" />
              <SheetTitle className="font-display text-lg tracking-wider text-off-white uppercase">
                PANIER
              </SheetTitle>
              <span className="bg-neon-pink text-primary-foreground text-[10px] font-bold px-2 py-0.5 border-2 border-border">
                {totalItems}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 border-2 border-border text-off-white hover:bg-neon-pink hover:text-primary-foreground transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <SheetDescription className="sr-only">
            Votre panier contient {totalItems} article{totalItems !== 1 ? "s" : ""}
          </SheetDescription>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-20 h-20 border-4 border-border bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-display text-base text-off-white uppercase tracking-wider mb-2">
                PANIER VIDE
              </p>
              <p className="text-xs text-muted-foreground max-w-[200px]">
                Ajoutez des produits pour commencer votre commande
              </p>
              {/* Decorative Japanese text */}
              <span className="font-display text-4xl text-neon-pink/10 mt-6 select-none">
                {"\u7A7A"}
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}

              {/* Clear cart */}
              {items.length > 1 && (
                <button
                  onClick={clearCart}
                  className="self-end text-[10px] uppercase tracking-wider text-muted-foreground hover:text-destructive transition-colors mt-1 font-bold"
                >
                  VIDER LE PANIER
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer with totals and CTAs */}
        {items.length > 0 && (
          <SheetFooter className="p-0 mt-0">
            <div className="border-t-4 border-border">
              {/* Subtotal breakdown */}
              <div className="px-5 py-3 bg-card space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground uppercase tracking-wider font-bold">
                    SOUS-TOTAL
                  </span>
                  <span className="text-off-white font-bold">
                    <span className="text-cyber-yellow mr-0.5">&euro;</span>
                    {totalPrice}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground uppercase tracking-wider font-bold">
                    LIVRAISON
                  </span>
                  <span className="text-off-white font-bold text-[10px]">
                    CALCULE A LA COMMANDE
                  </span>
                </div>
                <div className="border-t-2 border-border pt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-off-white uppercase tracking-wider">
                    TOTAL
                  </span>
                  <span className="text-xl font-bold text-neon-pink">
                    <span className="text-cyber-yellow mr-1">&euro;</span>
                    {totalPrice}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="px-5 py-4 flex flex-col gap-2 bg-background">
                <button
                  className="w-full bg-neon-pink text-primary-foreground py-3 text-xs font-bold uppercase tracking-widest border-4 border-border hover:neon-pink-glow transition-all"
                >
                  VALIDER LA COMMANDE
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-cyber-yellow text-secondary-foreground py-3 text-xs font-bold uppercase tracking-widest border-4 border-border hover:neon-yellow-glow transition-all"
                >
                  VOIR LE PANIER
                </button>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
