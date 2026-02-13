import type { Metadata } from "next"
import { CheckoutFlow } from "@/components/checkout-flow"

export const metadata: Metadata = {
  title: "Paiement Securise | ARTS ET SHOP",
  description:
    "Finalisez votre commande en toute securite. Paiement par Carte Bancaire ou PayPal. Livraison en France metropolitaine.",
}

export default function CheckoutPage() {
  return <CheckoutFlow />
}
