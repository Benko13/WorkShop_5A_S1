import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroBanner } from "@/components/hero-banner"
import { FranchiseGrid } from "@/components/franchise-grid"
import { NewArrivals } from "@/components/new-arrivals"
import { BestSellers } from "@/components/best-sellers"
import { CategoryBlocks } from "@/components/category-blocks"
import { PromoBanner } from "@/components/promo-banner"
import { NewsletterSection } from "@/components/newsletter-section"
import { TrustBadges } from "@/components/trust-badges"
import { KawaiiAnimationsShowcase } from "@/components/kawaii-animations"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="pt-16 lg:pt-20">
        {/* 1. Hero Banner */}
        <HeroBanner />

        {/* 2. Trust Badges Bar */}
        <TrustBadges />

        {/* 3. Featured Franchises */}
        <FranchiseGrid />

        {/* 4. New Arrivals */}
        <NewArrivals />

        {/* 5. Promotional Banner */}
        <PromoBanner />

        {/* 6. Best Sellers */}
        <BestSellers />

        {/* 7. Shop by Category */}
        <CategoryBlocks />

        {/* 8. Newsletter Signup */}
        <NewsletterSection />
      </main>

      <SiteFooter />
    </div>
  )
}
