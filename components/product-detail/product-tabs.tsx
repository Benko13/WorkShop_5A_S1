"use client"

import { useState } from "react"
import { Star, ThumbsUp, Camera } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/product-data"

interface ProductTabsProps {
  product: Product
}

const tabs = [
  { id: "description", label: "DESCRIPTION" },
  { id: "specs", label: "CARACTERISTIQUES" },
  { id: "reviews", label: "AVIS CLIENTS" },
] as const

type TabId = (typeof tabs)[number]["id"]

function generateSpecs(product: Product) {
  const specs: { key: string; value: string }[] = []
  
  if (product.manufacturer) {
    specs.push({ key: "Fabricant", value: product.manufacturer })
  }
  specs.push({ key: "Franchise", value: product.franchise })
  if (product.character && product.character !== "Divers") {
    specs.push({ key: "Personnage", value: product.character })
  }
  if (product.scale) {
    specs.push({ key: "Échelle", value: product.scale })
  }
  specs.push({ key: "Type", value: product.type })
  if (product.rarity) {
    specs.push({ key: "Rareté", value: product.rarity })
  }
  specs.push({ key: "Catégorie", value: product.category })
  specs.push({ key: "Disponibilité", value: product.availability })
  if (product.dateAdded) {
    const date = new Date(product.dateAdded)
    specs.push({ key: "Date d'ajout", value: date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) })
  }
  
  return specs
}

const reviews = [
  {
    id: 1,
    author: "MangaFan42",
    date: "12 janvier 2026",
    rating: 5,
    title: "Incroyable qualite de sculpture",
    comment:
      "La figurine est absolument magnifique. Les details du visage et du bandeau sont parfaitement reproduits. La pose dynamique avec l'effet d'energie est spectaculaire. L'emballage etait soigne et la livraison rapide. Je recommande vivement !",
    helpful: 24,
    hasPhotos: true,
  },
  {
    id: 2,
    author: "OtakuCollector",
    date: "28 decembre 2025",
    rating: 4,
    title: "Tres belle piece, petit defaut de peinture",
    comment:
      "Globalement tres satisfait de cette figurine. La sculpture est exceptionnelle et la base est tres classe. J'ai juste note un petit defaut de peinture sur le col du manteau, mais rien de dramatique. Le rapport qualite/prix est excellent.",
    helpful: 18,
    hasPhotos: false,
  },
  {
    id: 3,
    author: "GojoSupremacy",
    date: "15 decembre 2025",
    rating: 5,
    title: "La meilleure figurine de Gojo du marche",
    comment:
      "Apres avoir compare plusieurs fabricants, celle-ci est clairement la meilleure. Les proportions sont parfaites, les couleurs fideles a l'anime. C'est devenu la piece maitresse de ma collection JJK.",
    helpful: 31,
    hasPhotos: true,
  },
  {
    id: 4,
    author: "AnimeFigures_FR",
    date: "3 novembre 2025",
    rating: 5,
    title: "Parfait pour les fans de JJK",
    comment:
      "Commande recue en parfait etat. La figurine est conforme aux photos et meme plus belle en vrai. Le socle est stable et elegant. L'edition limitee ajoute vraiment de la valeur. A avoir absolument dans sa collection.",
    helpful: 12,
    hasPhotos: false,
  },
]

const ratingDistribution = [
  { stars: 5, count: 89, percentage: 74 },
  { stars: 4, count: 22, percentage: 18 },
  { stars: 3, count: 6, percentage: 5 },
  { stars: 2, count: 2, percentage: 2 },
  { stars: 1, count: 1, percentage: 1 },
]

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const starSize = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5"
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} etoiles sur 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            starSize,
            star <= rating
              ? "fill-cyber-yellow text-cyber-yellow"
              : "fill-transparent text-border/50"
          )}
        />
      ))}
    </div>
  )
}

