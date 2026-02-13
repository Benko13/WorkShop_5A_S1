"use client"

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Search, X, ArrowRight } from "lucide-react"

// --- Mock data representing the store catalog ---
interface SearchProduct {
  id: string
  name: string
  price: string
  franchise: string
  category: "Produits" | "Cartes" | "Figurines" | "Accessoires"
}

interface SearchCategory {
  id: string
  name: string
  count: number
}

interface SearchFranchise {
  id: string
  name: string
  jp: string
}

const PRODUCTS: SearchProduct[] = [
  { id: "p1", name: "Figurine Gojo Satoru Domaine Infini", price: "89,99", franchise: "Jujutsu Kaisen", category: "Figurines" },
  { id: "p2", name: "Booster Box One Piece OP-09", price: "124,99", franchise: "One Piece Card Game", category: "Cartes" },
  { id: "p3", name: "Nendoroid Tanjiro Kamado", price: "54,99", franchise: "Demon Slayer", category: "Figurines" },
  { id: "p4", name: "Figurine Luffy Gear 5 S.H.Figuarts", price: "149,99", franchise: "One Piece", category: "Figurines" },
  { id: "p5", name: "Booster Pack Pokemon Ecarlate et Violet", price: "5,99", franchise: "Pokemon", category: "Cartes" },
  { id: "p6", name: "Statuette Naruto Uzumaki Baryon Mode", price: "199,99", franchise: "Naruto", category: "Figurines" },
  { id: "p7", name: "Deck de Demarrage Yu-Gi-Oh! 2025", price: "12,99", franchise: "Yu-Gi-Oh!", category: "Cartes" },
  { id: "p8", name: "Figurine Deku Full Cowling Pop Up Parade", price: "39,99", franchise: "My Hero Academia", category: "Figurines" },
  { id: "p9", name: "Protege-cartes Pokemon Ultra Premium", price: "14,99", franchise: "Pokemon", category: "Accessoires" },
  { id: "p10", name: "Tapis de Jeu Yu-Gi-Oh! Edition Tournoi", price: "29,99", franchise: "Yu-Gi-Oh!", category: "Accessoires" },
  { id: "p11", name: "Dragon Ball Super Card Game Booster Box", price: "89,99", franchise: "Dragon Ball", category: "Cartes" },
  { id: "p12", name: "Figurine Vegeta Ultra Ego Banpresto", price: "44,99", franchise: "Dragon Ball", category: "Figurines" },
  { id: "p13", name: "Classeur de Collection Pokemon 9 Poches", price: "19,99", franchise: "Pokemon", category: "Accessoires" },
  { id: "p14", name: "Figurine Eren Yeager Forme Titan", price: "129,99", franchise: "Attack on Titan", category: "Figurines" },
  { id: "p15", name: "Booster Pack Magic: The Gathering Bloomburrow", price: "4,99", franchise: "Magic: The Gathering", category: "Cartes" },
  { id: "p16", name: "Vitrine Acrylique pour Figurines", price: "34,99", franchise: "Accessoires", category: "Accessoires" },
]

const CATEGORIES: SearchCategory[] = [
  { id: "c1", name: "Packs & Boosters", count: 342 },
  { id: "c2", name: "Figurines & Statuettes", count: 218 },
  { id: "c3", name: "Accessoires", count: 156 },
  { id: "c4", name: "Booster Boxes", count: 87 },
  { id: "c8", name: "Precommandes", count: 28 },
]

const FRANCHISES: SearchFranchise[] = [
  { id: "f1", name: "Demon Slayer", jp: "\u9B3C\u6EC5\u306E\u5203" },
  { id: "f2", name: "Jujutsu Kaisen", jp: "\u546A\u8853\u5EFB\u6226" },
  { id: "f3", name: "Naruto", jp: "\u30CA\u30EB\u30C8" },
  { id: "f4", name: "One Piece", jp: "\u30EF\u30F3\u30D4\u30FC\u30B9" },
  { id: "f5", name: "Dragon Ball", jp: "\u30C9\u30E9\u30B4\u30F3\u30DC\u30FC\u30EB" },
  { id: "f6", name: "My Hero Academia", jp: "\u50D5\u306E\u30D2\u30FC\u30ED\u30FC" },
  { id: "f7", name: "Attack on Titan", jp: "\u9032\u6483\u306E\u5DE8\u4EBA" },
  { id: "f8", name: "Pokemon", jp: "\u30DD\u30B1\u30E2\u30F3" },
  { id: "f9", name: "Yu-Gi-Oh!", jp: "\u904A\u622F\u738B" },
  { id: "f10", name: "Magic: The Gathering", jp: "MTG" },
]

