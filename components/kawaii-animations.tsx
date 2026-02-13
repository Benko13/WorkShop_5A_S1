"use client"

import { cn } from "@/lib/utils"

/* ═══════════════════════════════════════════════════════════════
   KAWAII CHARACTER LOADING & STATE ANIMATIONS
   Superflat-inspired cute characters for UI states.
   Neubrutalism aesthetic: thick borders, flat fills, neon accents.
   ═══════════════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────
   1. KAWAII LOADING SPINNER
   A bouncing chibi star character with
   orbiting card/sparkle elements
   ─────────────────────────────────────────── */

interface KawaiiLoadingProps {
  message?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function KawaiiLoading({
  message = "Chargement...",
  size = "md",
  className,
}: KawaiiLoadingProps) {
  const sizeMap = { sm: 100, md: 160, lg: 220 }
  const s = sizeMap[size]

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        className
      )}
      role="status"
      aria-label={message}
    >
      <div className="relative" style={{ width: s, height: s }}>
        {/* Orbiting sparkles */}
        <svg
          viewBox="0 0 200 200"
          width={s}
          height={s}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <style>{`
            @keyframes kawaii-orbit {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes kawaii-orbit-reverse {
              0% { transform: rotate(360deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes kawaii-pulse {
              0%, 100% { opacity: 0.6; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            .orbit-group-1 {
              animation: kawaii-orbit 3s linear infinite;
              transform-origin: 100px 100px;
            }
            .orbit-group-2 {
              animation: kawaii-orbit-reverse 4s linear infinite;
              transform-origin: 100px 100px;
            }
            .sparkle-pulse {
              animation: kawaii-pulse 1.5s ease-in-out infinite;
            }
            .sparkle-pulse-delay {
              animation: kawaii-pulse 1.5s ease-in-out infinite 0.5s;
            }
            .sparkle-pulse-delay2 {
              animation: kawaii-pulse 1.5s ease-in-out infinite 1s;
            }
          `}</style>

          {/* Orbit ring 1 */}
          <g className="orbit-group-1">
            {/* Miniature card */}
            <g transform="translate(100,20)">
              <rect
                x="-8"
                y="-11"
                width="16"
                height="22"
                fill="#FF00FF"
                stroke="#FFFFFF"
                strokeWidth="2"
                className="sparkle-pulse"
              />
              {/* Star on card */}
              <polygon
                points="0,-4 2,-1 5,-1 3,1 4,4 0,2 -4,4 -3,1 -5,-1 -2,-1"
                fill="#F7EF00"
                className="sparkle-pulse"
              />
            </g>
            {/* Sparkle */}
            <g transform="translate(170,130)">
              <polygon
                points="0,-6 2,-2 6,0 2,2 0,6 -2,2 -6,0 -2,-2"
                fill="#F7EF00"
                stroke="#FFFFFF"
                strokeWidth="1"
                className="sparkle-pulse-delay"
              />
            </g>
          </g>

          {/* Orbit ring 2 */}
          <g className="orbit-group-2">
            {/* Small figurine silhouette */}
            <g transform="translate(30,80)">
              <circle
                cx="0"
                cy="-4"
                r="5"
                fill="#F7EF00"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                className="sparkle-pulse-delay2"
              />
              <rect
                x="-4"
                y="1"
                width="8"
                height="10"
                rx="0"
                fill="#F7EF00"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                className="sparkle-pulse-delay2"
              />
            </g>
            {/* Sparkle */}
            <g transform="translate(160,60)">
              <polygon
                points="0,-5 1.5,-1.5 5,0 1.5,1.5 0,5 -1.5,1.5 -5,0 -1.5,-1.5"
                fill="#FF00FF"
                stroke="#FFFFFF"
                strokeWidth="1"
                className="sparkle-pulse"
              />
            </g>
          </g>
        </svg>

        {/* Central kawaii character - bouncing cat-like creature */}
        <svg
          viewBox="0 0 120 120"
          width={s * 0.6}
          height={s * 0.6}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
          style={{
            animation: "kawaii-bounce 1.2s ease-in-out infinite",
          }}
        >
          <style>{`
            @keyframes kawaii-bounce {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
            @keyframes kawaii-blink {
              0%, 42%, 46%, 100% { transform: scaleY(1); }
              44% { transform: scaleY(0.1); }
            }
            .kawaii-eyes {
              animation: kawaii-blink 3s ease-in-out infinite;
              transform-origin: center;
            }
          `}</style>

          {/* Body - round blob shape */}
          <ellipse
            cx="60"
            cy="68"
            rx="38"
            ry="34"
            fill="#FF00FF"
            stroke="#FFFFFF"
            strokeWidth="4"
          />

          {/* Cat ears */}
          <polygon
            points="30,42 22,18 42,36"
            fill="#FF00FF"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon
            points="90,42 98,18 78,36"
            fill="#FF00FF"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Inner ears */}
          <polygon points="31,38 26,24 40,36" fill="#F7EF00" />
          <polygon points="89,38 94,24 80,36" fill="#F7EF00" />

          {/* Eyes - large, Superflat style */}
          <g className="kawaii-eyes">
            <ellipse cx="45" cy="62" rx="8" ry="9" fill="#FFFFFF" />
            <ellipse cx="75" cy="62" rx="8" ry="9" fill="#FFFFFF" />
            <ellipse cx="47" cy="63" rx="4.5" ry="5" fill="#111111" />
            <ellipse cx="77" cy="63" rx="4.5" ry="5" fill="#111111" />
            {/* Eye shine */}
            <circle cx="49" cy="60" r="2" fill="#FFFFFF" />
            <circle cx="79" cy="60" r="2" fill="#FFFFFF" />
          </g>

          {/* Mouth - small happy "w" shape */}
          <path
            d="M53,76 Q56,80 60,77 Q64,80 67,76"
            fill="none"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Blush cheeks */}
          <ellipse cx="35" cy="72" rx="6" ry="4" fill="#F7EF00" opacity="0.5" />
          <ellipse cx="85" cy="72" rx="6" ry="4" fill="#F7EF00" opacity="0.5" />

          {/* Paws */}
          <ellipse
            cx="38"
            cy="96"
            rx="10"
            ry="6"
            fill="#FF00FF"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
          <ellipse
            cx="82"
            cy="96"
            rx="10"
            ry="6"
            fill="#FF00FF"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
          {/* Paw pads */}
          <circle cx="36" cy="95" r="2" fill="#F7EF00" opacity="0.6" />
          <circle cx="41" cy="95" r="2" fill="#F7EF00" opacity="0.6" />
          <circle cx="80" cy="95" r="2" fill="#F7EF00" opacity="0.6" />
          <circle cx="85" cy="95" r="2" fill="#F7EF00" opacity="0.6" />
        </svg>
      </div>

      {/* Loading text */}
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-off-white">
          {message}
        </p>
        {/* Animated dots bar */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={`dot-${i}`}
              className="w-2 h-2 bg-neon-pink border border-border"
              style={{
                animation: `kawaii-dot-wave 1.2s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes kawaii-dot-wave {
          0%, 100% { transform: scaleY(1); opacity: 0.3; }
          50% { transform: scaleY(2.5); opacity: 1; background: #F7EF00; }
        }
      `}</style>
    </div>
  )
}

