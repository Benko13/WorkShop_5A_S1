import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SectionWrapper, JapaneseAccent } from "@/components/section-wrapper"

export const metadata = {
  title: "Mentions Légales | ARTS ET SHOP",
  description: "Mentions légales de ARTS ET SHOP",
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <SectionWrapper
          title="MENTIONS LÉGALES"
          subtitle="Informations légales et éditoriales"
          accent="pink"
          withAsanoha
        >
          <JapaneseAccent text="法的情報" className="top-0 right-0 -z-10" />
          
          <div className="max-w-4xl mx-auto space-y-8">
            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                1. Éditeur du site
              </h2>
              <div className="space-y-2 text-off-white">
                <p><strong>Raison sociale :</strong> ARTS ET SHOP</p>
                <p><strong>Email :</strong> contact@artsetshop.fr</p>
                <p><strong>Directeur de publication :</strong> ARTS ET SHOP</p>
              </div>
            </section>

            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                2. Hébergement
              </h2>
              <div className="space-y-2 text-off-white">
                <p>Le site est hébergé par :</p>
                <p><strong>Vercel Inc.</strong></p>
                <p>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
              </div>
            </section>

            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                3. Propriété intellectuelle
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  L'ensemble de ce site relève de la législation française et internationale 
                  sur le droit d'auteur et la propriété intellectuelle. Tous les droits de 
                  reproduction sont réservés, y compris pour les documents téléchargeables 
                  et les représentations iconographiques et photographiques.
                </p>
                <p>
                  La reproduction de tout ou partie de ce site sur un support électronique 
                  quelconque est formellement interdite sauf autorisation expresse de 
                  l'éditeur.
                </p>
              </div>
            </section>

            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                4. Protection des données personnelles
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée 
                  et au Règlement Général sur la Protection des Données (RGPD), vous disposez 
                  d'un droit d'accès, de rectification, de suppression et d'opposition aux 
                  données personnelles vous concernant.
                </p>
                <p>
                  Pour exercer ce droit, vous pouvez nous contacter à l'adresse : 
                  contact@artsetshop.fr
                </p>
              </div>
            </section>

            <section className="bg-card border-4 border-border p-6 lg:p-8">
              <h2 className="font-display text-2xl text-cyber-yellow mb-4 uppercase">
                5. Cookies
              </h2>
              <div className="space-y-2 text-off-white">
                <p>
                  Le site utilise des cookies pour améliorer l'expérience utilisateur et 
                  analyser le trafic. En continuant à naviguer sur ce site, vous acceptez 
                  l'utilisation de cookies.
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
