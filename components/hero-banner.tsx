"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Slide {
  id: number
  image: string
  tag: string
  title: string[]
  titleAccent: "pink" | "yellow"
  description: string
  ctaLabel: string
  ctaHref: string
  onomatopoeia: string
  onomatopoeiaPosition: "top-right" | "bottom-left" | "top-left"
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/hero-slide-1.jpg",
    tag: "NOUVELLE COLLECTION",
    title: ["FIGURINES", "EXCLUSIVES"],
    titleAccent: "pink",
    description:
      "Decouvrez nos figurines et statuettes en edition limitee. Qualite premium, details exceptionnels.",
    ctaLabel: "DECOUVRIR",
    ctaHref: "/catalogue?sort=nouveautes",
    onomatopoeia: "\u30B4\u30B4\u30B4\u30B4",
    onomatopoeiaPosition: "top-right",
  },
  {
    id: 2,
    image: "/hero-slide-2.jpg",
    tag: "CARTES RARES",
    title: ["PACKS &", "BOOSTERS"],
    titleAccent: "yellow",
    description:
      "Boosters, decks et cartes a l'unite. Pokemon, Yu-Gi-Oh!, One Piece et plus encore.",
    ctaLabel: "VOIR LES CARTES",
    ctaHref: "#cartes",
    onomatopoeia: "\u30C9\u30C9\u30C9\u30C9",
    onomatopoeiaPosition: "bottom-left",
  },
  {
    id: 3,
    image: "/hero-slide-3.jpg",
    tag: "PRECOMMANDE",
    title: ["STATUETTES", "PREMIUM"],
    titleAccent: "pink",
    description:
      "Reservez les pieces les plus convoitees. Editions limitees des meilleurs fabricants japonais.",
    ctaLabel: "PRE-COMMANDER",
    ctaHref: "#precommandes",
    onomatopoeia: "\u30D0\u30D0\u30D0\u30D0",
    onomatopoeiaPosition: "top-left",
  },
]

/* Animated speed lines that streak across on transition */
function TransitionSpeedLines({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-20 pointer-events-none overflow-hidden transition-opacity duration-300",
        active ? "opacity-100" : "opacity-0"
      )}
      aria-hidden="true"
    >
      {[...Array(12)].map((_, i) => (
        <div
          key={`tsl-${i}`}
          className="absolute"
          style={{
            top: `${5 + i * 8}%`,
            left: 0,
            right: 0,
            height: i % 3 === 0 ? "3px" : "1px",
            background: `linear-gradient(90deg, transparent 0%, ${i % 2 === 0 ? "#FF00FF" : "#F7EF00"}${i % 3 === 0 ? "cc" : "66"} 30%, ${i % 2 === 0 ? "#FF00FF" : "#F7EF00"}${i % 3 === 0 ? "ee" : "88"} 50%, transparent 100%)`,
            transform: `rotate(${-1.5 + i * 0.3}deg) translateX(${active ? "0%" : "-120%"})`,
            transition: `transform ${0.4 + i * 0.05}s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.02}s`,
          }}
        />
      ))}
    </div>
  )
}

/* Floating onomatopoeia that drifts subtly */
function FloatingOnomatopoeia({
  text,
  position,
  isActive,
}: {
  text: string
  position: "top-right" | "bottom-left" | "top-left"
  isActive: boolean
}) {
  const positionClasses = {
    "top-right": "top-6 right-4 lg:top-12 lg:right-12",
    "bottom-left": "bottom-20 left-4 lg:bottom-24 lg:left-12",
    "top-left": "top-6 left-4 lg:top-12 lg:left-12",
  }

  return (
    <div
      className={cn(
        "absolute z-10 select-none pointer-events-none transition-all duration-700",
        positionClasses[position],
        isActive
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-75"
      )}
      aria-hidden="true"
    >
      <span
        className="font-display text-[60px] md:text-[100px] lg:text-[160px] leading-none text-[#FF00FF] block"
        style={{
          textShadow:
            "0 0 30px rgba(255, 0, 255, 0.4), 0 0 60px rgba(255, 0, 255, 0.2)",
          opacity: 0.15,
          writingMode: position === "top-right" || position === "top-left" ? "vertical-rl" : undefined,
        }}
      >
        {text}
      </span>
    </div>
  )
}