/* ───────────────────────────────────────────
   2. KAWAII SUCCESS ANIMATION
   A cheerful character celebrating with
   confetti burst and sparkle effects
   ─────────────────────────────────────────── */

interface KawaiiSuccessProps {
  message?: string
  detail?: string
  className?: string
}

export function KawaiiSuccess({
  message = "Ajout reussi !",
  detail,
  className,
}: KawaiiSuccessProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5",
        className
      )}
      role="status"
      aria-label={message}
    >
      <div className="relative" style={{ width: 180, height: 180 }}>
        {/* Confetti burst */}
        <svg
          viewBox="0 0 200 200"
          width={180}
          height={180}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <style>{`
            @keyframes confetti-burst {
              0% { transform: scale(0) rotate(0deg); opacity: 1; }
              50% { opacity: 1; }
              100% { transform: scale(1) rotate(180deg); opacity: 0; }
            }
            @keyframes confetti-float-1 {
              0% { transform: translate(0,0) rotate(0deg); opacity: 0; }
              20% { opacity: 1; }
              100% { transform: translate(-40px,-60px) rotate(270deg); opacity: 0; }
            }
            @keyframes confetti-float-2 {
              0% { transform: translate(0,0) rotate(0deg); opacity: 0; }
              20% { opacity: 1; }
              100% { transform: translate(45px,-55px) rotate(-200deg); opacity: 0; }
            }
            @keyframes confetti-float-3 {
              0% { transform: translate(0,0) rotate(0deg); opacity: 0; }
              20% { opacity: 1; }
              100% { transform: translate(-30px,-70px) rotate(300deg); opacity: 0; }
            }
            @keyframes confetti-float-4 {
              0% { transform: translate(0,0) rotate(0deg); opacity: 0; }
              20% { opacity: 1; }
              100% { transform: translate(50px,-40px) rotate(-250deg); opacity: 0; }
            }
            @keyframes confetti-float-5 {
              0% { transform: translate(0,0) rotate(0deg); opacity: 0; }
              20% { opacity: 1; }
              100% { transform: translate(-55px,10px) rotate(200deg); opacity: 0; }
            }
            @keyframes confetti-float-6 {
              0% { transform: translate(0,0) rotate(0deg); opacity: 0; }
              20% { opacity: 1; }
              100% { transform: translate(35px,20px) rotate(-180deg); opacity: 0; }
            }
            .confetti-1 { animation: confetti-float-1 2s ease-out infinite; }
            .confetti-2 { animation: confetti-float-2 2s ease-out 0.1s infinite; }
            .confetti-3 { animation: confetti-float-3 2s ease-out 0.2s infinite; }
            .confetti-4 { animation: confetti-float-4 2s ease-out 0.15s infinite; }
            .confetti-5 { animation: confetti-float-5 2s ease-out 0.25s infinite; }
            .confetti-6 { animation: confetti-float-6 2s ease-out 0.3s infinite; }

            @keyframes success-ring {
              0% { r: 30; opacity: 0.8; stroke-width: 6; }
              100% { r: 80; opacity: 0; stroke-width: 1; }
            }
            .success-ring {
              animation: success-ring 2s ease-out infinite;
            }
            .success-ring-delay {
              animation: success-ring 2s ease-out 0.6s infinite;
            }
          `}</style>

          {/* Expanding rings */}
          <circle
            cx="100"
            cy="100"
            r="30"
            fill="none"
            stroke="#FF00FF"
            strokeWidth="3"
            className="success-ring"
          />
          <circle
            cx="100"
            cy="100"
            r="30"
            fill="none"
            stroke="#F7EF00"
            strokeWidth="2"
            className="success-ring-delay"
          />

          {/* Confetti pieces */}
          <g transform="translate(100,100)">
            <rect
              x="-3"
              y="-5"
              width="6"
              height="10"
              fill="#FF00FF"
              stroke="#FFFFFF"
              strokeWidth="1"
              className="confetti-1"
            />
            <rect
              x="-4"
              y="-3"
              width="8"
              height="6"
              fill="#F7EF00"
              stroke="#FFFFFF"
              strokeWidth="1"
              className="confetti-2"
            />
            <polygon
              points="0,-6 5,4 -5,4"
              fill="#FFFFFF"
              className="confetti-3"
            />
            <rect
              x="-3"
              y="-4"
              width="6"
              height="8"
              fill="#F7EF00"
              stroke="#FFFFFF"
              strokeWidth="1"
              className="confetti-4"
            />
            <polygon
              points="0,-5 4,3 -4,3"
              fill="#FF00FF"
              stroke="#FFFFFF"
              strokeWidth="1"
              className="confetti-5"
            />
            <rect
              x="-5"
              y="-3"
              width="10"
              height="6"
              fill="#FFFFFF"
              className="confetti-6"
            />
          </g>
        </svg>

        {/* Central kawaii character - happy bunny */}
        <svg
          viewBox="0 0 120 130"
          width={110}
          height={120}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
          style={{
            animation: "success-jump 0.8s ease-in-out infinite",
          }}
        >
          <style>{`
            @keyframes success-jump {
              0%, 100% { transform: translateY(0) scale(1,1); }
              30% { transform: translateY(-12px) scale(0.95,1.05); }
              50% { transform: translateY(-14px) scale(0.95,1.05); }
              80% { transform: translateY(2px) scale(1.05,0.95); }
            }
            @keyframes happy-wiggle {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(8deg); }
              75% { transform: rotate(-8deg); }
            }
            .wiggle {
              animation: happy-wiggle 0.6s ease-in-out infinite;
              transform-origin: center bottom;
            }
          `}</style>

          {/* Body */}
          <ellipse
            cx="60"
            cy="82"
            rx="34"
            ry="30"
            fill="#F7EF00"
            stroke="#FFFFFF"
            strokeWidth="4"
          />

          {/* Ears - long bunny ears */}
          <ellipse
            cx="42"
            cy="30"
            rx="10"
            ry="28"
            fill="#F7EF00"
            stroke="#FFFFFF"
            strokeWidth="3"
            transform="rotate(-10, 42, 30)"
            className="wiggle"
          />
          <ellipse
            cx="78"
            cy="30"
            rx="10"
            ry="28"
            fill="#F7EF00"
            stroke="#FFFFFF"
            strokeWidth="3"
            transform="rotate(10, 78, 30)"
            className="wiggle"
            style={{ animationDelay: "0.15s" }}
          />
          {/* Inner ears */}
          <ellipse
            cx="42"
            cy="28"
            rx="5"
            ry="16"
            fill="#FF00FF"
            opacity="0.6"
            transform="rotate(-10, 42, 28)"
          />
          <ellipse
            cx="78"
            cy="28"
            rx="5"
            ry="16"
            fill="#FF00FF"
            opacity="0.6"
            transform="rotate(10, 78, 28)"
          />

          {/* Eyes - happy closed arcs (^_^) */}
          <path
            d="M42,76 Q48,68 54,76"
            fill="none"
            stroke="#111111"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M66,76 Q72,68 78,76"
            fill="none"
            stroke="#111111"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Mouth - big open smile */}
          <path
            d="M48,86 Q54,96 60,90 Q66,96 72,86"
            fill="#111111"
            stroke="#111111"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Tongue */}
          <ellipse cx="60" cy="91" rx="5" ry="3.5" fill="#FF00FF" />

          {/* Blush */}
          <ellipse
            cx="36"
            cy="83"
            rx="6"
            ry="4"
            fill="#FF00FF"
            opacity="0.45"
          />
          <ellipse
            cx="84"
            cy="83"
            rx="6"
            ry="4"
            fill="#FF00FF"
            opacity="0.45"
          />

          {/* Arms raised - celebrating! */}
          <line
            x1="32"
            y1="74"
            x2="16"
            y2="56"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="88"
            y1="74"
            x2="104"
            y2="56"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Hands - small circles */}
          <circle
            cx="14"
            cy="54"
            r="5"
            fill="#F7EF00"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <circle
            cx="106"
            cy="54"
            r="5"
            fill="#F7EF00"
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          {/* Star above head */}
          <polygon
            points="60,2 63,10 72,10 65,15 67,24 60,19 53,24 55,15 48,10 57,10"
            fill="#FF00FF"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            style={{
              animation: "kawaii-pulse 1s ease-in-out infinite",
            }}
          />

          {/* Feet */}
          <ellipse
            cx="45"
            cy="108"
            rx="11"
            ry="6"
            fill="#F7EF00"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
          <ellipse
            cx="75"
            cy="108"
            rx="11"
            ry="6"
            fill="#F7EF00"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {/* Success text */}
      <div className="text-center">
        <p className="font-display text-xl uppercase tracking-wider text-cyber-yellow text-glow-yellow">
          {message}
        </p>
        {detail && (
          <p className="mt-2 text-xs text-muted-foreground uppercase tracking-widest">
            {detail}
          </p>
        )}
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────
   3. KAWAII ERROR / 404 GRAPHIC
   A sad/confused character with dramatic
   manga-style background effects
   ─────────────────────────────────────────── */

