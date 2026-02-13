"use client"

import React from "react"

import { SectionWrapper, JapaneseAccent } from "@/components/section-wrapper"
import { ProductCard } from "@/components/product-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const sampleProducts = [
  { name: "Figurine Gojo Satoru Domaine Infini", price: "89,99", franchise: "Jujutsu Kaisen", badge: "NOUVEAU", badgeColor: "pink" as const, image: "/products/figurine-gojo.jpg" },
  { name: "Booster Box One Piece OP-09", price: "124,99", franchise: "One Piece Card Game", badge: "NOUVEAU", badgeColor: "pink" as const, image: "/products/booster-onepiece.jpg" },
  { name: "Nendoroid Tanjiro Kamado", price: "54,99", franchise: "Demon Slayer", image: "/products/figurine-tanjiro.jpg" },
  { name: "Figurine Luffy Gear 5 S.H.Figuarts", price: "149,99", franchise: "One Piece", badge: "NOUVEAU", badgeColor: "pink" as const, image: "/products/figurine-luffy.jpg" },
  { name: "Booster Pack Pokemon Ecarlate et Violet", price: "5,99", franchise: "Pokemon", image: "/products/booster-pokemon.jpg" },
  { name: "Statuette Naruto Uzumaki Baryon Mode", price: "199,99", franchise: "Naruto", badge: "EDITION LIMITEE", badgeColor: "yellow" as const, image: "/products/figurine-naruto.jpg" },
  { name: "Deck de Demarrage Yu-Gi-Oh! 2025", price: "12,99", franchise: "Yu-Gi-Oh!", image: "/products/card-yugioh.jpg" },
  { name: "Figurine Deku Full Cowling Pop Up Parade", price: "39,99", franchise: "My Hero Academia", badge: "NOUVEAU", badgeColor: "pink" as const, image: "/products/figurine-deku.jpg" },
  { name: "Carte Ultra Rare Charizard VMAX", price: "29,99", franchise: "Pokemon", badge: "ULTRA RARE", badgeColor: "yellow" as const, image: "/products/card-pokemon-rare.jpg" },
  { name: "Figurine Zoro Enma Tsume Art", price: "349,99", franchise: "One Piece", badge: "NOUVEAU", badgeColor: "pink" as const, image: "/products/figurine-zoro.jpg" },
]

export function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      })
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
    scrollRef.current.style.cursor = "grabbing"
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab"
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const updateArrowVisibility = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 10)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    scrollElement.addEventListener("scroll", updateArrowVisibility)
    updateArrowVisibility()

    return () => {
      scrollElement.removeEventListener("scroll", updateArrowVisibility)
    }
  }, [])

  return (
    <SectionWrapper
      title="NOUVEAUTES"
      subtitle="Les dernieres arrivees dans votre boutique"
      accent="pink"
      id="nouveautes"
    >
      {/* Japanese accent - "新着" (New Arrivals) */}
      <JapaneseAccent 
        text="新着" 
        className="-top-8 lg:-top-12 right-0 lg:right-12 text-7xl md:text-9xl lg:text-[12rem] xl:text-[16rem] opacity-[0.08]" 
      />

      <div className="relative">
        {/* Stylized arrow buttons - Neubrutalism style */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-20 bg-deep-black border-4 border-border p-3 lg:p-4 text-off-white hover:bg-neon-pink hover:text-primary-foreground hover:border-neon-pink hover:shadow-[8px_8px_0px_0px_rgba(255,0,255,1)] transition-all duration-200 hidden md:flex items-center justify-center group"
            aria-label="Defiler vers la gauche"
          >
            <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 group-hover:animate-pulse" strokeWidth={3} />
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-20 bg-deep-black border-4 border-border p-3 lg:p-4 text-off-white hover:bg-neon-pink hover:text-primary-foreground hover:border-neon-pink hover:shadow-[-8px_8px_0px_0px_rgba(255,0,255,1)] transition-all duration-200 hidden md:flex items-center justify-center group"
            aria-label="Defiler vers la droite"
          >
            <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 group-hover:animate-pulse" strokeWidth={3} />
          </button>
        )}

        {/* Scrollable container with drag support */}
        <div
          ref={scrollRef}
          className="flex gap-5 lg:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory cursor-grab select-none"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch"
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          {sampleProducts.map((product, index) => (
            <div 
              key={`${product.name}-${index}`} 
              className="snap-start shrink-0 w-[280px] lg:w-[300px] first:ml-0 last:mr-0"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Subtle gradient fade edges */}
        <div className="absolute top-0 left-0 bottom-6 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none hidden md:block" />
        <div className="absolute top-0 right-0 bottom-6 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none hidden md:block" />
      </div>

      {/* Optional scroll hint for mobile */}
      <p className="text-center mt-4 text-xs text-muted-foreground uppercase tracking-wider md:hidden">
        ← Faites glisser pour voir plus →
      </p>
    </SectionWrapper>
  )
}
