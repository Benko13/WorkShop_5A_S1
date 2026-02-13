"use client"

import React from "react"

import { useState } from "react"
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  CheckCircle,
  ChevronRight,
  Trash2,
  Plus,
  Minus,
  Lock,
  Shield,
  Truck,
  ArrowLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
interface CartItem {
  id: number
  name: string
  franchise: string
  price: number
  qty: number
  image?: string
}

/* ------------------------------------------------------------------ */
/* Dummy data                                                          */
/* ------------------------------------------------------------------ */
const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Figurine Jujutsu Kaisen Satoru Gojo 1/7",
    franchise: "Jujutsu Kaisen",
    price: 89.99,
    qty: 1,
  },
  {
    id: 2,
    name: "Booster Box One Piece Card Game OP-09",
    franchise: "One Piece",
    price: 94.5,
    qty: 2,
  },
  {
    id: 3,
    name: "Nendoroid Demon Slayer Tanjiro Kamado",
    franchise: "Demon Slayer",
    price: 54.99,
    qty: 1,
  },
]

/* ------------------------------------------------------------------ */
/* Step definitions                                                    */
/* ------------------------------------------------------------------ */
const STEPS = [
  { id: 0, label: "RECAPITULATIF", icon: ShoppingBag, labelFull: "Recapitulatif de commande" },
  { id: 1, label: "LIVRAISON", icon: MapPin, labelFull: "Adresse de livraison" },
  { id: 2, label: "PAIEMENT", icon: CreditCard, labelFull: "Mode de paiement" },
  { id: 3, label: "CONFIRMATION", icon: CheckCircle, labelFull: "Confirmation" },
] as const

/* ------------------------------------------------------------------ */
/* Kawaii success icon (SVG)                                            */
/* ------------------------------------------------------------------ */
function KawaiiSuccess() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-28 h-28 md:w-36 md:h-36 mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Body circle */}
      <circle cx="60" cy="60" r="50" fill="#FF00FF" stroke="#FFFFFF" strokeWidth="4" />
      {/* Blush left */}
      <ellipse cx="35" cy="68" rx="8" ry="5" fill="#FF66FF" opacity="0.6" />
      {/* Blush right */}
      <ellipse cx="85" cy="68" rx="8" ry="5" fill="#FF66FF" opacity="0.6" />
      {/* Left eye */}
      <ellipse cx="42" cy="52" rx="5" ry="7" fill="#111111" />
      <ellipse cx="43" cy="49" rx="2" ry="2.5" fill="#FFFFFF" />
      {/* Right eye */}
      <ellipse cx="78" cy="52" rx="5" ry="7" fill="#111111" />
      <ellipse cx="79" cy="49" rx="2" ry="2.5" fill="#FFFFFF" />
      {/* Smile */}
      <path
        d="M45 72 Q60 88 75 72"
        stroke="#111111"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Star left */}
      <polygon
        points="12,20 14,26 20,26 15,30 17,36 12,32 7,36 9,30 4,26 10,26"
        fill="#F7EF00"
      />
      {/* Star right */}
      <polygon
        points="108,15 110,21 116,21 111,25 113,31 108,27 103,31 105,25 100,21 106,21"
        fill="#F7EF00"
      />
      {/* Checkmark */}
      <path
        d="M44 60 L55 71 L78 44"
        stroke="#F7EF00"
        strokeWidth="0"
        fill="none"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Step indicator bar                                                   */