/* Ambient speed lines that remain in background */
function AmbientSpeedLines() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={`ambient-${i}`}
          className="absolute h-px"
          style={{
            top: `${12 + i * 14}%`,
            left: "-20%",
            right: "-20%",
            transform: `rotate(${-2 + i * 0.7}deg)`,
            background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? "#FF00FF" : "#F7EF00"}18, ${i % 2 === 0 ? "#FF00FF" : "#F7EF00"}10, transparent)`,
          }}
        />
      ))}
    </div>
  )
}

/* Slide indicator dots */
function SlideIndicators({
  total,
  current,
  onSelect,
}: {
  total: number
  current: number
  onSelect: (index: number) => void
}) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={`indicator-${i}`}
          onClick={() => onSelect(i)}
          className={cn(
            "transition-all duration-300 border-2 border-border",
            i === current
              ? "w-10 h-3 bg-[#FF00FF] neon-pink-glow"
              : "w-3 h-3 bg-[#333333] hover:bg-[#F7EF00]"
          )}
          aria-label={`Aller au slide ${i + 1}`}
          aria-current={i === current ? "true" : undefined}
        />
      ))}
    </div>
  )
}

/* Progress bar showing auto-advance timer */
function SlideProgress({ progress }: { progress: number }) {
  return (
    <div className="w-full h-1 bg-[#222222]" aria-hidden="true">
      <div
        className="h-full bg-[#FF00FF] transition-[width] duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const SLIDE_DURATION = 6000 // 6 seconds per slide
  const TRANSITION_DURATION = 600

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setProgress(0)
      setTimeout(() => {
        setCurrentSlide(index)
        setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION)
      }, 300)
    },
    [isTransitioning]
  )

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }, [currentSlide, goToSlide])

  // Auto-advance
  useEffect(() => {
    if (isPaused) return
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(nextSlide, SLIDE_DURATION)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [nextSlide, isPaused])

  // Progress bar
  useEffect(() => {
    if (isPaused) return
    setProgress(0)
    if (progressRef.current) clearInterval(progressRef.current)
    const tick = 50
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (tick / SLIDE_DURATION) * 100
        return next >= 100 ? 100 : next
      })
    }, tick)
    return () => {
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [currentSlide, isPaused])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "ArrowRight") nextSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  const slide = slides[currentSlide]

  return (
    <section
      className="relative w-full min-h-[85vh] lg:min-h-screen bg-[#111111] flex flex-col overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Produits vedettes"
    >
      {/* Asanoha background texture */}
      <div className="absolute inset-0 asanoha-bg" aria-hidden="true" />

      {/* Ambient speed lines */}
      <AmbientSpeedLines />

      {/* Transition speed lines */}
      <TransitionSpeedLines active={isTransitioning} />

      {/* Floating onomatopoeia */}
      {slides.map((s, i) => (
        <FloatingOnomatopoeia
          key={s.id}
          text={s.onomatopoeia}
          position={s.onomatopoeiaPosition}
          isActive={i === currentSlide && !isTransitioning}
        />
      ))}

      {/* Main content area */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text content - left side */}
            <div className="lg:col-span-6 xl:col-span-5 order-2 lg:order-1">
              {/* Tag badge */}
              <div
                className={cn(
                  "mb-5 inline-block px-4 py-2 border-4 border-border transition-all duration-500",
                  isTransitioning
                    ? "opacity-0 -translate-x-4"
                    : "opacity-100 translate-x-0",
                  slide.titleAccent === "yellow"
                    ? "bg-[#F7EF00]"
                    : "bg-[#FF00FF]"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-bold uppercase tracking-[0.2em]",
                    "text-[#000000]"
                  )}
                >
                  {slide.tag}
                </span>
              </div>

              {/* Title */}
              <h1
                className={cn(
                  "font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl uppercase tracking-wider leading-[0.95] mb-6 transition-all duration-500 delay-100",
                  isTransitioning
                    ? "opacity-0 -translate-x-6"
                    : "opacity-100 translate-x-0"
                )}
              >
                {slide.title.map((line, i) => (
                  <span
                    key={`${slide.id}-line-${i}`}
                    className={cn(
                      "block",
                      i === 1 &&
                        slide.titleAccent === "pink" &&
                        "text-[#FF00FF] text-glow-pink",
                      i === 1 &&
                        slide.titleAccent === "yellow" &&
                        "text-[#F7EF00] text-glow-yellow",
                      i === 0 && "text-[#F0F0F0]"
                    )}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              {/* Description */}
              <p
                className={cn(
                  "text-sm lg:text-base text-[#999999] max-w-lg mb-8 leading-relaxed transition-all duration-500 delay-200",
                  isTransitioning
                    ? "opacity-0 -translate-x-4"
                    : "opacity-100 translate-x-0"
                )}
              >
                {slide.description}
              </p>

              {/* CTA Button */}
              <div
                className={cn(
                  "transition-all duration-500 delay-300",
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                )}
              >
                {slide.ctaHref.startsWith("/") ? (
                  <Link
                    href={slide.ctaHref}
                    className="group/cta inline-block relative bg-[#F7EF00] text-[#000000] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] border-4 border-border transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(247,239,0,0.4),0_0_60px_rgba(247,239,0,0.15)]"
                  >
                    <span className="relative z-10">{slide.ctaLabel}</span>
                  </Link>
                ) : (
                  <a
                    href={slide.ctaHref}
                    className="group/cta inline-block relative bg-[#F7EF00] text-[#000000] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] border-4 border-border transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(247,239,0,0.4),0_0_60px_rgba(247,239,0,0.15)]"
                  >
                    <span className="relative z-10">{slide.ctaLabel}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Product image - right side */}
            <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center order-1 lg:order-2">
              <div
                className={cn(
                  "relative w-full max-w-sm md:max-w-md lg:max-w-lg transition-all duration-500",
                  isTransitioning
                    ? "opacity-0 scale-90 translate-x-8"
                    : "opacity-100 scale-100 translate-x-0"
                )}
              >
                {/* Image container with thick border */}
                <div className="relative aspect-[3/4] border-8 border-border bg-[#1a1a1a] overflow-hidden">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title.join(" ")}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
                  />

                  {/* Subtle overlay gradient for depth */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>

                {/* Decorative corner accents */}
                <div
                  className="absolute -top-3 -left-3 w-6 h-6 bg-[#FF00FF] border-2 border-border"
                  aria-hidden="true"
                />
                <div
                  className="absolute -top-3 -right-3 w-6 h-6 bg-[#F7EF00] border-2 border-border"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-3 -left-3 w-6 h-6 bg-[#F7EF00] border-2 border-border"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#FF00FF] border-2 border-border"
                  aria-hidden="true"
                />

                {/* Slide number label */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#111111] border-2 border-border px-4 py-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0F0F0]">
                    {String(currentSlide + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom controls bar */}
      <div className="relative z-10">
        {/* Progress bar */}
        <SlideProgress progress={progress} />

        {/* Navigation controls */}
        <div className="bg-[#111111] border-t-2 border-[#222222] px-4 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Slide indicators */}
            <SlideIndicators
              total={slides.length}
              current={currentSlide}
              onSelect={goToSlide}
            />

            {/* Prev / Next arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="group/nav w-10 h-10 flex items-center justify-center border-2 border-border bg-[#1a1a1a] text-[#F0F0F0] hover:bg-[#FF00FF] hover:text-[#000000] transition-all disabled:opacity-50"
                aria-label="Slide precedent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="group/nav w-10 h-10 flex items-center justify-center border-2 border-border bg-[#1a1a1a] text-[#F0F0F0] hover:bg-[#FF00FF] hover:text-[#000000] transition-all disabled:opacity-50"
                aria-label="Slide suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-[#FF00FF]" aria-hidden="true" />
    </section>
  )
}
