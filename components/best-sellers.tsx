import { SectionWrapper, JapaneseAccent } from "@/components/section-wrapper"
import { ProductCard } from "@/components/product-card"

const bestSellers = [
  { name: "Figurine Gojo Satoru Domaine Infini", price: "89,99", franchise: "Jujutsu Kaisen", badge: "BEST SELLER", badgeColor: "pink" as const, image: "/products/figurine-gojo.jpg" },
  { name: "Booster Box Pokemon Ecarlate et Violet", price: "189,99", franchise: "Pokemon", badge: "BEST SELLER", badgeColor: "pink" as const, image: "/products/booster-pokemon.jpg" },
  { name: "Figurine Luffy Gear 5 S.H.Figuarts", price: "149,99", franchise: "One Piece", badge: "BEST SELLER", badgeColor: "pink" as const, image: "/products/figurine-luffy.jpg" },
  { name: "Figurine Goku Ultra Instinct", price: "79,99", franchise: "Dragon Ball", badge: "BEST SELLER", badgeColor: "pink" as const, image: "/products/figurine-goku.jpg" },
  { name: "Nendoroid Tanjiro Kamado", price: "54,99", franchise: "Demon Slayer", badge: "BEST SELLER", badgeColor: "pink" as const, image: "/products/figurine-tanjiro.jpg" },
  { name: "Carte Ultra Rare Charizard VMAX", price: "29,99", franchise: "Pokemon", badge: "BEST SELLER", badgeColor: "pink" as const, image: "/products/card-pokemon-rare.jpg" },
  { name: "Figurine Deku Full Cowling Pop Up Parade", price: "39,99", franchise: "My Hero Academia", badge: "BEST SELLER", badgeColor: "pink" as const, image: "/products/figurine-deku.jpg" },
  { name: "Booster Box One Piece OP-09", price: "124,99", franchise: "One Piece Card Game", badge: "BEST SELLER", badgeColor: "pink" as const, image: "/products/booster-onepiece.jpg" },
]

export function BestSellers() {
  return (
    <SectionWrapper
      title="MEILLEURES VENTES"
      subtitle="Les produits les plus populaires"
      accent="yellow"
      withAsanoha
      id="best-sellers"
    >
      <JapaneseAccent text={"\u4EBA\u6C17"} className="-top-4 left-0 lg:left-12" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bestSellers.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </SectionWrapper>
  )
}