/* ------------------------------------------------------------------ */
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-10 md:mb-14 overflow-x-auto pb-2">
      {STEPS.map((step, i) => {
        const Icon = step.icon
        const done = i < current
        const active = i === current
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none min-w-0">
            <div className="flex flex-col items-center gap-2 min-w-[60px]">
              <div
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-4 transition-all",
                  done && "bg-neon-pink border-border text-primary-foreground",
                  active && "bg-cyber-yellow border-border text-secondary-foreground neon-yellow-glow",
                  !done && !active && "bg-muted border-border/40 text-muted-foreground"
                )}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span
                className={cn(
                  "text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-center whitespace-nowrap",
                  done && "text-neon-pink",
                  active && "text-cyber-yellow",
                  !done && !active && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 mx-2 md:mx-4">
                <div
                  className={cn(
                    "h-1 transition-all",
                    i < current ? "bg-neon-pink" : "bg-border/30"
                  )}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Step 0 — Order Summary                                              */
/* ------------------------------------------------------------------ */
function OrderSummary({
  cart,
  setCart,
  onNext,
}: {
  cart: CartItem[]
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  onNext: () => void
}) {
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0)
  const shipping = subtotal >= 80 ? 0 : 6.99
  const total = subtotal + shipping

  function updateQty(id: number, delta: number) {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c))
        .filter((c) => c.qty > 0)
    )
  }
  function remove(id: number) {
    setCart((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-off-white mb-8">
        Recapitulatif de commande
      </h2>

      {cart.length === 0 ? (
        <div className="border-4 border-border p-10 text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-wider">
            Votre panier est vide
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items list */}
          <div className="flex-1 flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border-4 border-border bg-card flex flex-col sm:flex-row"
              >
                {/* Placeholder image */}
                <div className="w-full sm:w-28 md:w-32 aspect-square sm:aspect-auto bg-muted flex items-center justify-center shrink-0 border-b-4 sm:border-b-0 sm:border-r-4 border-border">
                  <span className="font-display text-3xl text-neon-pink/20" aria-hidden="true">
                    {"\u5546"}
                  </span>
                </div>
                <div className="flex-1 p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] text-neon-pink uppercase tracking-widest mb-1">
                        {item.franchise}
                      </p>
                      <h3 className="font-display text-sm text-off-white leading-snug">
                        {item.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                      aria-label={`Supprimer ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    {/* Quantity controls */}
                    <div className="flex items-center border-4 border-border">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-off-white hover:bg-neon-pink hover:text-primary-foreground transition-colors"
                        aria-label="Diminuer la quantite"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 h-8 flex items-center justify-center text-sm font-bold text-off-white border-x-4 border-border">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-off-white hover:bg-neon-pink hover:text-primary-foreground transition-colors"
                        aria-label="Augmenter la quantite"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-lg font-bold text-neon-pink">
                      <span className="text-cyber-yellow mr-0.5">&euro;</span>
                      {(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Totals sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="border-4 border-border bg-card p-6 flex flex-col gap-4">
              <h3 className="font-display text-base uppercase tracking-wider text-off-white">
                Total
              </h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground uppercase tracking-wider text-xs">Sous-total</span>
                <span className="text-off-white font-bold">{subtotal.toFixed(2)} &euro;</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground uppercase tracking-wider text-xs">Livraison</span>
                <span className={cn("font-bold", shipping === 0 ? "text-cyber-yellow" : "text-off-white")}>
                  {shipping === 0 ? "GRATUITE" : `${shipping.toFixed(2)} \u20AC`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-muted-foreground">
                  Livraison gratuite a partir de 80 &euro;
                </p>
              )}
              <div className="h-px bg-border/40" />
              <div className="flex items-center justify-between">
                <span className="font-display text-base uppercase tracking-wider text-off-white">Total TTC</span>
                <span className="text-2xl font-bold text-neon-pink">
                  <span className="text-cyber-yellow mr-0.5">&euro;</span>
                  {total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={onNext}
                disabled={cart.length === 0}
                className="mt-2 w-full bg-neon-pink text-primary-foreground py-3 text-sm font-bold uppercase tracking-widest border-4 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                CONTINUER
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Lock className="w-4 h-4 text-cyber-yellow shrink-0" />
                <span className="uppercase tracking-wider">Paiement 100% securise</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Shield className="w-4 h-4 text-cyber-yellow shrink-0" />
                <span className="uppercase tracking-wider">Produits authentiques garantis</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Truck className="w-4 h-4 text-cyber-yellow shrink-0" />
                <span className="uppercase tracking-wider">Expedition sous 24-48h</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Step 1 — Shipping Address                                           */
/* ------------------------------------------------------------------ */
function ShippingAddress({
  onNext,
  onBack,
}: {
  onNext: () => void
  onBack: () => void
}) {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    adresse: "",
    complement: "",
    codePostal: "",
    ville: "",
    telephone: "",
  })
  const [shippingMethod, setShippingMethod] = useState(0)

  const fieldDefs: { key: keyof typeof formData; label: string; placeholder: string; half?: boolean }[] = [
    { key: "prenom", label: "PRENOM", placeholder: "Votre prenom", half: true },
    { key: "nom", label: "NOM", placeholder: "Votre nom", half: true },
    { key: "adresse", label: "ADRESSE", placeholder: "Numero et nom de rue" },
    { key: "complement", label: "COMPLEMENT", placeholder: "Appartement, batiment, etc. (optionnel)" },
    { key: "codePostal", label: "CODE POSTAL", placeholder: "75001", half: true },
    { key: "ville", label: "VILLE", placeholder: "Paris", half: true },
    { key: "telephone", label: "TELEPHONE", placeholder: "06 12 34 56 78" },
  ]

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-off-white mb-8">
        Adresse de livraison
      </h2>

      <div className="max-w-2xl">
        <div className="border-4 border-border bg-card p-6 md:p-8">
          <div className="flex flex-wrap gap-4">
            {fieldDefs.map((f) => (
              <div key={f.key} className={cn("flex flex-col gap-2", f.half ? "w-full sm:flex-1 sm:min-w-[200px]" : "w-full")}>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {f.label}
                </label>
                <input
                  type="text"
                  value={formData[f.key]}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full bg-input border-4 border-border px-4 py-3 text-sm text-off-white font-mono outline-none placeholder:text-muted-foreground focus:border-neon-pink transition-colors"
                />
              </div>
            ))}
          </div>

          {/* Country locked to France */}
          <div className="mt-4 flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              PAYS
            </label>
            <div className="bg-muted border-4 border-border/40 px-4 py-3 text-sm text-off-white font-mono flex items-center gap-2">
              <span aria-hidden="true">&#127467;&#127479;</span> France
            </div>
          </div>

          {/* Shipping method selector */}
          <div className="mt-8">
            <h3 className="font-display text-base uppercase tracking-wider text-off-white mb-4">
              Mode de livraison
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { name: "Colissimo", delay: "2-3 jours ouvrables", price: "6,99 \u20AC" },
                { name: "Mondial Relay", delay: "3-5 jours ouvrables", price: "4,99 \u20AC" },
                { name: "Colissimo Express", delay: "24h", price: "12,99 \u20AC" },
              ].map((method, i) => (
                <button
                  type="button"
                  key={method.name}
                  onClick={() => setShippingMethod(i)}
                  className={cn(
                    "flex items-center gap-4 border-4 p-4 cursor-pointer transition-colors text-left",
                    shippingMethod === i ? "border-neon-pink" : "border-border hover:border-neon-pink/50"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 border-4 flex items-center justify-center shrink-0",
                    shippingMethod === i ? "border-neon-pink" : "border-border"
                  )}>
                    {shippingMethod === i && <div className="w-2 h-2 bg-neon-pink" />}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold uppercase tracking-widest text-off-white">
                      {method.name}
                    </span>
                    <span className="block text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                      {method.delay}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-cyber-yellow">{method.price}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-off-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            RETOUR
          </button>
          <button
            onClick={onNext}
            className="bg-neon-pink text-primary-foreground px-8 py-3 text-sm font-bold uppercase tracking-widest border-4 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-colors flex items-center gap-2"
          >
            CONTINUER
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Step 2 — Payment                                                    */
/* ------------------------------------------------------------------ */
function PaymentMethod({
  cart,
  onNext,
  onBack,
}: {
  cart: CartItem[]
  onNext: () => void
  onBack: () => void
}) {
  const [selected, setSelected] = useState<"cb" | "paypal">("cb")
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0)
  const shipping = subtotal >= 80 ? 0 : 6.99
  const total = subtotal + shipping

  const paymentMethods = [
    {
      id: "cb" as const,
      name: "Carte Bancaire",
      desc: "Visa, Mastercard, Cartes Bancaires",
      icons: ["VISA", "MC", "CB"],
    },
    {
      id: "paypal" as const,
      name: "PayPal",
      desc: "Payez avec votre compte PayPal",
      icons: ["PAYPAL"],
    },
  ]

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-off-white mb-8">
        Mode de paiement
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 max-w-2xl">
          {/* Payment method selection */}
          <div className="flex flex-col gap-4 mb-6">
            {paymentMethods.map((pm) => (
              <button
                key={pm.id}
                onClick={() => setSelected(pm.id)}
                className={cn(
                  "text-left border-4 p-5 transition-all",
                  selected === pm.id
                    ? "border-neon-pink bg-card neon-pink-glow"
                    : "border-border bg-card hover:border-neon-pink/50"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-sm font-bold uppercase tracking-widest text-off-white">
                      {pm.name}
                    </span>
                    <span className="block text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                      {pm.desc}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {pm.icons.map((icon) => (
                      <span
                        key={icon}
                        className={cn(
                          "border-2 px-2 py-0.5 text-[10px] font-bold",
                          selected === pm.id
                            ? "border-neon-pink text-neon-pink"
                            : "border-border text-off-white"
                        )}
                      >
                        {icon}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Card form (only when CB selected) */}
          {selected === "cb" && (
            <div className="border-4 border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-4 h-4 text-cyber-yellow" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyber-yellow">
                  Connexion securisee SSL
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    NUMERO DE CARTE
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full bg-input border-4 border-border px-4 py-3 text-sm text-off-white font-mono outline-none placeholder:text-muted-foreground focus:border-neon-pink transition-colors"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      DATE D&apos;EXPIRATION
                    </label>
                    <input
                      type="text"
                      placeholder="MM / AA"
                      className="w-full bg-input border-4 border-border px-4 py-3 text-sm text-off-white font-mono outline-none placeholder:text-muted-foreground focus:border-neon-pink transition-colors"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full bg-input border-4 border-border px-4 py-3 text-sm text-off-white font-mono outline-none placeholder:text-muted-foreground focus:border-neon-pink transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    NOM SUR LA CARTE
                  </label>
                  <input
                    type="text"
                    placeholder="NOM COMPLET"
                    className="w-full bg-input border-4 border-border px-4 py-3 text-sm text-off-white font-mono outline-none placeholder:text-muted-foreground focus:border-neon-pink transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PayPal message */}
          {selected === "paypal" && (
            <div className="border-4 border-border bg-card p-8 flex flex-col items-center gap-4">
              <div className="border-4 border-border px-6 py-3 text-2xl font-bold tracking-wider text-[#0070BA]">
                PAYPAL
              </div>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                Vous serez redirige vers PayPal pour finaliser votre paiement en toute securite.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-off-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              RETOUR
            </button>
            <button
              onClick={onNext}
              className="bg-cyber-yellow text-secondary-foreground px-8 py-3 text-sm font-bold uppercase tracking-widest border-4 border-border hover:bg-neon-pink hover:text-primary-foreground transition-colors flex items-center gap-2 neon-yellow-glow"
            >
              <Lock className="w-4 h-4" />
              PAYER {total.toFixed(2)} &euro;
            </button>
          </div>
        </div>

        {/* Order sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="border-4 border-border bg-card p-5">
            <h3 className="font-display text-sm uppercase tracking-wider text-off-white mb-4">
              Votre commande
            </h3>
            <div className="flex flex-col gap-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-off-white truncate">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">x{item.qty}</p>
                  </div>
                  <span className="text-xs font-bold text-off-white shrink-0">
                    {(item.price * item.qty).toFixed(2)} &euro;
                  </span>
                </div>
              ))}
            </div>
            <div className="h-px bg-border/30 my-4" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground uppercase tracking-wider">Sous-total</span>
              <span className="text-off-white font-bold">{subtotal.toFixed(2)} &euro;</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-muted-foreground uppercase tracking-wider">Livraison</span>
              <span className={cn("font-bold", shipping === 0 ? "text-cyber-yellow" : "text-off-white")}>
                {shipping === 0 ? "GRATUITE" : `${shipping.toFixed(2)} \u20AC`}
              </span>
            </div>
            <div className="h-px bg-border/30 my-4" />
            <div className="flex items-center justify-between">
              <span className="font-display text-sm uppercase tracking-wider text-off-white">Total</span>
              <span className="text-xl font-bold text-neon-pink">
                <span className="text-cyber-yellow mr-0.5">&euro;</span>
                {total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Security badges */}
          <div className="mt-4 border-4 border-border/40 bg-card p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-cyber-yellow shrink-0" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Paiement securise 256-bit SSL
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-cyber-yellow shrink-0" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Vos donnees sont protegees
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Step 3 — Confirmation                                               */
/* ------------------------------------------------------------------ */
function Confirmation({ cart }: { cart: CartItem[] }) {
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0)
  const shipping = subtotal >= 80 ? 0 : 6.99
  const total = subtotal + shipping
  const orderId = `ASF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Kawaii success */}
      <div className="mb-8">
        <KawaiiSuccess />
      </div>

      <h2 className="font-display text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-cyber-yellow text-glow-yellow mb-4">
        Commande confirmee !
      </h2>
      <p className="text-sm text-muted-foreground mb-2">
        Merci pour votre achat ! Votre commande a ete traitee avec succes.
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        Un email de confirmation a ete envoye avec les details de votre commande.
      </p>

      {/* Order details card */}
      <div className="border-4 border-border bg-card p-6 md:p-8 text-left">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
              Numero de commande
            </p>
            <p className="font-display text-xl text-neon-pink text-glow-pink">{orderId}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
              Total paye
            </p>
            <p className="text-xl font-bold text-neon-pink">
              <span className="text-cyber-yellow mr-0.5">&euro;</span>
              {total.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="h-px bg-border/30 mb-6" />

        {/* Item list */}
        <div className="flex flex-col gap-3">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-2 py-2 border-b border-border/20 last:border-b-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-off-white truncate">{item.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {item.franchise} &middot; Qte: {item.qty}
                </p>
              </div>
              <span className="text-sm font-bold text-off-white shrink-0">
                {(item.price * item.qty).toFixed(2)} &euro;
              </span>
            </div>
          ))}
        </div>

        <div className="h-px bg-border/30 my-6" />

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground uppercase tracking-wider">Sous-total</span>
            <span className="text-off-white font-bold">{subtotal.toFixed(2)} &euro;</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground uppercase tracking-wider">Livraison</span>
            <span className={cn("font-bold", shipping === 0 ? "text-cyber-yellow" : "text-off-white")}>
              {shipping === 0 ? "GRATUITE" : `${shipping.toFixed(2)} \u20AC`}
            </span>
          </div>
        </div>

        <div className="h-px bg-border/30 my-6" />

        {/* Delivery info */}
        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 text-cyber-yellow shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-off-white">
              Livraison estimee
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Colissimo — 2 a 3 jours ouvrables
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#suivi"
          className="w-full sm:w-auto bg-neon-pink text-primary-foreground px-8 py-3 text-sm font-bold uppercase tracking-widest border-4 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-colors text-center"
        >
          SUIVRE MA COMMANDE
        </a>
        <a
          href="/"
          className="w-full sm:w-auto bg-card text-off-white px-8 py-3 text-sm font-bold uppercase tracking-widest border-4 border-border hover:border-neon-pink transition-colors text-center"
        >
          RETOUR A LA BOUTIQUE
        </a>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main Checkout Component                                             */
/* ------------------------------------------------------------------ */
export function CheckoutFlow() {
  const [step, setStep] = useState(0)
  const [cart, setCart] = useState<CartItem[]>(initialCart)

  function goNext() {
    setStep((s) => Math.min(s + 1, 3))
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }
  function goBack() {
    setStep((s) => Math.max(s - 1, 0))
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen bg-background asanoha-bg py-8 md:py-12 px-4 lg:px-8">
      {/* Decorative Japanese text */}
      <div
        className="absolute top-12 right-4 lg:right-12 font-display text-5xl lg:text-7xl text-neon-pink/[0.06] select-none pointer-events-none writing-vertical"
        aria-hidden="true"
        style={{ writingMode: "vertical-rl" }}
      >
        {"\u304A\u4F1A\u8A08"}
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 shrink-0"
          >
            <span className="font-display text-xl tracking-wider text-neon-pink">ARTS</span>
            <span className="font-display text-xl tracking-wider text-cyber-yellow">ET SHOP</span>
          </a>
          <div className="flex-1 h-1 bg-border/20" />
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-cyber-yellow" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyber-yellow">
              PAIEMENT SECURISE
            </span>
          </div>
        </div>

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* Step content */}
        <div>
          {step === 0 && <OrderSummary cart={cart} setCart={setCart} onNext={goNext} />}
          {step === 1 && <ShippingAddress onNext={goNext} onBack={goBack} />}
          {step === 2 && <PaymentMethod cart={cart} onNext={goNext} onBack={goBack} />}
          {step === 3 && <Confirmation cart={cart} />}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-[10px] text-muted-foreground/50">Generated by Superagent.</p>
        </div>
      </div>
    </section>
  )
}
