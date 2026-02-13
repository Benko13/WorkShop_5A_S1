"use client"

import React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  franchises,
  categories,
  productTypes,
  manufacturers,
  rarities,
  scales,
  availabilities,
} from "@/lib/product-data"

export interface FilterState {
  priceRange: [number, number]
  franchises: string[]
  categories: string[]
  types: string[]
  manufacturers: string[]
  rarities: string[]
  scales: string[]
  availabilities: string[]
}

interface ProductFilterSidebarProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  resultCount: number
  mobileOpen: boolean
  onMobileClose: () => void
}

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b-2 border-border/30 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-1 text-xs font-bold uppercase tracking-widest text-off-white hover:text-neon-pink transition-colors"
      >
        {title}
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {open && <div className="pb-4 px-1 last:pb-6">{children}</div>}
    </div>
  )
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-1">
      {options.map((option) => (
        <button
          type="button"
          key={option}
          onClick={() => toggleOption(option)}
          className="flex items-center gap-3 cursor-pointer group text-left"
        >
          <div
            className={cn(
              "w-4 h-4 border-2 border-border flex items-center justify-center transition-all shrink-0",
              selected.includes(option)
                ? "bg-neon-pink border-neon-pink"
                : "bg-transparent group-hover:border-neon-pink/50"
            )}
          >
            {selected.includes(option) && (
              <svg
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                className="text-primary-foreground"
              >
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            )}
          </div>
          <span className="text-xs text-muted-foreground group-hover:text-off-white transition-colors leading-tight">
            {option}
          </span>
        </button>
      ))}
    </div>
  )
}

