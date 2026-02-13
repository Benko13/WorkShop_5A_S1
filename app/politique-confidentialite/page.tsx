import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SectionWrapper, JapaneseAccent } from "@/components/section-wrapper"

export const metadata = {
  title: "Politique de Confidentialité | ARTS ET SHOP",
  description: "Politique de confidentialité et protection des données personnelles",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <SectionWrapper
          title="POLITIQUE DE CONFIDENTIALITÉ"
          subtitle="Protection de vos données personnelles"
          accent="pink"
          withAsanoha
        >
          <JapaneseAccent text="プライバシー" className="top-0 right-0 -z-10" />
          
          <div className="max-w-4xl mx-auto space-y-8">
            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                1. Collecte des données
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  ARTS ET SHOP collecte les données personnelles suivantes lors de votre 
                  utilisation du site :
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Adresse postale</li>
                  <li>Numéro de téléphone</li>
                  <li>Données de navigation (cookies)</li>
                </ul>
              </div>
            </section>

            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                2. Utilisation des données
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  Vos données personnelles sont utilisées pour :
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Le traitement de vos commandes</li>
                  <li>La gestion de votre compte client</li>
                  <li>L'envoi d'informations relatives à vos commandes</li>
                  <li>L'amélioration de nos services</li>
                  <li>La communication marketing (avec votre consentement)</li>
                </ul>
              </div>
            </section>

            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                3. Conservation des données
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  Vos données personnelles sont conservées pendant la durée nécessaire aux 
                  finalités pour lesquelles elles ont été collectées, et conformément aux 
                  obligations légales.
                </p>
              </div>
            </section>

            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                4. Vos droits
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit d'opposition</li>
                </ul>
                <p className="mt-4">
                  Pour exercer ces droits, contactez-nous à : contact@artsetshop.fr
                </p>
              </div>
            </section>

            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                5. Cookies
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  Le site utilise des cookies pour améliorer votre expérience de navigation 
                  et analyser le trafic. Vous pouvez gérer vos préférences de cookies dans 
                  les paramètres de votre navigateur.
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
