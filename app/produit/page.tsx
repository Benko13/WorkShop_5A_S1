import { redirect } from "next/navigation"
import { allProducts } from "@/lib/product-data"

// Redirection vers le premier produit par défaut (ou vers le catalogue)
export default function ProductPage() {
  // Rediriger vers le premier produit disponible
  const firstProduct = allProducts[0]
  if (firstProduct) {
    redirect(`/produit/${firstProduct.id}`)
  }
  // Sinon rediriger vers le catalogue
  redirect("/catalogue")
}