function PriceRangeSlider({
  range,
  onChange,
}: {
  range: [number, number]
  onChange: (range: [number, number]) => void
}) {
  const min = 0
  const max = 400
  const [localMin, setLocalMin] = useState(range[0])
  const [localMax, setLocalMax] = useState(range[1])

  const handleMinChange = (val: number) => {
    const clamped = Math.min(val, localMax - 5)
    setLocalMin(clamped)
    onChange([clamped, localMax])
  }

  const handleMaxChange = (val: number) => {
    const clamped = Math.max(val, localMin + 5)
    setLocalMax(clamped)
    onChange([localMin, clamped])
  }

  const minPercent = ((localMin - min) / (max - min)) * 100
  const maxPercent = ((localMax - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="border-2 border-border bg-input px-3 py-1.5 flex items-center gap-1">
          <span className="text-cyber-yellow text-xs font-bold">{"€"}</span>
          <input
            type="number"
            value={localMin}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="w-14 bg-transparent text-off-white text-xs font-mono outline-none"
            min={min}
            max={max}
          />
        </div>
        <div className="h-px flex-1 bg-border/50" />
        <div className="border-2 border-border bg-input px-3 py-1.5 flex items-center gap-1">
          <span className="text-cyber-yellow text-xs font-bold">{"€"}</span>
          <input
            type="number"
            value={localMax}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="w-14 bg-transparent text-off-white text-xs font-mono outline-none"
            min={min}
            max={max}
          />
        </div>
      </div>
      {/* Dual range slider */}
      <div className="relative h-6 flex items-center">
        {/* Track background */}
        <div className="absolute inset-x-0 h-1.5 bg-muted" />
        {/* Active track */}
        <div
          className="absolute h-1.5 bg-neon-pink"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={localMin}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-neon-pink [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-border [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-neon-pink [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-border [&::-moz-range-thumb]:cursor-pointer"
          style={{ zIndex: localMin > max - 10 ? 5 : 3 }}
        />
        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={localMax}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyber-yellow [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-border [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-cyber-yellow [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-border [&::-moz-range-thumb]:cursor-pointer"
          style={{ zIndex: 4 }}
        />
      </div>
    </div>
  )
}

export function ProductFilterSidebar({
  filters,
  onFilterChange,
  resultCount,
  mobileOpen,
  onMobileClose,
}: ProductFilterSidebarProps) {
  const activeFilterCount =
    filters.franchises.length +
    filters.categories.length +
    filters.types.length +
    filters.manufacturers.length +
    filters.rarities.length +
    filters.scales.length +
    filters.availabilities.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 400 ? 1 : 0)

  const clearAllFilters = () => {
    onFilterChange({
      priceRange: [0, 400],
      franchises: [],
      categories: [],
      types: [],
      manufacturers: [],
      rarities: [],
      scales: [],
      availabilities: [],
    })
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b-4 border-border bg-card">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-neon-pink" />
          <span className="font-display text-base tracking-wider text-off-white">
            FILTRES
          </span>
          {activeFilterCount > 0 && (
            <span className="bg-neon-pink text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center border-2 border-border">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-[10px] font-bold uppercase tracking-wider text-neon-pink hover:text-cyber-yellow transition-colors"
            >
              EFFACER
            </button>
          )}
          {/* Mobile close */}
          <button
            type="button"
            onClick={onMobileClose}
            className="lg:hidden p-1 text-off-white hover:text-neon-pink transition-colors"
            aria-label="Fermer les filtres"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="px-5 py-3 border-b-2 border-border/30 bg-muted/50">
        <span className="text-xs text-muted-foreground">
          <span className="text-neon-pink font-bold">{resultCount}</span>{" "}
          {"produit"}
          {resultCount !== 1 ? "s" : ""}{" "}
          {"trouve"}
          {resultCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Filter sections */}
      <div className="flex-1 overflow-y-auto px-5 pb-12 min-h-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:bg-neon-pink [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-border [&::-webkit-scrollbar-thumb]:hover:bg-[#FF00FF]">
        {/* Photo 1: PRIX, DISPONIBILITE, CATEGORIE */}
        <FilterSection title="PRIX" defaultOpen>
          <PriceRangeSlider
            range={filters.priceRange}
            onChange={(priceRange) =>
              onFilterChange({ ...filters, priceRange })
            }
          />
        </FilterSection>

        <FilterSection title="DISPONIBILITE" defaultOpen>
          <CheckboxGroup
            options={availabilities}
            selected={filters.availabilities}
            onChange={(availabilities) =>
              onFilterChange({ ...filters, availabilities })
            }
          />
        </FilterSection>

        <FilterSection title="CATEGORIE" defaultOpen>
          <CheckboxGroup
            options={categories}
            selected={filters.categories}
            onChange={(categories) =>
              onFilterChange({ ...filters, categories })
            }
          />
        </FilterSection>

        <FilterSection title="FRANCHISE / SERIE" defaultOpen>
          <CheckboxGroup
            options={franchises}
            selected={filters.franchises}
            onChange={(franchises) =>
              onFilterChange({ ...filters, franchises })
            }
          />
        </FilterSection>

        {/* Photo 2: TYPE DE PRODUIT, FABRICANT */}
        <FilterSection title="TYPE DE PRODUIT" defaultOpen={false}>
          <CheckboxGroup
            options={productTypes}
            selected={filters.types}
            onChange={(types) => onFilterChange({ ...filters, types })}
          />
        </FilterSection>

        <FilterSection title="FABRICANT" defaultOpen={false}>
          <CheckboxGroup
            options={manufacturers}
            selected={filters.manufacturers}
            onChange={(manufacturers) =>
              onFilterChange({ ...filters, manufacturers })
            }
          />
        </FilterSection>

        {/* Photo 3: RARETE, ECHELLE */}
        <FilterSection title="RARETE" defaultOpen={false}>
          <CheckboxGroup
            options={rarities}
            selected={filters.rarities}
            onChange={(rarities) =>
              onFilterChange({ ...filters, rarities })
            }
          />
        </FilterSection>

        <FilterSection title="ECHELLE" defaultOpen={false}>
          <CheckboxGroup
            options={scales}
            selected={filters.scales}
            onChange={(scales) => onFilterChange({ ...filters, scales })}
          />
        </FilterSection>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 xl:w-80 shrink-0 border-4 border-border bg-background sticky top-24 self-start h-[calc(100vh-7rem)] overflow-hidden flex flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 z-40 lg:hidden"
            onClick={onMobileClose}
            onKeyDown={(e) => e.key === "Escape" && onMobileClose()}
            role="button"
            tabIndex={0}
            aria-label="Fermer les filtres"
          />
          <aside className="fixed inset-y-0 left-0 w-80 max-w-[85vw] z-50 bg-background border-r-4 border-border lg:hidden overflow-hidden flex flex-col">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  )
}
