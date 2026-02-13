"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { RotateCcw, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/product-data"

interface ProductGalleryProps {
  product: Product
}

// Fonction pour générer les images de galerie à partir de l'image principale
function generateProductImages(product: Product) {
  const baseImage = product.image
  const baseName = baseImage.replace("/products/", "").replace(".jpg", "")
  
  // Pour Gojo, utiliser les images spécifiques existantes
  if (product.id === "fig-gojo-01" || product.id === "fig-gojo-02") {
    return [
      { src: "/products/gojo-figure-1.jpg", alt: `${product.name} - Vue de face` },
      { src: "/products/gojo-figure-2.jpg", alt: `${product.name} - Vue de profil` },
      { src: "/products/gojo-figure-3.jpg", alt: `${product.name} - Vue arrière` },
      { src: "/products/gojo-figure-4.jpg", alt: `${product.name} - Détail du visage` },
      { src: "/products/gojo-figure-5.jpg", alt: `${product.name} - Photo in-scale` },
    ]
  }
  
  // Pour les autres produits, utiliser l'image principale répétée (ou générer des variantes si disponibles)
  return [
    { src: baseImage, alt: `${product.name} - Vue principale` },
    { src: baseImage, alt: `${product.name} - Vue détaillée` },
    { src: baseImage, alt: `${product.name} - Vue alternative` },
  ]
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const productImages = generateProductImages(product)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [show360, setShow360] = useState(false)
  const [rotation, setRotation] = useState(0)
  const isDraggingRef = useRef(false)
  const lastXRef = useRef(0)
  const mainImageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZooming || !mainImageRef.current) return
      const rect = mainImageRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
    },
    [isZooming]
  )

  const handle360MouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true
    lastXRef.current = e.clientX
  }

  const handle360MouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    const delta = e.clientX - lastXRef.current
    setRotation((prev) => prev + delta * 0.5)
    lastXRef.current = e.clientX
  }

  const handle360MouseUp = () => {
    isDraggingRef.current = false
  }

  const handle360TouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true
    lastXRef.current = e.touches[0].clientX
  }

  const handle360TouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return
    const delta = e.touches[0].clientX - lastXRef.current
    setRotation((prev) => prev + delta * 0.5)
    lastXRef.current = e.touches[0].clientX
  }

  const handle360TouchEnd = () => {
    isDraggingRef.current = false
  }

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Area */}
      <div className="relative">
        {show360 ? (
          /* 360 View */
          <div
            className="relative aspect-square bg-card border-4 border-border cursor-grab active:cursor-grabbing select-none overflow-hidden"
            onMouseDown={handle360MouseDown}
            onMouseMove={handle360MouseMove}
            onMouseUp={handle360MouseUp}
            onMouseLeave={handle360MouseUp}
            onTouchStart={handle360TouchStart}
            onTouchMove={handle360TouchMove}
            onTouchEnd={handle360TouchEnd}
          >
            {/* Simulated 360 view by cycling through images based on rotation */}
            <div
              className="w-full h-full transition-none"
              style={{ transform: `perspective(800px) rotateY(${rotation}deg)` }}
            >
              <Image
                src={productImages[Math.abs(Math.floor(rotation / 72)) % productImages.length].src || "/placeholder.svg"}
                alt="Vue 360 degres"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            {/* 360 Overlay UI */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/90 border-2 border-border px-3 py-1.5">
                <RotateCcw className="w-4 h-4 text-neon-pink" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-off-white">
                  VUE 360
                </span>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 border-2 border-border px-4 py-2">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Glisser pour tourner
                </span>
              </div>
              {/* Rotation indicator */}
              <div className="absolute bottom-4 right-4 bg-background/90 border-2 border-border px-3 py-1.5">
                <span className="text-[10px] font-bold text-cyber-yellow font-mono">
                  {Math.round(((rotation % 360) + 360) % 360)}&#176;
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Regular Image with Zoom */
          <div
            ref={mainImageRef}
            className="relative aspect-square bg-card border-4 border-border overflow-hidden cursor-crosshair group"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={productImages[activeIndex].src || "/placeholder.svg"}
              alt={productImages[activeIndex].alt}
              fill
              className={cn(
                "object-contain p-4 transition-transform duration-100",
                isZooming && "scale-[2.5]"
              )}
              style={
                isZooming
                  ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                  : undefined
              }
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
            {/* Zoom indicator */}
            {!isZooming && (
              <div className="absolute bottom-4 right-4 bg-background/90 border-2 border-border px-3 py-1.5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <ZoomIn className="w-3 h-3 text-neon-pink" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Survoler pour zoomer
                </span>
              </div>
            )}
            {/* Navigation arrows - mobile */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrev()
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 lg:hidden bg-background/90 border-2 border-border p-2 text-off-white hover:text-neon-pink transition-colors"
              aria-label="Image precedente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 lg:hidden bg-background/90 border-2 border-border p-2 text-off-white hover:text-neon-pink transition-colors"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* 360 Toggle Button */}
        <button
          onClick={() => {
            setShow360(!show360)
            setRotation(0)
          }}
          className={cn(
            "absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-border transition-colors",
            show360
              ? "bg-cyber-yellow text-secondary-foreground"
              : "bg-neon-pink text-primary-foreground hover:bg-cyber-yellow hover:text-secondary-foreground"
          )}
        >
          <RotateCcw className="w-4 h-4" />
          {show360 ? "GALERIE" : "VUE 360\u00B0"}
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {productImages.map((img, i) => (
          <button
            key={img.src}
            onClick={() => {
              setActiveIndex(i)
              setShow360(false)
            }}
            className={cn(
              "relative shrink-0 w-16 h-16 lg:w-20 lg:h-20 border-4 transition-all overflow-hidden",
              activeIndex === i && !show360
                ? "border-neon-pink neon-pink-glow"
                : "border-border/50 hover:border-border"
            )}
            aria-label={`Voir ${img.alt}`}
          >
            <Image
              src={img.src || "/placeholder.svg"}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
        {/* 360 thumbnail */}
        <button
          onClick={() => {
            setShow360(true)
            setRotation(0)
          }}
          className={cn(
            "relative shrink-0 w-16 h-16 lg:w-20 lg:h-20 border-4 transition-all flex items-center justify-center bg-card",
            show360
              ? "border-neon-pink neon-pink-glow"
              : "border-border/50 hover:border-border"
          )}
          aria-label="Activer la vue 360 degres"
        >
          <RotateCcw className="w-5 h-5 text-neon-pink" />
          <span className="absolute bottom-0.5 text-[8px] font-bold text-off-white">360&#176;</span>
        </button>
      </div>
    </div>
  )
}
