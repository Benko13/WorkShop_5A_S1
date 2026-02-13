"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SectionWrapper, JapaneseAccent } from "@/components/section-wrapper"
import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
    console.log("Formulaire soumis:", formData)
    alert("Votre message a été envoyé ! Nous vous répondrons dans les plus brefs délais.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <SectionWrapper
          title="CONTACTEZ-NOUS"
          subtitle="Une question ? Nous sommes là pour vous aider"
          accent="pink"
          withAsanoha
        >
          <JapaneseAccent text="お問い合わせ" className="top-0 right-0 -z-10" />
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informations de contact */}
            <div className="space-y-6">
              <div className="bg-card border-4 border-border p-6">
                <h3 className="font-display text-xl text-cyber-yellow mb-4 uppercase">
                  Informations de contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-neon-pink mt-1 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:contact@artsetshop.fr"
                        className="text-off-white hover:text-neon-pink transition-colors"
                      >
                        contact@artsetshop.fr
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-neon-pink mt-1 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                        Téléphone
                      </p>
                      <p className="text-off-white">Disponible sur demande</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-neon-pink mt-1 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                        Adresse
                      </p>
                      <p className="text-off-white">France</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border-4 border-border p-6">
                <h3 className="font-display text-xl text-cyber-yellow mb-4 uppercase">
                  Horaires
                </h3>
                <div className="space-y-2 text-off-white">
                  <p>Lundi - Vendredi : 9h - 18h</p>
                  <p>Samedi : 10h - 16h</p>
                  <p>Dimanche : Fermé</p>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="bg-card border-4 border-border p-6">
              <h3 className="font-display text-xl text-cyber-yellow mb-6 uppercase">
                Envoyez-nous un message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-neon-pink text-primary-foreground border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <SiteFooter />
    </div>
  )
}
