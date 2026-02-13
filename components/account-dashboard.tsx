"use client"

import { useState } from "react"
import { 
  Package, 
  Heart, 
  MapPin, 
  User, 
  Eye,
  Calendar,
  CreditCard,
  BookOpen,
  Plus,
  X,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionWrapper, JapaneseAccent } from "@/components/section-wrapper"
import { rarities } from "@/lib/product-data"

type TabType = "orders" | "collection" | "addresses" | "account"

interface Order {
  id: string
  date: string
  total: string
  status: "Livré" | "En cours" | "En préparation" | "Annulé"
  items: number
}

interface WishlistItem {
  id: string
  name: string
  franchise: string
  price: string
  inStock: boolean
}

interface Address {
  id: string
  label: string
  name: string
  street: string
  city: string
  postalCode: string
  country: string
  isDefault: boolean
}

interface PokemonCard {
  id: string
  name: string
  set: string
  number: string
  rarity: string
  quantity: number
  condition: "Mint" | "Near Mint" | "Excellent" | "Bon" | "Moyen"
  notes?: string
  dateAdded: string
}

const mockOrders: Order[] = [
  {
    id: "CMD-2024-001234",
    date: "15/01/2024",
    total: "89.99",
    status: "Livré",
    items: 3,
  },
  {
    id: "CMD-2024-001189",
    date: "08/01/2024",
    total: "156.50",
    status: "Livré",
    items: 5,
  },
  {
    id: "CMD-2024-001145",
    date: "02/01/2024",
    total: "45.00",
    status: "En cours",
    items: 2,
  },
  {
    id: "CMD-2023-009876",
    date: "28/12/2023",
    total: "234.99",
    status: "Livré",
    items: 4,
  },
]

const mockWishlist: WishlistItem[] = [
  {
    id: "1",
    name: "Figurine Satoru Gojo Échelle 1/7",
    franchise: "Jujutsu Kaisen",
    price: "189.99",
    inStock: true,
  },
  {
    id: "2",
    name: "Booster Box One Piece Card Game",
    franchise: "One Piece",
    price: "89.99",
    inStock: true,
  },
  {
    id: "3",
    name: "Statuette Tanjiro Kamado Édition Limitée",
    franchise: "Demon Slayer",
    price: "249.99",
    inStock: false,
  },
  {
    id: "4",
    name: "Nendoroid Izuku Midoriya",
    franchise: "My Hero Academia",
    price: "54.99",
    inStock: true,
  },
]

const mockAddresses: Address[] = [
  {
    id: "1",
    label: "Domicile",
    name: "Jean Dupont",
    street: "42 Rue de la République",
    city: "Lyon",
    postalCode: "69002",
    country: "France",
    isDefault: true,
  },
  {
    id: "2",
    label: "Bureau",
    name: "Jean Dupont",
    street: "15 Avenue des Champs-Élysées",
    city: "Paris",
    postalCode: "75008",
    country: "France",
    isDefault: false,
  },
]

