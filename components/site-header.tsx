"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from "lucide-react"
import { SearchAutocomplete } from "@/components/search-autocomplete"
import { useCart } from "@/lib/cart-context"

// Helper function to build catalogue URL with filters
const buildCatalogueUrl = (params: { category?: string; franchise?: string }) => {
  const searchParams = new URLSearchParams()
  if (params.category) {
    searchParams.set("category", params.category)
  }
  if (params.franchise) {
    searchParams.set("franchise", params.franchise)
  }
  return `/catalogue${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
}

const navItems = [
  {
    label: "PACKS & BOOSTERS",
    href: buildCatalogueUrl({ category: "Booster" }),
    subItems: [
      { label: "Yu-Gi-Oh!", href: buildCatalogueUrl({ category: "Booster", franchise: "Yu-Gi-Oh!" }) },
      { label: "Pokemon", href: buildCatalogueUrl({ category: "Booster", franchise: "Pokemon" }) },
      { label: "Magic: The Gathering", href: buildCatalogueUrl({ category: "Booster", franchise: "Magic: The Gathering" }) },
      { label: "Dragon Ball Super Card Game", href: buildCatalogueUrl({ category: "Booster", franchise: "Dragon Ball" }) },
      { label: "One Piece Card Game", href: buildCatalogueUrl({ category: "Booster", franchise: "One Piece" }) },
    ],
  },
  {
    label: "FIGURINES & STATUETTES",
    href: buildCatalogueUrl({ category: "Figurines" }),
    subItems: [
      { label: "Naruto", href: buildCatalogueUrl({ category: "Figurines", franchise: "Naruto" }) },
      { label: "My Hero Academia", href: buildCatalogueUrl({ category: "Figurines", franchise: "My Hero Academia" }) },
      { label: "Jujutsu Kaisen", href: buildCatalogueUrl({ category: "Figurines", franchise: "Jujutsu Kaisen" }) },
      { label: "Demon Slayer", href: buildCatalogueUrl({ category: "Figurines", franchise: "Demon Slayer" }) },
      { label: "Attack on Titan", href: buildCatalogueUrl({ category: "Figurines", franchise: "Attack on Titan" }) },
      { label: "Dragon Ball", href: buildCatalogueUrl({ category: "Figurines", franchise: "Dragon Ball" }) },
      { label: "One Piece", href: buildCatalogueUrl({ category: "Figurines", franchise: "One Piece" }) },
    ],
  },
  { label: "ACCESSOIRES", href: buildCatalogueUrl({ category: "Autres" }) },
  { label: "PRECOMMANDES", href: "#precommandes" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const { totalItems, setIsOpen: setCartOpen } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-border">
      <div className="flex items-center justify-between px-4 lg:px-8 h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display text-xl lg:text-2xl tracking-wider text-neon-pink">
            ARTS
          </span>
          <span className="font-display text-xl lg:text-2xl tracking-wider text-cyber-yellow">
            ET SHOP
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0" aria-label="Navigation principale">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.subItems && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-xs font-bold uppercase tracking-widest text-off-white hover:text-neon-pink transition-colors"
              >
                {item.label}
                {item.subItems && <ChevronDown className="w-3 h-3" />}
              </Link>

              {/* Dropdown */}
              {item.subItems && openDropdown === item.label && (
                <div className="absolute top-full left-0 bg-background border-4 border-border min-w-56 z-50">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block px-4 py-3 text-xs font-bold uppercase tracking-wider text-off-white hover:bg-neon-pink hover:text-primary-foreground transition-colors border-b border-border/30 last:border-b-0"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Utility Icons */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-off-white hover:text-neon-pink transition-colors"
            aria-label="Rechercher"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Account */}
          <Link
            href="/mon-compte"
            className="p-2 text-off-white hover:text-neon-pink transition-colors"
            aria-label="Mon compte"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-off-white hover:text-neon-pink transition-colors"
            aria-label={`Panier (${totalItems} article${totalItems !== 1 ? "s" : ""})`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span
              className={`absolute -top-1 -right-1 text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center border-2 border-border transition-transform ${
                totalItems > 0 ? "bg-neon-pink scale-100" : "bg-muted scale-90"
              }`}
            >
              {totalItems}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-off-white hover:text-neon-pink transition-colors"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Autocomplete */}
      {searchOpen && (
        <SearchAutocomplete onClose={() => setSearchOpen(false)} />
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav
          className="lg:hidden border-t-4 border-border bg-background max-h-[calc(100vh-64px)] overflow-y-auto"
          aria-label="Navigation mobile"
        >
          {navItems.map((item) => (
            <div key={item.label} className="border-b-2 border-border/30">
              <Link
                href={item.href}
                className="block px-6 py-4 text-sm font-bold uppercase tracking-widest text-off-white hover:bg-neon-pink hover:text-primary-foreground transition-colors"
              >
                {item.label}
              </Link>
              {item.subItems && (
                <div className="bg-muted">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block px-10 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-neon-pink transition-colors border-t border-border/10"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  )
}
