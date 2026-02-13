import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
  accent?: "pink" | "yellow" | "none"
  withAsanoha?: boolean
  id?: string
}

export function SectionWrapper({
  children,
  className,
  title,
  subtitle,
  accent = "pink",
  withAsanoha = false,
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 lg:py-24 px-4 lg:px-8",
        withAsanoha && "asanoha-bg",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-12 lg:mb-16">
            {title && (
              <h2
                className={cn(
                  "font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider",
                  accent === "pink" && "text-neon-pink text-glow-pink",
                  accent === "yellow" && "text-cyber-yellow text-glow-yellow",
                  accent === "none" && "text-off-white"
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-sm text-muted-foreground uppercase tracking-widest">
                {subtitle}
              </p>
            )}
            {/* Decorative border line */}
            <div
              className={cn(
                "mt-4 h-1 w-24",
                accent === "pink" && "bg-neon-pink",
                accent === "yellow" && "bg-cyber-yellow",
                accent === "none" && "bg-border"
              )}
            />
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

/* Speed Lines Decorative Component */
export function SpeedLines({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {[...Array(5)].map((_, i) => (
        <div
          key={`speed-line-${i}`}
          className="absolute h-px bg-neon-pink/20"
          style={{
            top: `${20 + i * 15}%`,
            left: "-10%",
            right: "-10%",
            transform: `rotate(${-2 + i * 0.5}deg)`,
          }}
        />
      ))}
    </div>
  )
}

/* Japanese Onomatopoeia Decorative Component */
export function JapaneseAccent({
  text = "\u30B4\u30B4\u30B4\u30B4",
  className,
}: {
  text?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "font-display text-6xl lg:text-8xl text-neon-pink/10 select-none pointer-events-none absolute",
        className
      )}
      aria-hidden="true"
    >
      {text}
    </span>
  )
}