function DescriptionTab({ product }: { product: Product }) {
  const characterName = product.character !== "Divers" ? product.character : product.franchise
  
  return (
    <div className="asanoha-bg p-6 lg:p-8">
      <div className="max-w-3xl">
        <p className="text-base text-off-white leading-[1.8] mb-6">
          Découvrez ce superbe {product.category.toLowerCase()} de {characterName}, 
          issu de l{"'"}univers {product.franchise}. Ce produit de qualité premium 
          {product.manufacturer && ` fabriqué par ${product.manufacturer}`} capture 
          parfaitement les détails et l{"'"}essence de cet univers emblématique.
        </p>
        <p className="text-base text-off-white leading-[1.8] mb-6">
          {product.scale && `Avec une échelle ${product.scale}, `}
          Ce {product.type.toLowerCase()} {product.category.toLowerCase()} est 
          conçu avec une attention méticuleuse aux détails. Chaque élément est 
          fidèlement reproduit pour offrir une expérience de collection authentique.
        </p>
        <p className="text-base text-off-white leading-[1.8] mb-6">
          {product.manufacturer && `Fabriqué par ${product.manufacturer}, `}
          ce produit de collection bénéficie d{"'"}une finition de qualité exceptionnelle. 
          {product.availability === "Precommande" && " Disponible en précommande, "}
          {product.availability === "Stock Limite" && " Stock limité, "}
          ne manquez pas cette opportunité d{"'"}ajouter cette pièce à votre collection.
        </p>

        {/* Highlights */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Sculpture detaillee par des artisans japonais",
            "Peinture a la main de qualite premium",
            "Socle de presentation inclus",
            "Edition limitee numerotee",
            "Emballage collector protecteur",
            "Produit officiel sous licence",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="text-neon-pink mt-0.5 shrink-0">&#9656;</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SpecsTab({ product }: { product: Product }) {
  const specs = generateSpecs(product)
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" role="table">
        <tbody>
          {specs.map((spec, i) => (
            <tr
              key={spec.key}
              className={cn(
                "border-b-2 border-border/30",
                i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-background"
              )}
            >
              <td className="px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground font-bold w-2/5 border-r-2 border-border/30">
                {spec.key}
              </td>
              <td className="px-6 py-4 text-off-white font-bold">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ReviewsTab({ product }: { product: Product }) {
  const averageRating = product.rating
  const totalReviews = product.reviewCount

  return (
    <div className="p-6 lg:p-8">
      {/* Rating Summary */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        {/* Overall */}
        <div className="flex flex-col items-center justify-center gap-2 lg:min-w-48 shrink-0 p-6 border-4 border-border bg-card">
          <span className="text-5xl font-bold text-cyber-yellow font-mono text-glow-yellow">
            {averageRating}
          </span>
          <StarRating rating={Math.round(averageRating)} size="lg" />
          <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
            {totalReviews} avis
          </span>
        </div>

        {/* Distribution */}
        <div className="flex-1 flex flex-col gap-2">
          {ratingDistribution.map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="text-xs font-bold text-off-white w-8 text-right">
                {row.stars}
              </span>
              <Star className="w-3 h-3 fill-cyber-yellow text-cyber-yellow shrink-0" />
              <div className="flex-1 h-4 bg-muted border border-border/30 overflow-hidden">
                <div
                  className="h-full bg-cyber-yellow transition-all duration-500"
                  style={{ width: `${row.percentage}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-10 text-right font-mono">
                {row.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="border-2 border-border/50 bg-card p-5 lg:p-6 hover:border-border transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-neon-pink">
                    {review.author}
                  </span>
                  {review.hasPhotos && (
                    <span className="flex items-center gap-1 text-[10px] text-cyber-yellow uppercase tracking-wider">
                      <Camera className="w-3 h-3" /> PHOTOS
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {review.date}
                </span>
              </div>
              <StarRating rating={review.rating} />
            </div>

            <h4 className="font-bold text-off-white mb-2 text-sm">
              {review.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {review.comment}
            </p>

            <div className="mt-4 flex items-center gap-4 pt-3 border-t border-border/20">
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider">
                <ThumbsUp className="w-3 h-3" />
                {review.helpful} personnes ont trouve cet avis utile
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* 95% stat callout */}
      <div className="mt-8 p-6 border-4 border-neon-pink bg-card neon-pink-glow">
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold text-neon-pink font-mono text-glow-pink">95%</span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            des clients francais consultent les avis avant achat. Nos avis
            sont verifies et authentiques.
          </p>
        </div>
      </div>
    </div>
  )
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description")

  return (
    <div className="border-4 border-border bg-background">
      {/* Tab Navigation */}
      <nav className="flex border-b-4 border-border overflow-x-auto" aria-label="Informations produit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 min-w-fit px-6 py-4 text-xs lg:text-sm font-bold uppercase tracking-wider border-r-3 border-border last:border-r-0 transition-all whitespace-nowrap",
              activeTab === tab.id
                ? "bg-cyber-yellow text-secondary-foreground"
                : "bg-background text-off-white hover:bg-muted"
            )}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div role="tabpanel">
        {activeTab === "description" && <DescriptionTab product={product} />}
        {activeTab === "specs" && <SpecsTab product={product} />}
        {activeTab === "reviews" && <ReviewsTab product={product} />}
      </div>
    </div>
  )
}
