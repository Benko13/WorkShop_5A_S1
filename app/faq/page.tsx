"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SectionWrapper, JapaneseAccent } from "@/components/section-wrapper"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export const metadata = {
  title: "FAQ | ARTS ET SHOP",
  description: "Questions fréquemment posées",
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  
  return (
    <div className="border-4 border-border bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 lg:p-6 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="font-display text-lg text-off-white uppercase">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-neon-pink transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-4 lg:px-6 pb-4 lg:pb-6 text-muted-foreground">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const faqs = [
    {
      question: "Comment passer une commande ?",
      answer: "Vous pouvez passer une commande directement sur notre site en ajoutant les produits à votre panier, puis en procédant au paiement sécurisé.",
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons les paiements par carte bancaire (CB, VISA, MASTERCARD) et PayPal. Tous les paiements sont sécurisés.",
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Les délais de livraison varient selon le mode de livraison choisi (Colissimo ou Mondial Relay) et la destination. Les délais sont indiqués lors de la validation de votre commande.",
    },
    {
      question: "Puis-je retourner un produit ?",
      answer: "Oui, vous disposez d'un délai de 14 jours à compter de la réception pour retourner un produit non conforme ou défectueux. Contactez-nous à contact@artsetshop.fr pour initier le retour.",
    },
    {
      question: "Les produits sont-ils authentiques ?",
      answer: "Oui, tous nos produits sont authentiques et proviennent directement des fabricants officiels ou de distributeurs autorisés.",
    },
    {
      question: "Proposez-vous des précommandes ?",
      answer: "Oui, nous proposons des précommandes pour les produits à venir. Les dates de disponibilité sont indiquées sur chaque fiche produit.",
    },
    {
      question: "Comment suivre ma commande ?",
      answer: "Une fois votre commande expédiée, vous recevrez un email avec le numéro de suivi. Vous pouvez également suivre votre commande depuis votre compte client.",
    },
    {
      question: "Livrez-vous à l'étranger ?",
      answer: "Actuellement, nous livrons uniquement en France métropolitaine. Nous travaillons sur l'extension de nos zones de livraison.",
    },
  ]

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
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </SectionWrapper>
      </main>
      <SiteFooter />
    </div>
  )
}
