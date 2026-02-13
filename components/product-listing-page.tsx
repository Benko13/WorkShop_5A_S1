"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal, Grid3X3, LayoutGrid, X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { allProducts, franchises, categories, availabilities } from "@/lib/product-data"
import {
  ProductFilterSidebar,
  type FilterState,
} from "@/components/product-filter-sidebar"
import { ListingProductCard } from "@/components/listing-product-card"
import { JapaneseAccent } from "@/components/section-wrapper"

type SortOption =
  | "pertinence"
  | "prix-asc"
  | "prix-desc"
  | "nouveautes"
  | "popularite"
  | "note"

const sortLabels: Record<SortOption, string> = {
  pertinence: "Pertinence",
  "prix-asc": "Prix : Croissant",
  "prix-desc": "Prix : Decroissant",
  nouveautes: "Nouveautes",
  popularite: "Popularite",
  note: "Note moyenne",
}

const defaultFilters: FilterState = {
  priceRange: [0, 400],
  franchises: [],
  categories: [],
  types: [],
  manufacturers: [],
  rarities: [],
  scales: [],
  availabilities: [],
}

export function ProductListingPage() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [sortBy, setSortBy] = useState<SortOption>("pertinence")
  const [gridMode, setGridMode] = useState<"manga" | "uniform">("manga")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)

  // Lire les paramètres d'URL au chargement de la page
  useEffect(() => {
    const franchiseParam = searchParams.get("franchise")
    const categoryParam = searchParams.get("category")
    const sortParam = searchParams.get("sort")
    const availabilityParam = searchParams.get("availability")
    
    if (franchiseParam) {
      const decodedFranchise = decodeURIComponent(franchiseParam)
      // Vérifier que la franchise existe dans la liste des franchises disponibles
      if (franchises.includes(decodedFranchise)) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          franchises: [decodedFranchise],
        }))
      }
    }
    
    if (categoryParam) {
      const decodedCategory = decodeURIComponent(categoryParam)
      // Vérifier que la catégorie existe dans la liste des catégories disponibles
      if (categories.includes(decodedCategory)) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          categories: [decodedCategory],
        }))
      }
    }
    
    if (availabilityParam) {
      const decodedAvailability = decodeURIComponent(availabilityParam)
      // Vérifier que la disponibilité existe dans la liste des disponibilités disponibles
      if (availabilities.includes(decodedAvailability as any)) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          availabilities: [decodedAvailability],
        }))
      }
    }
    
    if (sortParam) {
      const decodedSort = decodeURIComponent(sortParam) as SortOption
      // Vérifier que le tri existe dans les options disponibles
      if (Object.keys(sortLabels).includes(decodedSort)) {
        setSortBy(decodedSort)
      }
    }
  }, [searchParams])

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Price range
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false
      }

      // Franchises
      if (
        filters.franchises.length > 0 &&
        !filters.franchises.includes(product.franchise)
      ) {
        return false
      }

      // Categories
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false
      }

      // Types
      if (
        filters.types.length > 0 &&
        !filters.types.includes(product.type)
      ) {
        return false
      }

      // Manufacturers
      if (
        filters.manufacturers.length > 0 &&
        !filters.manufacturers.includes(product.manufacturer)
      ) {
        return false
      }

      // Rarities
      if (
        filters.rarities.length > 0 &&
        (!product.rarity || !filters.rarities.includes(product.rarity))
      ) {
        return false
      }

      // Scales
      if (
        filters.scales.length > 0 &&
        (!product.scale || !filters.scales.includes(product.scale))
      ) {
        return false
      }

      // Availability
      if (
        filters.availabilities.length > 0 &&
        !filters.availabilities.includes(product.availability)
      ) {
        return false
      }

      return true
    })
  }, [filters])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    switch (sortBy) {
      case "prix-asc":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "prix-desc":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "nouveautes":
        sorted.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        )
        break
      case "popularite":
        sorted.sort((a, b) => b.popularity - a.popularity)
        break
      case "note":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        sorted.sort((a, b) => b.popularity - a.popularity)
    }
    return sorted
  }, [filteredProducts, sortBy])

  // Active filter tags
  const activeFilterTags = useMemo(() => {
    const tags: { label: string; key: string; value: string }[] = []
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 400) {
      tags.push({
        label: `${filters.priceRange[0]}€ - ${filters.priceRange[1]}€`,
        key: "priceRange",
        value: "price",
      })
    }
    for (const f of filters.franchises) tags.push({ label: f, key: "franchises", value: f })
    for (const c of filters.categories) tags.push({ label: c, key: "categories", value: c })
    for (const t of filters.types) tags.push({ label: t, key: "types", value: t })
    for (const m of filters.manufacturers) tags.push({ label: m, key: "manufacturers", value: m })
    for (const r of filters.rarities) tags.push({ label: r, key: "rarities", value: r })
    for (const s of filters.scales) tags.push({ label: s, key: "scales", value: s })
    for (const a of filters.availabilities) tags.push({ label: a, key: "availabilities", value: a })
    return tags
  }, [filters])

  const removeFilterTag = useCallback(
    (key: string, value: string) => {
      if (key === "priceRange") {
        setFilters((prev) => ({ ...prev, priceRange: [0, 400] }))
      } else {
        setFilters((prev) => ({
          ...prev,
          [key]: (prev[key as keyof FilterState] as string[]).filter(
            (v: string) => v !== value
          ),
        }))
      }
    },
    []
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Page header / Breadcrumb */}
      <div className="border-b-4 border-border bg-card asanoha-bg">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 lg:py-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Fil d'Ariane"
            className="flex items-center gap-1.5 mb-4"
          >
            <a
              href="/"
              className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-neon-pink transition-colors"
            >
              Accueil
            </a>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-off-white">
              Catalogue
            </span>
          </nav>

          {/* Title area */}
          <div className="relative">
            <JapaneseAccent
              text={"\u30AB\u30BF\u30ED\u30B0"}
              className="-top-6 right-0 lg:right-8 text-5xl lg:text-7xl"
            />
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider text-off-white">
              CATALOGUE
            </h1>
            <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
              Explorez notre collection complete de produits manga
            </p>
            <div className="mt-4 h-1 w-24 bg-neon-pink" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 lg:py-10">
        <div className="flex gap-6 lg:gap-8">
          {/* Filter sidebar */}
          <ProductFilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            resultCount={sortedProducts.length}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          {/* Product grid area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-4 border-border bg-card p-3 lg:p-4">
              {/* Mobile filter button */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-neon-pink text-primary-foreground px-4 py-2 text-[11px] font-bold uppercase tracking-wider border-2 border-border"
              >
                <SlidersHorizontal className="w-4 h-4" />
                FILTRES
                {activeFilterTags.length > 0 && (
                  <span className="bg-primary-foreground text-neon-pink text-[10px] font-bold w-5 h-5 flex items-center justify-center">
                    {activeFilterTags.length}
                  </span>
                )}
              </button>

              {/* Results count (desktop) */}
              <div className="hidden lg:block text-xs text-muted-foreground">
                <span className="text-neon-pink font-bold">
                  {sortedProducts.length}
                </span>{" "}
                {"produit"}
                {sortedProducts.length !== 1 ? "s" : ""}
              </div>

              <div className="flex items-center gap-3 ml-auto">
                {/* Grid mode toggle */}
                <div className="hidden md:flex items-center border-2 border-border">
                  <button
                    type="button"
                    onClick={() => setGridMode("manga")}
                    className={cn(
                      "p-2 transition-colors",
                      gridMode === "manga"
                        ? "bg-neon-pink text-primary-foreground"
                        : "text-muted-foreground hover:text-off-white"
                    )}
                    aria-label="Grille manga"
                    title="Grille manga"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setGridMode("uniform")}
                    className={cn(
                      "p-2 transition-colors border-l-2 border-border",
                      gridMode === "uniform"
                        ? "bg-neon-pink text-primary-foreground"
                        : "text-muted-foreground hover:text-off-white"
                    )}
                    aria-label="Grille uniforme"
                    title="Grille uniforme"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="flex items-center gap-2 border-2 border-border bg-background px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-off-white hover:border-neon-pink transition-colors"
                  >
                    <span className="text-muted-foreground hidden sm:inline">
                      Trier :
                    </span>
                    {sortLabels[sortBy]}
                  </button>
                  {sortDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setSortDropdownOpen(false)}
                        onKeyDown={() => {}}
                        role="button"
                        tabIndex={0}
                        aria-label="Fermer"
                      />
                      <div className="absolute right-0 top-full mt-1 z-40 bg-background border-4 border-border min-w-52">
                        {(Object.keys(sortLabels) as SortOption[]).map(
                          (option) => (
                            <button
                              type="button"
                              key={option}
                              onClick={() => {
                                setSortBy(option)
                                setSortDropdownOpen(false)
                              }}
                              className={cn(
                                "block w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b border-border/30 last:border-b-0",
                                sortBy === option
                                  ? "bg-neon-pink text-primary-foreground"
                                  : "text-off-white hover:bg-neon-pink/10 hover:text-neon-pink"
                              )}
                            >
                              {sortLabels[option]}
                            </button>
                          )
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Active filter tags */}
            {activeFilterTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Filtres actifs :
                </span>
                {activeFilterTags.map((tag) => (
                  <button
                    type="button"
                    key={`${tag.key}-${tag.value}`}
                    onClick={() => removeFilterTag(tag.key, tag.value)}
                    className="flex items-center gap-1.5 bg-muted border-2 border-border px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-off-white hover:border-neon-pink hover:text-neon-pink transition-colors group"
                  >
                    {tag.label}
                    <X className="w-3 h-3 text-muted-foreground group-hover:text-neon-pink" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setFilters(defaultFilters)}
                  className="text-[10px] font-bold uppercase tracking-wider text-neon-pink hover:text-cyber-yellow transition-colors ml-2"
                >
                  TOUT EFFACER
                </button>
              </div>
            )}

            {/* Product grid */}
            {sortedProducts.length > 0 ? (
              <div
                className={cn(
                  "grid gap-4",
                  gridMode === "manga"
                    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto"
                    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                )}
              >
                {sortedProducts.map((product, index) => {
                  // In manga mode, make every 5th item a featured card
                  const isFeatured =
                    gridMode === "manga" &&
                    (index === 0 || index === 7 || index === 14)

                  return (
                    <ListingProductCard
                      key={product.id}
                      product={product}
                      variant={isFeatured ? "featured" : "normal"}
                    />
                  )
                })}
              </div>
            ) : (
              /* Empty state */
              <div className="border-4 border-border bg-card p-12 lg:p-20 text-center asanoha-bg">
                <div className="font-display text-5xl lg:text-7xl text-neon-pink/20 mb-4">
                  {"\u7A7A"}
                </div>
                <h3 className="font-display text-lg lg:text-xl text-off-white mb-2">
                  AUCUN PRODUIT TROUVE
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  Aucun produit ne correspond a vos criteres de recherche.
                  Essayez de modifier vos filtres.
                </p>
                <button
                  type="button"
                  onClick={() => setFilters(defaultFilters)}
                  className="bg-neon-pink text-primary-foreground px-6 py-3 text-xs font-bold uppercase tracking-wider border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-colors"
                >
                  EFFACER TOUS LES FILTRES
                </button>
              </div>
            )}

            {/* Bottom decorative element */}
            {sortedProducts.length > 0 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <div className="h-px flex-1 bg-border/30" />
                <span className="font-display text-sm text-muted-foreground tracking-widest">
                  {sortedProducts.length} PRODUIT
                  {sortedProducts.length !== 1 ? "S" : ""}
                </span>
                <div className="h-px flex-1 bg-border/30" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