export function AccountDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("orders")

  const tabs = [
    { id: "orders" as TabType, label: "Mes Commandes", icon: Package },
    { id: "collection" as TabType, label: "Mon Classeur", icon: BookOpen },
    { id: "addresses" as TabType, label: "Mes Adresses", icon: MapPin },
    { id: "account" as TabType, label: "Informations du Compte", icon: User },
  ]

  return (
    <SectionWrapper
      title="MON COMPTE"
      subtitle="Gérez vos commandes, listes de souhaits et informations personnelles"
      accent="pink"
      withAsanoha
    >
      <JapaneseAccent text="アカウント" className="top-0 right-0 -z-10" />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="bg-card border-4 border-border p-2 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-bold uppercase tracking-wider transition-all border-2",
                    activeTab === tab.id
                      ? "bg-cyber-yellow text-secondary-foreground border-border"
                      : "bg-transparent text-off-white border-transparent hover:border-neon-pink hover:text-neon-pink"
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="leading-tight">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-card border-4 border-border p-6 lg:p-8">
            {activeTab === "orders" && <OrdersContent orders={mockOrders} />}
            {activeTab === "collection" && <CollectionContent />}
            {activeTab === "addresses" && <AddressesContent addresses={mockAddresses} />}
            {activeTab === "account" && <AccountContent />}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

function OrdersContent({ orders }: { orders: Order[] }) {
  return (
    <div>
      <h3 className="font-display text-2xl lg:text-3xl text-off-white mb-6 uppercase">
        Historique des Commandes
      </h3>
      
      {/* Table */}
      <div className="overflow-x-auto -mx-6 lg:-mx-8">
        <div className="inline-block min-w-full align-middle px-6 lg:px-8">
          <table className="min-w-full border-4 border-border">
            <thead>
              <tr className="bg-neon-pink">
                <th className="px-4 py-3 text-left text-xs font-bold text-primary-foreground uppercase tracking-wider border-r-4 border-border">
                  Numéro de Commande
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-primary-foreground uppercase tracking-wider border-r-4 border-border">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-primary-foreground uppercase tracking-wider border-r-4 border-border">
                  Articles
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-primary-foreground uppercase tracking-wider border-r-4 border-border">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-primary-foreground uppercase tracking-wider border-r-4 border-border">
                  Statut
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-primary-foreground uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-card">
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={cn(
                    "border-t-4 border-border",
                    index % 2 === 0 ? "bg-card" : "bg-muted/30"
                  )}
                >
                  <td className="px-4 py-4 text-sm font-mono text-off-white border-r-4 border-border">
                    {order.id}
                  </td>
                  <td className="px-4 py-4 text-sm text-off-white border-r-4 border-border">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyber-yellow" />
                      {order.date}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-off-white border-r-4 border-border">
                    {order.items} article{order.items > 1 ? "s" : ""}
                  </td>
                  <td className="px-4 py-4 text-sm font-bold text-neon-pink border-r-4 border-border">
                    <span className="text-cyber-yellow">&euro;</span>{order.total}
                  </td>
                  <td className="px-4 py-4 text-sm border-r-4 border-border">
                    <span
                      className={cn(
                        "inline-block px-2 py-1 text-xs font-bold uppercase tracking-wider border-2 border-border",
                        order.status === "Livré" && "bg-cyber-yellow text-secondary-foreground",
                        order.status === "En cours" && "bg-neon-pink text-primary-foreground",
                        order.status === "En préparation" && "bg-off-white text-deep-black",
                        order.status === "Annulé" && "bg-destructive text-destructive-foreground"
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-transparent text-neon-pink border-2 border-neon-pink hover:bg-neon-pink hover:text-primary-foreground transition-all text-xs font-bold uppercase tracking-wider">
                      <Eye className="w-3 h-3" />
                      Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {orders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Aucune commande pour le moment</p>
        </div>
      )}
    </div>
  )
}

function CollectionContent() {
  const [cards, setCards] = useState<PokemonCard[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pokemon-collection")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newCard, setNewCard] = useState<Partial<PokemonCard>>({
    name: "",
    set: "",
    number: "",
    rarity: "",
    quantity: 1,
    condition: "Near Mint",
    notes: "",
  })

  // Sauvegarder dans localStorage à chaque modification
  const saveCards = (updatedCards: PokemonCard[]) => {
    setCards(updatedCards)
    if (typeof window !== "undefined") {
      localStorage.setItem("pokemon-collection", JSON.stringify(updatedCards))
    }
  }

  const handleAddCard = () => {
    if (!newCard.name || !newCard.set || !newCard.number) {
      return
    }

    const card: PokemonCard = {
      id: Date.now().toString(),
      name: newCard.name!,
      set: newCard.set!,
      number: newCard.number!,
      rarity: newCard.rarity || "Commune",
      quantity: newCard.quantity || 1,
      condition: newCard.condition || "Near Mint",
      notes: newCard.notes || "",
      dateAdded: new Date().toISOString(),
    }

    saveCards([...cards, card])
    setNewCard({
      name: "",
      set: "",
      number: "",
      rarity: "",
      quantity: 1,
      condition: "Near Mint",
      notes: "",
    })
    setShowAddForm(false)
  }

  const handleDeleteCard = (id: string) => {
    saveCards(cards.filter((card) => card.id !== id))
  }

  const handleUpdateQuantity = (id: string, delta: number) => {
    saveCards(
      cards.map((card) =>
        card.id === id
          ? { ...card, quantity: Math.max(1, card.quantity + delta) }
          : card
      )
    )
  }

  const filteredCards = cards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.set.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.number.includes(searchTerm)
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="font-display text-2xl lg:text-3xl text-off-white uppercase">
          Mon Classeur Pokemon
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-neon-pink text-primary-foreground border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          Ajouter une Carte
        </button>
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="mb-6 p-6 bg-muted/30 border-4 border-neon-pink">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display text-lg text-cyber-yellow uppercase">
              Nouvelle Carte Pokemon
            </h4>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-1 text-muted-foreground hover:text-neon-pink transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Nom de la Carte *
              </label>
              <input
                type="text"
                value={newCard.name}
                onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
                placeholder="Ex: Pikachu VMAX"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Série *
              </label>
              <input
                type="text"
                value={newCard.set}
                onChange={(e) => setNewCard({ ...newCard, set: e.target.value })}
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
                placeholder="Ex: Écarlate et Violet"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Numéro *
              </label>
              <input
                type="text"
                value={newCard.number}
                onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
                placeholder="Ex: 173/198"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Rareté
              </label>
              <select
                value={newCard.rarity}
                onChange={(e) => setNewCard({ ...newCard, rarity: e.target.value })}
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
              >
                {rarities.map((rarity) => (
                  <option key={rarity} value={rarity}>
                    {rarity}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Quantité
              </label>
              <input
                type="number"
                min="1"
                value={newCard.quantity}
                onChange={(e) =>
                  setNewCard({ ...newCard, quantity: parseInt(e.target.value) || 1 })
                }
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                État
              </label>
              <select
                value={newCard.condition}
                onChange={(e) =>
                  setNewCard({ ...newCard, condition: e.target.value as PokemonCard["condition"] })
                }
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
              >
                <option value="Mint">Mint</option>
                <option value="Near Mint">Near Mint</option>
                <option value="Excellent">Excellent</option>
                <option value="Bon">Bon</option>
                <option value="Moyen">Moyen</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Notes (optionnel)
              </label>
              <textarea
                value={newCard.notes}
                onChange={(e) => setNewCard({ ...newCard, notes: e.target.value })}
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
                rows={2}
                placeholder="Notes supplémentaires..."
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAddCard}
              className="px-6 py-2 bg-neon-pink text-primary-foreground border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider"
            >
              Ajouter au Classeur
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 bg-transparent text-muted-foreground border-2 border-border hover:border-neon-pink hover:text-neon-pink transition-all text-xs font-bold uppercase tracking-wider"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Barre de recherche */}
      {cards.length > 0 && (
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une carte..."
              className="w-full pl-10 pr-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
            />
          </div>
        </div>
      )}

      {/* Liste des cartes */}
      {filteredCards.length > 0 ? (
        <div className="overflow-x-auto -mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle px-6 lg:px-8">
            <table className="min-w-full border-4 border-border">
              <thead>
                <tr className="bg-cyber-yellow">
                  <th className="px-4 py-3 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider border-r-4 border-border">
                    Carte
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider border-r-4 border-border">
                    Série / Numéro
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider border-r-4 border-border">
                    Rareté
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider border-r-4 border-border">
                    État
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider border-r-4 border-border">
                    Quantité
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card">
                {filteredCards.map((card, index) => (
                  <tr
                    key={card.id}
                    className={cn(
                      "border-t-4 border-border",
                      index % 2 === 0 ? "bg-card" : "bg-muted/30"
                    )}
                  >
                    <td className="px-4 py-4 text-sm text-off-white border-r-4 border-border">
                      <div className="font-display font-bold">{card.name}</div>
                      {card.notes && (
                        <div className="text-xs text-muted-foreground mt-1">{card.notes}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-off-white border-r-4 border-border">
                      <div>{card.set}</div>
                      <div className="text-xs text-muted-foreground">#{card.number}</div>
                    </td>
                    <td className="px-4 py-4 text-sm border-r-4 border-border">
                      <span className="inline-block px-2 py-1 text-xs font-bold uppercase tracking-wider border-2 border-border bg-neon-pink text-primary-foreground">
                        {card.rarity}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-off-white border-r-4 border-border">
                      {card.condition}
                    </td>
                    <td className="px-4 py-4 text-sm border-r-4 border-border">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(card.id, -1)}
                          className="w-6 h-6 flex items-center justify-center bg-transparent border-2 border-border text-off-white hover:border-neon-pink hover:text-neon-pink transition-all text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="text-off-white font-bold min-w-[2ch] text-center">
                          {card.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(card.id, 1)}
                          className="w-6 h-6 flex items-center justify-center bg-transparent border-2 border-border text-off-white hover:border-neon-pink hover:text-neon-pink transition-all text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="px-3 py-1.5 bg-transparent text-destructive border-2 border-destructive hover:bg-destructive hover:text-destructive-foreground transition-all text-xs font-bold uppercase tracking-wider"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-2">
            {searchTerm ? "Aucune carte trouvée" : "Votre classeur est vide"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 px-6 py-2 bg-neon-pink text-primary-foreground border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider"
            >
              Ajouter votre première carte
            </button>
          )}
        </div>
      )}

      {/* Statistiques */}
      {cards.length > 0 && (
        <div className="mt-6 p-4 bg-muted/30 border-4 border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-neon-pink">{cards.length}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Cartes Uniques
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyber-yellow">
                {cards.reduce((sum, card) => sum + card.quantity, 0)}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Total Cartes
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-neon-pink">
                {new Set(cards.map((c) => c.set)).size}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Séries
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyber-yellow">
                {new Set(cards.map((c) => c.rarity)).size}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Raretés
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AddressesContent({ addresses }: { addresses: Address[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-2xl lg:text-3xl text-off-white uppercase">
          Mes Adresses
        </h3>
        <button className="px-4 py-2 bg-neon-pink text-primary-foreground border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider">
          + Nouvelle Adresse
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={cn(
              "relative bg-muted/30 border-4 p-6",
              address.isDefault ? "border-neon-pink" : "border-border"
            )}
          >
            {address.isDefault && (
              <div className="absolute top-0 right-0 px-3 py-1 bg-neon-pink text-primary-foreground text-[10px] font-bold uppercase tracking-wider border-b-4 border-l-4 border-border">
                Par Défaut
              </div>
            )}
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-cyber-yellow" />
                <h4 className="font-display text-lg text-cyber-yellow uppercase">
                  {address.label}
                </h4>
              </div>
              <div className="text-sm text-off-white space-y-1">
                <p className="font-bold">{address.name}</p>
                <p>{address.street}</p>
                <p>
                  {address.postalCode} {address.city}
                </p>
                <p>{address.country}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-transparent text-neon-pink border-2 border-neon-pink hover:bg-neon-pink hover:text-primary-foreground transition-all text-xs font-bold uppercase tracking-wider">
                Modifier
              </button>
              <button className="flex-1 px-3 py-2 bg-transparent text-destructive border-2 border-destructive hover:bg-destructive hover:text-destructive-foreground transition-all text-xs font-bold uppercase tracking-wider">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AccountContent() {
  return (
    <div>
      <h3 className="font-display text-2xl lg:text-3xl text-off-white mb-6 uppercase">
        Informations du Compte
      </h3>
      
      <div className="space-y-8">
        {/* Personal Information */}
        <div className="border-4 border-border p-6 bg-muted/30">
          <h4 className="font-display text-lg text-cyber-yellow uppercase mb-4">
            Informations Personnelles
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Prénom
              </label>
              <input
                type="text"
                defaultValue="Jean"
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Nom
              </label>
              <input
                type="text"
                defaultValue="Dupont"
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="jean.dupont@example.fr"
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                defaultValue="+33 6 12 34 56 78"
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
              />
            </div>
          </div>
          <button className="mt-6 px-6 py-2 bg-neon-pink text-primary-foreground border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider">
            Enregistrer les Modifications
          </button>
        </div>
        
        {/* Password Change */}
        <div className="border-4 border-border p-6 bg-muted/30">
          <h4 className="font-display text-lg text-cyber-yellow uppercase mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Modifier le Mot de Passe
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Mot de Passe Actuel
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Nouveau Mot de Passe
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Confirmer le Nouveau Mot de Passe
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
              />
            </div>
          </div>
          <button className="mt-6 px-6 py-2 bg-neon-pink text-primary-foreground border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider">
            Changer le Mot de Passe
          </button>
        </div>
      </div>
    </div>
  )
}
