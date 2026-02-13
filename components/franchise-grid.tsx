"use client"

import React from "react"

import Image from "next/image"
import Link from "next/link"
import { SectionWrapper } from "@/components/section-wrapper"

// Mapping des noms de franchises en majuscules vers les noms avec casse normale
const franchiseMapping: Record<string, string> = {
  "DEMON SLAYER": "Demon Slayer",
  "JUJUTSU KAISEN": "Jujutsu Kaisen",
  "NARUTO": "Naruto",
  "ONE PIECE": "One Piece",
  "DRAGON BALL": "Dragon Ball",
  "MY HERO ACADEMIA": "My Hero Academia",
  "ATTACK ON TITAN": "Attack on Titan",
  "POKEMON": "Pokemon",
}

const franchises = [
  {
    name: "DRAGON BALL",
    jp: "\u30C9\u30E9\u30B4\u30F3\u30DC\u30FC\u30EB",
    accent: "#FF00FF",
    image: "/franchises/dragon-ball.jpg",
    gridArea: "db",
  },
  {
    name: "ONE PIECE",
    jp: "\u30EF\u30F3\u30D4\u30FC\u30B9",
    accent: "#F7EF00",
    image: "/franchises/one-piece.jpg",
    gridArea: "op",
  },
  {
    name: "DEMON SLAYER",
    jp: "\u9B3C\u6EC5\u306E\u5203",
    accent: "#FF00FF",
    image: "/franchises/demon-slayer.jpg",
    gridArea: "ds",
  },
  {
    name: "JUJUTSU KAISEN",
    jp: "\u546A\u8853\u5EFB\u6226",
    accent: "#F7EF00",
    image: "/franchises/jujutsu-kaisen.jpg",
    gridArea: "jk",
  },
  {
    name: "NARUTO",
    jp: "\u30CA\u30EB\u30C8",
    accent: "#FF00FF",
    image: "/franchises/naruto.jpg",
    gridArea: "nr",
  },
  {
    name: "MY HERO ACADEMIA",
    jp: "\u50D5\u306E\u30D2\u30FC\u30ED\u30FC",
    accent: "#F7EF00",
    image: "/franchises/my-hero-academia.jpg",
    gridArea: "mh",
  },
  {
    name: "ATTACK ON TITAN",
    jp: "\u9032\u6483\u306E\u5DE8\u4EBA",
    accent: "#FF00FF",
    image: "/franchises/attack-on-titan.jpg",
    gridArea: "at",
  },
  {
    name: "POKEMON",
    jp: "\u30DD\u30B1\u30E2\u30F3",
    accent: "#F7EF00",
    image: "/franchises/pokemon.jpg",
    gridArea: "pk",
  },
]

function FranchisePanel({
  franchise,
}: {
  franchise: (typeof franchises)[number]
}) {
  const glowColor =
    franchise.accent === "#FF00FF"
      ? "0 0 24px rgba(255,0,255,0.5), 0 0 48px rgba(255,0,255,0.2)"
      : "0 0 24px rgba(247,239,0,0.5), 0 0 48px rgba(247,239,0,0.2)"

  // Convertir le nom de franchise en majuscules vers le nom avec casse normale pour l'URL
  const franchiseNameForUrl = franchiseMapping[franchise.name] || franchise.name
  const franchiseSlug = encodeURIComponent(franchiseNameForUrl)
  const catalogueUrl = `/catalogue?franchise=${franchiseSlug}`

  return (
    <Link
      href={catalogueUrl}
      className="franchise-panel relative block overflow-hidden border-4 border-border bg-card group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-pink"
      style={
        {
          gridArea: franchise.gridArea,
          "--panel-accent": franchise.accent,
          "--panel-glow": glowColor,
        } as React.CSSProperties
      }
      aria-label={`Voir la collection ${franchise.name}`}
    >
      {/* Key art image */}
      <Image
        src={franchise.image || "/placeholder.svg"}
        alt={`${franchise.name} key art`}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      {/* Default dark gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-0 pointer-events-none" />

      {/* Hover overlay with CTA */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center pointer-events-none">
        <span
          className="inline-block px-5 py-2.5 border-3 border-current text-xs md:text-sm font-bold uppercase tracking-widest transition-transform duration-300 group-hover:scale-100 scale-90"
          style={{ color: franchise.accent, borderColor: franchise.accent }}
        >
          {"VOIR LA S\u00C9LECTION"}
        </span>
      </div>

      {/* Background Japanese watermark */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-5xl md:text-7xl lg:text-8xl text-white/[0.06] select-none pointer-events-none whitespace-nowrap leading-none"
        aria-hidden="true"
      >
        {franchise.jp}
      </span>

      {/* Franchise name label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 lg:p-5 z-10 pointer-events-none">
        <h3
          className="font-display text-sm md:text-base lg:text-xl uppercase tracking-wider leading-tight drop-shadow-lg transition-transform duration-300 group-hover:translate-y-[-4px]"
          style={{ color: franchise.accent }}
        >
          {franchise.name}
        </h3>
        <p className="text-[10px] md:text-xs text-off-white/60 uppercase tracking-widest mt-1 transition-opacity duration-300 group-hover:opacity-0">
          {franchise.jp}
        </p>
      </div>

      {/* Decorative corner squares */}
      <div
        className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
        style={{ backgroundColor: franchise.accent }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
        style={{ backgroundColor: franchise.accent }}
        aria-hidden="true"
      />
    </Link>
  )
}

export function FranchiseGrid() {
  return (
    <SectionWrapper
      title="FRANCHISES VEDETTES"
      subtitle="Explorez vos univers preferes"
      accent="yellow"
      id="franchises"
    >
      {/* Manga panel asymmetric grid - desktop */}
      {/*
        Layout (4 cols x 3 rows):
        ┌────────┬────────┬────────┐
        │   DB   │   OP   │   DS   │
        │  2x2   ├────────┼────────┤
        │        │   JK   │   NR   │
        ├────┬───┴────┬───┴────────┤
        │ MH │   AT   │     PK     │
        └────┴────────┴────────────┘
      */}
      <div className="franchise-grid">
        {franchises.map((franchise) => (
          <FranchisePanel key={franchise.name} franchise={franchise} />
        ))}
      </div>

      <style jsx>{`
        .franchise-grid {
          display: grid;
          gap: 3px;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: minmax(140px, 1fr);
          grid-template-areas:
            "db op"
            "ds jk"
            "nr mh"
            "at pk";
        }

        @media (min-width: 768px) {
          .franchise-grid {
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-rows: 180px 180px 160px;
            gap: 4px;
            grid-template-areas:
              "db op ds"
              "db jk nr"
              "mh at pk";
          }
        }

        @media (min-width: 1024px) {
          .franchise-grid {
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-rows: 220px 220px 190px;
            gap: 5px;
          }
        }

        @media (min-width: 1280px) {
          .franchise-grid {
            grid-template-rows: 260px 260px 210px;
          }
        }
      `}</style>

      <style jsx global>{`
        .franchise-panel {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .franchise-panel:hover {
          border-color: var(--panel-accent);
          box-shadow: var(--panel-glow);
        }
      `}</style>
    </SectionWrapper>
  )
}