interface KawaiiErrorProps {
  code?: string
  message?: string
  detail?: string
  className?: string
}

export function KawaiiError({
  code = "404",
  message = "Page introuvable",
  detail = "Le produit que vous cherchez semble avoir disparu dans une autre dimension...",
  className,
}: KawaiiErrorProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-6 py-8",
        className
      )}
      role="alert"
      aria-label={`Erreur ${code}: ${message}`}
    >
      {/* Background manga speed lines */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={`error-line-${i}`}
            className="absolute bg-neon-pink/5"
            style={{
              height: "1px",
              top: `${i * 5}%`,
              left: "-20%",
              right: "-20%",
              transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i * 0.3)}deg)`,
            }}
          />
        ))}
      </div>

      {/* Error code in dramatic manga style */}
      <div className="relative">
        <span
          className="font-display text-[80px] md:text-[120px] lg:text-[160px] leading-none text-neon-pink/8 select-none pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          {code}
        </span>
      </div>

      {/* Kawaii character - confused/sad ghost */}
      <div className="relative z-10" style={{ width: 200, height: 200 }}>
        <svg
          viewBox="0 0 140 160"
          width={200}
          height={220}
          className="mx-auto"
          aria-hidden="true"
          style={{
            animation: "error-float 3s ease-in-out infinite",
          }}
        >
          <style>{`
            @keyframes error-float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              25% { transform: translateY(-6px) rotate(1deg); }
              75% { transform: translateY(4px) rotate(-1deg); }
            }
            @keyframes sweat-drop {
              0%, 70% { opacity: 0; transform: translateY(0); }
              75% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(12px); }
            }
            @keyframes error-question {
              0%, 100% { transform: translateY(0) rotate(-5deg); opacity: 0.8; }
              50% { transform: translateY(-4px) rotate(5deg); opacity: 1; }
            }
            .sweat-anim {
              animation: sweat-drop 3s ease-in-out infinite;
            }
            .question-float {
              animation: error-question 2s ease-in-out infinite;
            }
          `}</style>

          {/* Ghost tail / wavy bottom */}
          <path
            d="M22,105 L22,120 Q32,110 42,120 Q52,130 62,118 Q72,130 82,120 Q92,110 102,120 Q112,130 118,118 L118,105"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="3"
          />

          {/* Body - ghost/blob shape */}
          <path
            d="M22,105 L22,55 Q22,18 70,18 Q118,18 118,55 L118,105"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="3"
          />

          {/* Outer border */}
          <path
            d="M22,105 L22,55 Q22,18 70,18 Q118,18 118,55 L118,105"
            fill="none"
            stroke="#FF00FF"
            strokeWidth="4"
          />
          <path
            d="M22,105 L22,120 Q32,110 42,120 Q52,130 62,118 Q72,130 82,120 Q92,110 102,120 Q112,130 118,118 L118,105"
            fill="none"
            stroke="#FF00FF"
            strokeWidth="3"
          />

          {/* Eyes - worried/sad style */}
          {/* Left eye */}
          <ellipse cx="50" cy="62" rx="12" ry="13" fill="#111111" />
          <ellipse cx="50" cy="64" rx="8" ry="9" fill="#FFFFFF" />
          <ellipse cx="52" cy="65" rx="4" ry="5" fill="#111111" />
          <circle cx="54" cy="62" r="2.5" fill="#FFFFFF" />
          {/* Worried eyebrow */}
          <line
            x1="38"
            y1="46"
            x2="56"
            y2="48"
            stroke="#111111"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Right eye */}
          <ellipse cx="90" cy="62" rx="12" ry="13" fill="#111111" />
          <ellipse cx="90" cy="64" rx="8" ry="9" fill="#FFFFFF" />
          <ellipse cx="92" cy="65" rx="4" ry="5" fill="#111111" />
          <circle cx="94" cy="62" r="2.5" fill="#FFFFFF" />
          {/* Worried eyebrow */}
          <line
            x1="84"
            y1="48"
            x2="102"
            y2="46"
            stroke="#111111"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Mouth - wobbly worried line */}
          <path
            d="M55,84 Q62,80 70,86 Q78,80 85,84"
            fill="none"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Blush */}
          <ellipse cx="38" cy="76" rx="7" ry="4" fill="#FF00FF" opacity="0.25" />
          <ellipse cx="102" cy="76" rx="7" ry="4" fill="#FF00FF" opacity="0.25" />

          {/* Sweat drop */}
          <path
            d="M112,42 Q116,50 112,56 Q108,50 112,42"
            fill="#00BFFF"
            stroke="#FFFFFF"
            strokeWidth="1"
            className="sweat-anim"
          />

          {/* Tiny arms holding a broken card */}
          {/* Left arm */}
          <ellipse
            cx="24"
            cy="85"
            rx="8"
            ry="6"
            fill="#FFFFFF"
            stroke="#FF00FF"
            strokeWidth="2"
          />
          {/* Right arm holding torn card */}
          <ellipse
            cx="116"
            cy="85"
            rx="8"
            ry="6"
            fill="#FFFFFF"
            stroke="#FF00FF"
            strokeWidth="2"
          />
          {/* Torn card piece */}
          <g transform="translate(126,74) rotate(15)">
            <path
              d="M0,0 L10,0 L10,14 L5,12 L0,14 Z"
              fill="#F7EF00"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <line
              x1="3"
              y1="4"
              x2="7"
              y2="4"
              stroke="#111111"
              strokeWidth="1"
            />
            <line
              x1="3"
              y1="7"
              x2="6"
              y2="7"
              stroke="#111111"
              strokeWidth="1"
            />
          </g>

          {/* Question marks floating */}
          <text
            x="18"
            y="35"
            fontFamily="var(--font-display), Impact, sans-serif"
            fontSize="18"
            fill="#F7EF00"
            className="question-float"
          >
            ?
          </text>
          <text
            x="110"
            y="30"
            fontFamily="var(--font-display), Impact, sans-serif"
            fontSize="14"
            fill="#FF00FF"
            className="question-float"
            style={{ animationDelay: "0.5s" }}
          >
            ?
          </text>
        </svg>
      </div>

      {/* Error text */}
      <div className="relative z-10 text-center">
        <div className="inline-block bg-neon-pink px-4 py-1.5 border-4 border-border mb-4">
          <span className="font-display text-2xl md:text-3xl text-primary-foreground tracking-wider">
            ERREUR {code}
          </span>
        </div>
        <h2 className="font-display text-xl md:text-2xl uppercase tracking-wider text-off-white mb-3">
          {message}
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
          {detail}
        </p>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────
   4. KAWAII EMPTY STATE
   For empty carts, wishlists, etc.
   ─────────────────────────────────────────── */

interface KawaiiEmptyProps {
  message?: string
  detail?: string
  className?: string
}

export function KawaiiEmpty({
  message = "Rien ici pour le moment",
  detail = "Explorez notre collection pour trouver votre prochain tresor !",
  className,
}: KawaiiEmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5",
        className
      )}
    >
      <svg
        viewBox="0 0 140 140"
        width={160}
        height={160}
        aria-hidden="true"
        style={{
          animation: "error-float 4s ease-in-out infinite",
        }}
      >
        <style>{`
          @keyframes empty-sparkle {
            0%, 100% { opacity: 0.2; transform: scale(0.6); }
            50% { opacity: 0.8; transform: scale(1); }
          }
          .empty-sparkle-1 { animation: empty-sparkle 2s ease-in-out infinite; }
          .empty-sparkle-2 { animation: empty-sparkle 2s ease-in-out 0.7s infinite; }
          .empty-sparkle-3 { animation: empty-sparkle 2s ease-in-out 1.4s infinite; }
        `}</style>

        {/* Open box */}
        <rect
          x="30"
          y="65"
          width="80"
          height="55"
          fill="#1a1a1a"
          stroke="#FFFFFF"
          strokeWidth="4"
        />
        {/* Box flaps */}
        <path
          d="M26,65 L45,45 L70,55 L30,65"
          fill="#222222"
          stroke="#FFFFFF"
          strokeWidth="3"
        />
        <path
          d="M114,65 L95,45 L70,55 L110,65"
          fill="#333333"
          stroke="#FFFFFF"
          strokeWidth="3"
        />

        {/* Kawaii face on box */}
        <g>
          {/* Eyes - big dot style */}
          <circle cx="55" cy="88" r="5" fill="#FFFFFF" />
          <circle cx="85" cy="88" r="5" fill="#FFFFFF" />
          <circle cx="56" cy="89" r="3" fill="#111111" />
          <circle cx="86" cy="89" r="3" fill="#111111" />
          <circle cx="57.5" cy="87" r="1.5" fill="#FFFFFF" />
          <circle cx="87.5" cy="87" r="1.5" fill="#FFFFFF" />
          {/* Mouth - small o */}
          <ellipse
            cx="70"
            cy="100"
            rx="4"
            ry="3.5"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Blush */}
          <ellipse cx="44" cy="95" rx="6" ry="3" fill="#FF00FF" opacity="0.3" />
          <ellipse
            cx="96"
            cy="95"
            rx="6"
            ry="3"
            fill="#FF00FF"
            opacity="0.3"
          />
        </g>

        {/* Floating sparkles above box */}
        <polygon
          points="50,30 52,35 57,35 53,38 55,43 50,40 45,43 47,38 43,35 48,35"
          fill="#F7EF00"
          stroke="#FFFFFF"
          strokeWidth="1"
          className="empty-sparkle-1"
        />
        <polygon
          points="90,25 91.5,28 95,28 92,30 93,33 90,31 87,33 88,30 85,28 88.5,28"
          fill="#FF00FF"
          stroke="#FFFFFF"
          strokeWidth="1"
          className="empty-sparkle-2"
        />
        <polygon
          points="70,18 71.5,22 75,22 72.5,24 73.5,28 70,26 66.5,28 67.5,24 65,22 68.5,22"
          fill="#FFFFFF"
          className="empty-sparkle-3"
        />
      </svg>

      <div className="text-center">
        <p className="font-display text-lg uppercase tracking-wider text-off-white mb-2">
          {message}
        </p>
        <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
          {detail}
        </p>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────
   5. DEMO / SHOWCASE SECTION
   Display all kawaii animations together
   ─────────────────────────────────────────── */

export function KawaiiAnimationsShowcase() {
  return (
    <section className="relative py-16 lg:py-24 px-4 lg:px-8 asanoha-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider text-neon-pink text-glow-pink">
            KAWAII ANIMATIONS
          </h2>
          <p className="mt-3 text-sm text-muted-foreground uppercase tracking-widest">
            {"Personnages mignons pour une experience unique"}
          </p>
          <div className="mt-4 h-1 w-24 bg-neon-pink" />
        </div>

        {/* Animation cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Loading */}
          <div className="bg-card border-4 border-border p-8 lg:p-12 flex flex-col items-center justify-center min-h-[360px]">
            <div className="mb-6">
              <span className="inline-block bg-neon-pink px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground border-2 border-border">
                CHARGEMENT
              </span>
            </div>
            <KawaiiLoading message="Chargement des produits..." size="md" />
          </div>

          {/* Success */}
          <div className="bg-card border-4 border-border border-l-0 md:border-l-0 p-8 lg:p-12 flex flex-col items-center justify-center min-h-[360px]">
            <div className="mb-6">
              <span className="inline-block bg-cyber-yellow px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary-foreground border-2 border-border">
                {"SUCCES"}
              </span>
            </div>
            <KawaiiSuccess
              message="Ajout au panier !"
              detail="Votre figurine a bien ete ajoutee"
            />
          </div>

          {/* Error/404 */}
          <div className="bg-card border-4 border-border border-t-0 p-8 lg:p-12 flex flex-col items-center justify-center min-h-[360px]">
            <div className="mb-6">
              <span className="inline-block bg-destructive px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-destructive-foreground border-2 border-border">
                ERREUR
              </span>
            </div>
            <KawaiiError
              code="404"
              message="Page introuvable"
              detail="Ce produit a disparu..."
            />
          </div>

          {/* Empty state */}
          <div className="bg-card border-4 border-border border-t-0 border-l-0 md:border-l-0 p-8 lg:p-12 flex flex-col items-center justify-center min-h-[360px]">
            <div className="mb-6">
              <span className="inline-block bg-muted px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-off-white border-2 border-border">
                VIDE
              </span>
            </div>
            <KawaiiEmpty />
          </div>
        </div>

        {/* Decorative Japanese text */}
        <div
          className="absolute bottom-8 right-8 font-display text-6xl lg:text-8xl text-neon-pink/6 select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u30AB\u30EF\u30A4\u30A4"}
        </div>
      </div>
    </section>
  )
}
