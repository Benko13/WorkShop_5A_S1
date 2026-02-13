import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SectionWrapper, JapaneseAccent } from "@/components/section-wrapper"

export const metadata = {
  title: "Conditions Générales de Vente | ARTS ET SHOP",
  description: "Conditions générales de vente de ARTS ET SHOP",
}

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <SectionWrapper
          title="CONDITIONS GÉNÉRALES DE VENTE"
          subtitle="CGV - ARTS ET SHOP"
          accent="yellow"
          withAsanoha
        >
          <JapaneseAccent text="販売条件" className="top-0 right-0 -z-10" />
          
          <div className="max-w-4xl mx-auto space-y-8">
            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                1. Objet
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations 
                  contractuelles entre ARTS ET SHOP et ses clients concernant la vente en 
                  ligne de produits liés à l'univers Manga et Japanimation.
                </p>
              </div>
            </section>

            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                2. Prix
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  Les prix de nos produits sont indiqués en euros, toutes taxes comprises 
                  (TTC), hors frais de livraison. ARTS ET SHOP se réserve le droit de 
                  modifier ses prix à tout moment, étant toutefois entendu que le prix 
                  figurant au jour de la commande sera le seul applicable à l'acheteur.
                </p>
              </div>
            </section>

            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                3. Commande
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  Toute commande vaut acceptation des prix et descriptions des produits 
                  disponibles à la vente. Les informations contractuelles sont présentées 
                  en langue française et font l'objet d'une confirmation au plus tard au 
                  moment de la validation de votre commande.
                </p>
              </div>
            </section>

            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                4. Livraison
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  Les produits sont livrés à l'adresse indiquée par le client lors de la 
                  commande. Les délais de livraison sont indiqués à titre indicatif et ne 
                  sauraient engager la responsabilité de ARTS ET SHOP en cas de retard.
                </p>
                <p>
                  Les modes de livraison disponibles sont : Colissimo et Mondial Relay.
                </p>
              </div>
            </section>

            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                5. Droit de rétractation
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  Conformément à la législation en vigueur, vous disposez d'un délai de 
                  14 jours à compter de la réception de votre commande pour exercer votre 
                  droit de rétractation, sans avoir à justifier de motifs ni à payer de 
                  pénalité.
                </p>
              </div>
            </section>

            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                6. Paiement
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  Le paiement s'effectue par carte bancaire (CB, VISA, MASTERCARD) ou 
                  via PayPal. Le paiement est sécurisé et les informations bancaires 
                  sont cryptées.
                </p>
              </div>
            </section>
          </div>
        </SectionWrapper>
      </main>
      <SiteFooter />
    </div>
  )
}
