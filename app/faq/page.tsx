import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SectionWrapper, JapaneseAccent } from "@/components/section-wrapper"
import { FAQContent } from "@/components/faq-content"

export const metadata: Metadata = {
  title: "FAQ | ARTS ET SHOP",
  description: "Questions fréquemment posées",
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <SectionWrapper
          title="FAQ"
          subtitle="Questions fréquemment posées"
          accent="yellow"
          withAsanoha
        >
          <JapaneseAccent text="よくある質問" className="top-0 right-0 -z-10" />
          <FAQContent />
        </SectionWrapper>
      </main>
      <SiteFooter />
    </div>
  )
}