// --- Fuzzy match helper ---
function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const t = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  return t.includes(q)
}

// --- Highlight matched text ---
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const t = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const idx = t.indexOf(q)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-neon-pink font-bold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

// --- Component ---
interface SearchAutocompleteProps {
  onClose: () => void
}

export function SearchAutocomplete({ onClose }: SearchAutocompleteProps) {
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter results based on query
  const trimmed = query.trim()
  const matchedProducts = trimmed
    ? PRODUCTS.filter((p) => fuzzyMatch(trimmed, p.name) || fuzzyMatch(trimmed, p.franchise)).slice(0, 5)
    : []
  const matchedCategories = trimmed
    ? CATEGORIES.filter((c) => fuzzyMatch(trimmed, c.name)).slice(0, 3)
    : []
  const matchedFranchises = trimmed
    ? FRANCHISES.filter((f) => fuzzyMatch(trimmed, f.name) || fuzzyMatch(trimmed, f.jp)).slice(0, 4)
    : []

  const totalResults = matchedProducts.length + matchedCategories.length + matchedFranchises.length
  const hasResults = totalResults > 0

  // Build a flat list of all items for keyboard navigation
  const allItems: { type: "product" | "category" | "franchise"; id: string }[] = [
    ...matchedProducts.map((p) => ({ type: "product" as const, id: p.id })),
    ...matchedCategories.map((c) => ({ type: "category" as const, id: c.id })),
    ...matchedFranchises.map((f) => ({ type: "franchise" as const, id: f.id })),
  ]

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(-1)
  }, [query])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveIndex((prev) => (prev < allItems.length - 1 ? prev + 1 : 0))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : allItems.length - 1))
      }
    },
    [allItems.length, onClose]
  )

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && dropdownRef.current) {
      const active = dropdownRef.current.querySelector(`[data-index="${activeIndex}"]`)
      active?.scrollIntoView({ block: "nearest" })
    }
  }, [activeIndex])

  const showDropdown = trimmed.length > 0

  return (
    <div ref={containerRef} className="border-t-4 border-border bg-background" onKeyDown={handleKeyDown}>
      {/* Input row */}
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center gap-2 border-4 border-border bg-input px-4 py-3 focus-within:border-neon-pink transition-colors">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher des produits, franchises, categories..."
            className="w-full bg-transparent text-off-white text-sm font-mono outline-none placeholder:text-muted-foreground"
            role="combobox"
            aria-expanded={showDropdown && hasResults}
            aria-controls="search-results"
            aria-activedescendant={activeIndex >= 0 ? `search-item-${activeIndex}` : undefined}
            autoComplete="off"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="shrink-0 p-1 text-muted-foreground hover:text-off-white transition-colors"
              aria-label="Effacer la recherche"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="shrink-0 bg-neon-pink text-primary-foreground px-4 py-1 text-xs font-bold uppercase tracking-wider border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-colors"
          >
            FERMER
          </button>
        </div>
      </div>

      {/* Dropdown results */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          id="search-results"
          role="listbox"
          className="mx-4 lg:mx-8 mb-4 border-4 border-border bg-background max-h-[60vh] overflow-y-auto"
        >
          {!hasResults && (
            <div className="px-6 py-8 text-center">
              <div className="font-display text-3xl text-off-white/10 mb-2" aria-hidden="true">
                {"\u898B\u3064\u304B\u3089\u306A\u3044"}
              </div>
              <p className="text-sm text-muted-foreground font-mono">
                {"Aucun resultat pour \""}<span className="text-neon-pink">{query}</span>{"\""}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1 font-mono">
                Essayez avec un autre terme ou parcourez nos categories
              </p>
            </div>
          )}

          {/* Produits */}
          {matchedProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted border-b-2 border-border">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyber-yellow font-mono">
                  PRODUITS
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  ({matchedProducts.length})
                </span>
              </div>
              {matchedProducts.map((product, i) => {
                const flatIndex = i
                return (
                  <a
                    key={product.id}
                    href={`#product-${product.id}`}
                    id={`search-item-${flatIndex}`}
                    data-index={flatIndex}
                    role="option"
                    aria-selected={activeIndex === flatIndex}
                    className={`flex items-center gap-4 px-4 py-3 border-b border-border/20 last:border-b-0 transition-colors cursor-pointer ${
                      activeIndex === flatIndex
                        ? "bg-neon-pink/15 border-l-4 border-l-neon-pink"
                        : "hover:bg-muted"
                    }`}
                  >
                    {/* Thumbnail placeholder */}
                    <div className="shrink-0 w-12 h-12 bg-card border-2 border-border flex items-center justify-center">
                      <span className="text-neon-pink/30 font-display text-xs" aria-hidden="true">
                        {"\u5546\u54C1"}
                      </span>
                    </div>
                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-off-white font-mono truncate leading-tight">
                        <HighlightText text={product.name} query={trimmed} />
                      </p>
                      <p className="text-[10px] text-neon-pink uppercase tracking-widest mt-0.5">
                        {product.franchise}
                      </p>
                    </div>
                    {/* Price */}
                    <div className="shrink-0 text-right">
                      <span className="text-sm font-bold text-neon-pink font-mono">
                        <span className="text-cyber-yellow mr-0.5">{"\u20AC"}</span>
                        {product.price}
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          )}

          {/* Categories */}
          {matchedCategories.length > 0 && (
            <div>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted border-y-2 border-border">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyber-yellow font-mono">
                  CATEGORIES
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  ({matchedCategories.length})
                </span>
              </div>
              {matchedCategories.map((cat, i) => {
                const flatIndex = matchedProducts.length + i
                return (
                  <a
                    key={cat.id}
                    href={`#category-${cat.id}`}
                    id={`search-item-${flatIndex}`}
                    data-index={flatIndex}
                    role="option"
                    aria-selected={activeIndex === flatIndex}
                    className={`flex items-center justify-between px-4 py-3 border-b border-border/20 last:border-b-0 transition-colors cursor-pointer ${
                      activeIndex === flatIndex
                        ? "bg-neon-pink/15 border-l-4 border-l-neon-pink"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyber-yellow" aria-hidden="true" />
                      <span className="text-sm text-off-white font-mono">
                        <HighlightText text={cat.name} query={trimmed} />
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {cat.count} produits
                      </span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </a>
                )
              })}
            </div>
          )}

          {/* Franchises */}
          {matchedFranchises.length > 0 && (
            <div>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted border-y-2 border-border">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyber-yellow font-mono">
                  FRANCHISES
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  ({matchedFranchises.length})
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4">
                {matchedFranchises.map((franchise, i) => {
                  const flatIndex = matchedProducts.length + matchedCategories.length + i
                  return (
                    <a
                      key={franchise.id}
                      href={`#franchise-${franchise.id}`}
                      id={`search-item-${flatIndex}`}
                      data-index={flatIndex}
                      role="option"
                      aria-selected={activeIndex === flatIndex}
                      className={`flex flex-col items-center justify-center py-4 px-3 border border-border/20 transition-colors cursor-pointer ${
                        activeIndex === flatIndex
                          ? "bg-neon-pink/15"
                          : "hover:bg-muted"
                      }`}
                    >
                      {/* Japanese name as decorative text */}
                      <span className="text-lg font-display text-off-white/10 mb-1 select-none" aria-hidden="true">
                        {franchise.jp}
                      </span>
                      <span className="text-xs font-bold text-off-white font-mono uppercase tracking-wider text-center">
                        <HighlightText text={franchise.name} query={trimmed} />
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          {/* View all results footer */}
          {hasResults && (
            <a
              href={`#search?q=${encodeURIComponent(query)}`}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-muted border-t-2 border-border text-xs font-bold uppercase tracking-widest text-neon-pink hover:bg-neon-pink hover:text-primary-foreground transition-colors font-mono"
            >
              VOIR TOUS LES RESULTATS
              <ArrowRight className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}
