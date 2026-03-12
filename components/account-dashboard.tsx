"use client"

import { useState, useRef, useEffect } from "react"
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
  Search,
  Camera,
  Pencil,
  ImagePlus,
  Store,
  ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionWrapper, JapaneseAccent } from "@/components/section-wrapper"

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
  condition: string
  conditionScore?: number
  notes?: string
  dateAdded: string
  imageData?: string
  photos?: string[]
  estimatedPrice?: number
}

function getCardPhotos(card: PokemonCard): string[] {
  if (card.photos?.length) return card.photos
  if (card.imageData) return [card.imageData]
  return []
}

const CONDITION_LEVELS = [
  { label: "Abîmée", min: 0, max: 20 },
  { label: "Usée", min: 21, max: 40 },
  { label: "Moyen", min: 41, max: 60 },
  { label: "Excellent", min: 61, max: 75 },
  { label: "Sortie de booster", min: 76, max: 90 },
  { label: "Gradé", min: 91, max: 100 },
] as const

function scoreToCondition(score: number): string {
  const n = Math.max(0, Math.min(100, Math.round(score)))
  const found = CONDITION_LEVELS.find((c) => n >= c.min && n <= c.max)
  return found?.label ?? "Moyen"
}

function conditionToScore(condition: string): number {
  const found = CONDITION_LEVELS.find((c) => c.label === condition)
  if (found) return Math.round((found.min + found.max) / 2)
  const legacy: Record<string, number> = {
    Parfait: 95,
    "Quasi neuf": 80,
    Excellent: 68,
    Bon: 50,
    Moyen: 50,
    Mint: 95,
    "Near Mint": 80,
  }
  return legacy[condition] ?? 50
}

function getConditionScore(card: { condition: string; conditionScore?: number }): number {
  if (card.conditionScore != null && card.conditionScore >= 0 && card.conditionScore <= 100) {
    return card.conditionScore
  }
  return conditionToScore(card.condition)
}

const CONDITION_MULTIPLIER: Record<string, number> = {
  Gradé: 1,
  "Sortie de booster": 0.95,
  Excellent: 0.85,
  Moyen: 0.6,
  Usée: 0.4,
  Abîmée: 0.2,
  Parfait: 1,
  "Quasi neuf": 0.85,
  Bon: 0.55,
  Mint: 1,
  "Near Mint": 0.85,
}

function estimateCardPrice(card: {
  name: string
  set: string
  number: string
  condition: string
}): number {
  const s = `${(card.name || "").toLowerCase()}|${(card.set || "").toLowerCase()}|${card.number || ""}`
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  const base = 0.5 + (h % 1000) / 1000 * (180 - 0.5)
  const mult = CONDITION_MULTIPLIER[card.condition] ?? 0.6
  return Math.round(base * mult * 100) / 100
}

function getDisplayEstimatedPrice(card: PokemonCard): number {
  return card.estimatedPrice ?? estimateCardPrice(card)
}

const CONDITION_LABELS: Record<string, string> = {
  Gradé: "Gradé",
  "Sortie de booster": "Sortie de booster",
  Excellent: "Excellent",
  Moyen: "Moyen",
  Usée: "Usée",
  Abîmée: "Abîmée",
  Parfait: "Gradé",
  "Quasi neuf": "Sortie de booster",
  Bon: "Moyen",
  Mint: "Gradé",
  "Near Mint": "Sortie de booster",
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
      const parsed = saved ? JSON.parse(saved) : []
      return parsed.map((c: PokemonCard) =>
        c.photos?.length ? c : { ...c, photos: c.imageData ? [c.imageData] : [] }
      )
    }
    return []
  })
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newCard, setNewCard] = useState<Partial<PokemonCard> & { photos: string[] }>({
    name: "",
    set: "",
    number: "",
    rarity: "",
    quantity: 1,
    condition: "Moyen",
    notes: "",
    photos: ["", ""],
  })

  const [showCameraModal, setShowCameraModal] = useState(false)
  const [cameraTargetSlot, setCameraTargetSlot] = useState<0 | 1 | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [cameraLoading, setCameraLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [editingCard, setEditingCard] = useState<PokemonCard | null>(null)
  const [viewingCard, setViewingCard] = useState<PokemonCard | null>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const addGalleryTargetRef = useRef<0 | 1 | null>(null)
  const editGalleryInputRef = useRef<HTMLInputElement>(null)
  const editGalleryTargetRef = useRef<0 | 1 | null>(null)

  // Sauvegarder dans localStorage et mettre à jour l'affichage
  const saveCards = (updatedCards: PokemonCard[]) => {
    const normalized = updatedCards.map((c) => ({
      ...c,
      photos: c.photos?.length ? c.photos : (c.imageData ? [c.imageData] : []),
    }))
    setCards(normalized)
    if (typeof window !== "undefined") {
      localStorage.setItem("pokemon-collection", JSON.stringify(normalized))
    }
  }

  useEffect(() => {
    if (!showCameraModal) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
      setCapturedImage(null)
      setCameraError(null)
      return
    }
    setCameraLoading(true)
    setCameraError(null)
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Votre navigateur ne supporte pas l'accès à la caméra.")
      setCameraLoading(false)
      return
    }
    const constraints: MediaStreamConstraints = {
      video: typeof window !== "undefined" && /iPhone|iPad|Android/i.test(navigator.userAgent)
        ? { facingMode: "environment" }
        : true,
    }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        streamRef.current = stream
        const video = videoRef.current
        if (video) {
          video.srcObject = stream
          const onReady = () => setCameraLoading(false)
          video.addEventListener("loadeddata", onReady, { once: true })
          video.addEventListener("error", onReady, { once: true })
          video.play().catch(() => setCameraLoading(false))
          setTimeout(onReady, 2000)
        } else {
          setCameraLoading(false)
        }
      })
      .catch((err) => {
        setCameraError(
          err.name === "NotAllowedError"
            ? "Accès à la caméra refusé. Autorisez l'accès dans les paramètres du navigateur."
            : "Impossible d'accéder à la caméra."
        )
        setCameraLoading(false)
      })
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }, [showCameraModal])

  const capturePhoto = () => {
    const video = videoRef.current
    const stream = streamRef.current
    if (!video || !stream) return
    let w = video.videoWidth
    let h = video.videoHeight
    if (!w || !h) {
      const track = stream.getVideoTracks()[0]
      const settings = track?.getSettings()
      if (settings?.width && settings?.height) {
        w = settings.width
        h = settings.height
      }
    }
    if (!w || !h) {
      if (video.readyState < 2) {
        video.addEventListener("loadeddata", capturePhoto, { once: true })
        return
      }
      return
    }
    const canvas = document.createElement("canvas")
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(video, 0, 0, w, h)
    setCapturedImage(canvas.toDataURL("image/jpeg", 0.85))
  }

  const usePhotoForNewCard = () => {
    if (capturedImage) {
      setNewCard((prev) => ({
        ...prev,
        photos: [capturedImage, prev.photos?.[1] ?? ""],
      }))
      setShowAddForm(true)
    }
    setShowCameraModal(false)
    setCameraTargetSlot(null)
    setCapturedImage(null)
  }

  const openCameraForSlot = (slot: 0 | 1) => {
    setCameraTargetSlot(slot)
    setShowCameraModal(true)
  }

  const handleCameraCaptureDone = () => {
    if (!capturedImage) return
    if (cameraTargetSlot !== null) {
      if (editingCard) {
        setEditingCard((prev) => {
          if (!prev) return null
          const p = [...getCardPhotos(prev)]
          while (p.length <= cameraTargetSlot) p.push("")
          p[cameraTargetSlot] = capturedImage
          return { ...prev, photos: p }
        })
      } else {
        setNewCard((prev) => {
          const p = [...(prev.photos ?? ["", ""])]
          while (p.length <= cameraTargetSlot) p.push("")
          p[cameraTargetSlot] = capturedImage
          return { ...prev, photos: p }
        })
      }
    }
    setShowCameraModal(false)
    setCameraTargetSlot(null)
    setCapturedImage(null)
  }

  const readFilesAsDataUrls = (files: FileList | null, callback: (urls: string[]) => void) => {
    if (!files?.length) return
    const urls: string[] = []
    let done = 0
    const total = Math.min(files.length, 10)
    for (let i = 0; i < total; i++) {
      const fr = new FileReader()
      fr.onload = () => {
        urls.push(fr.result as string)
        done++
        if (done === total) callback(urls)
      }
      fr.readAsDataURL(files[i])
    }
  }

  const handleAddGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetSlot = addGalleryTargetRef.current
    readFilesAsDataUrls(e.target.files, (urls) => {
      setNewCard((prev) => {
        const p = [...(prev.photos ?? ["", ""])]
        if (targetSlot === 0 || targetSlot === 1) {
          p[targetSlot] = urls[0] ?? ""
          if (urls[1]) p[targetSlot === 0 ? 1 : 0] = urls[1]
        } else {
          urls.slice(0, 2).forEach((url, i) => { p[i] = url })
        }
        return { ...prev, photos: p }
      })
    })
    addGalleryTargetRef.current = null
    e.target.value = ""
  }

  const handleEditGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = editGalleryTargetRef.current
    readFilesAsDataUrls(e.target.files, (urls) => {
      setEditingCard((prev) => {
        if (!prev) return null
        const p = [...getCardPhotos(prev)]
        if (target === 0 || target === 1) {
          while (p.length <= target) p.push("")
          p[target] = urls[0] ?? ""
          return { ...prev, photos: p }
        }
        urls.forEach((url) => p.push(url))
        return { ...prev, photos: p }
      })
    })
    editGalleryTargetRef.current = null
    e.target.value = ""
  }

  const addPhotoAsCardToClasseur = () => {
    if (!capturedImage) return
    setNewCard((prev) => ({
      ...prev,
      name: "Carte photographiée",
      set: "À compléter",
      number: "?",
      photos: [capturedImage, ""],
    }))
    setShowCameraModal(false)
    setCapturedImage(null)
    setCameraTargetSlot(null)
    setShowAddForm(true)
  }

  const handleAddCard = () => {
    const photos = (newCard.photos ?? []).filter(Boolean)
    if (!newCard.name || !newCard.set || !newCard.number || photos.length < 2) {
      return
    }

    const card: PokemonCard = {
      id: Date.now().toString(),
      name: newCard.name!,
      set: newCard.set!,
      number: newCard.number!,
      rarity: newCard.rarity || "Commune",
      quantity: newCard.quantity || 1,
      condition: newCard.condition || "Moyen",
      notes: newCard.notes || "",
      dateAdded: new Date().toISOString(),
      photos: (newCard.photos ?? []).filter(Boolean),
      conditionScore: getConditionScore({ condition: newCard.condition || "Moyen", conditionScore: newCard.conditionScore }),
      estimatedPrice: estimateCardPrice({
        name: newCard.name!,
        set: newCard.set!,
        number: newCard.number!,
        condition: newCard.condition || "Moyen",
      }),
    }

    saveCards([...cards, card])
    setNewCard({
      name: "",
      set: "",
      number: "",
      rarity: "",
      quantity: 1,
      condition: "Moyen",
      notes: "",
      photos: ["", ""],
    })
    setShowAddForm(false)
  }

  const handleDeleteCard = (id: string) => {
    saveCards(cards.filter((card) => card.id !== id))
  }

  const handleSellDirect = (card: PokemonCard) => {
    const totalEstimated = getDisplayEstimatedPrice(card) * card.quantity
    const amount = Math.round(totalEstimated * 0.5 * 100) / 100
    saveCards(cards.filter((c) => c.id !== card.id))
    alert(`Carte vendue à la boutique !\n\nMontant à créditer : ${amount.toFixed(2)} € (50 % du prix estimé de ${totalEstimated.toFixed(2)} €).\n\nVous serez crédité de ce montant au moment de la réception de la carte par notre équipe.`)
  }

  const getEbaySellUrl = (card: PokemonCard) => {
    const q = encodeURIComponent(`${card.name} ${card.set} Pokemon`)
    return `https://www.ebay.fr/sch/i.html?_nkw=${q}`
  }

  const getCardMarketSellUrl = (card: PokemonCard) => {
    const q = encodeURIComponent(card.name)
    return `https://www.cardmarket.com/fr/Pokemon/Products/Search?searchString=${q}`
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

  const handleSaveEdit = (updated: PokemonCard) => {
    const photos = getCardPhotos(updated).filter(Boolean)
    if (photos.length < 2) return
    const withPrice: PokemonCard = {
      ...updated,
      photos,
      estimatedPrice: estimateCardPrice({
        name: updated.name,
        set: updated.set,
        number: updated.number,
        condition: updated.condition,
      }),
    }
    saveCards(
      cards.map((card) => (card.id === withPrice.id ? withPrice : card))
    )
    setEditingCard(null)
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
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowCameraModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-transparent text-cyber-yellow border-2 border-cyber-yellow hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider"
          >
            <Camera className="w-4 h-4" />
            Prendre une photo
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-neon-pink text-primary-foreground border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            Ajouter une Carte
          </button>
        </div>
      </div>

      {showCameraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" role="dialog" aria-modal="true" aria-label="Prendre une photo de la carte">
          <div className="bg-card border-4 border-neon-pink p-6 max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display text-lg text-cyber-yellow uppercase flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Photo d&apos;une carte
              </h4>
              <button
                type="button"
                onClick={() => { setShowCameraModal(false); setCameraTargetSlot(null); setCapturedImage(null); }}
                className="p-1 text-muted-foreground hover:text-neon-pink transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Autorisez l&apos;accès à l&apos;appareil photo lorsque le navigateur le demande (idéal sur téléphone pour photographier une carte).
            </p>
            {cameraLoading && (
              <p className="py-8 text-center text-muted-foreground">Demande d&apos;accès à la caméra...</p>
            )}
            {cameraError && (
              <div className="py-4 px-4 bg-destructive/20 border-2 border-destructive text-destructive rounded text-sm">
                {cameraError}
              </div>
            )}
            {!cameraLoading && !cameraError && (
              <>
                {capturedImage ? (
                  <div className="space-y-4">
                    <img src={capturedImage} alt="Photo capturée" className="w-full rounded border-2 border-border" />
                    {cameraTargetSlot !== null ? (
                      <p className="text-sm text-muted-foreground">
                        Photo {cameraTargetSlot === 0 ? "recto" : "verso"} — validez pour l&apos;ajouter au formulaire.
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Il faut 2 photos minimum (recto + verso). Renseignez les détails puis ajoutez la photo verso dans le formulaire.
                      </p>
                    )}
                    <div className="flex flex-col gap-2">
                      {cameraTargetSlot !== null ? (
                        <>
                          <button
                            type="button"
                            onClick={handleCameraCaptureDone}
                            className="w-full px-4 py-3 bg-neon-pink text-primary-foreground border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-sm font-bold uppercase tracking-wider"
                          >
                            Utiliser cette photo
                          </button>
                          <button
                            type="button"
                            onClick={() => setCapturedImage(null)}
                            className="w-full px-4 py-2 bg-transparent text-muted-foreground border-2 border-border hover:border-neon-pink hover:text-neon-pink transition-all text-xs font-bold uppercase tracking-wider"
                          >
                            Reprendre la photo
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={addPhotoAsCardToClasseur}
                            className="w-full px-4 py-3 bg-neon-pink text-primary-foreground border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-sm font-bold uppercase tracking-wider"
                          >
                            Renseigner les détails (recto + verso requis)
                          </button>
                          <button
                            type="button"
                            onClick={() => setCapturedImage(null)}
                            className="w-full px-4 py-2 bg-transparent text-muted-foreground border-2 border-border hover:border-neon-pink hover:text-neon-pink transition-all text-xs font-bold uppercase tracking-wider"
                          >
                            Reprendre la photo
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] min-h-[240px] bg-deep-black rounded border-2 border-border overflow-hidden">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full min-h-[200px] object-cover"
                        style={{ display: "block" }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="w-full px-4 py-3 bg-cyber-yellow text-secondary-foreground border-2 border-border hover:opacity-90 transition-all text-sm font-bold uppercase tracking-wider"
                    >
                      Capturer la photo
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

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
          <p className="text-sm text-muted-foreground mb-4">
            Pour ajouter une carte au classeur, il faut <strong>2 photos minimum</strong> : une de la face <strong>recto</strong> et une de la face <strong>verso</strong>. Vous pouvez les prendre à la caméra ou les choisir depuis votre galerie.
          </p>
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleAddGallerySelect}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1].map((slot) => (
              <div key={slot} className="md:col-span-2 md:col-start-1">
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Photo {slot === 0 ? "recto" : "verso"} (face {slot === 0 ? "avant" : "arrière"}) *
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {(newCard.photos ?? ["", ""])[slot] ? (
                    <>
                      <img
                        src={(newCard.photos ?? ["", ""])[slot]}
                        alt={slot === 0 ? "Recto" : "Verso"}
                        className="h-24 w-auto rounded border-2 border-border object-cover"
                      />
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => openCameraForSlot(slot as 0 | 1)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent text-cyber-yellow border-2 border-cyber-yellow hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          Prendre une photo
                        </button>
                        <button
                          type="button"
                          onClick={() => { addGalleryTargetRef.current = slot as 0 | 1; galleryInputRef.current?.click(); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent text-neon-pink border-2 border-neon-pink hover:bg-neon-pink hover:text-primary-foreground transition-all text-xs font-bold uppercase tracking-wider"
                        >
                          <ImagePlus className="w-3.5 h-3.5" />
                          Galerie
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const p = [...(newCard.photos ?? ["", ""])]
                            p[slot] = ""
                            setNewCard({ ...newCard, photos: p })
                          }}
                          className="px-3 py-1.5 bg-transparent text-destructive border-2 border-destructive hover:bg-destructive hover:text-destructive-foreground transition-all text-xs font-bold uppercase tracking-wider"
                        >
                          Retirer
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => openCameraForSlot(slot as 0 | 1)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-transparent text-cyber-yellow border-2 border-cyber-yellow hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider"
                      >
                        <Camera className="w-4 h-4" />
                        Prendre une photo
                      </button>
                      <button
                        type="button"
                        onClick={() => { addGalleryTargetRef.current = slot as 0 | 1; galleryInputRef.current?.click(); }}
                        className="flex items-center gap-1.5 px-4 py-2 bg-transparent text-neon-pink border-2 border-neon-pink hover:bg-neon-pink hover:text-primary-foreground transition-all text-xs font-bold uppercase tracking-wider"
                      >
                        <ImagePlus className="w-4 h-4" />
                        Choisir depuis la galerie
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
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
              <p className="text-xs text-muted-foreground mb-2">
                Glissez la barre (0 = très abîmée, 100 = parfaite) ou choisissez un libellé ci-dessous. La catégorie se met à jour automatiquement.
              </p>
              <div className="space-y-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={getConditionScore({ condition: newCard.condition || "Moyen", conditionScore: newCard.conditionScore })}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    setNewCard({ ...newCard, conditionScore: v, condition: scoreToCondition(v) })
                  }}
                  className="w-full h-4 bg-input border-2 border-border rounded-full appearance-none cursor-grab active:cursor-grabbing [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyber-yellow [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-border [&::-webkit-slider-thumb]:cursor-grab [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-cyber-yellow [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-border [&::-moz-range-thumb]:cursor-grab"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span className="font-bold text-cyber-yellow">{getConditionScore({ condition: newCard.condition || "Moyen", conditionScore: newCard.conditionScore })} / 100</span>
                  <span>100</span>
                </div>
              </div>
              <select
                value={newCard.condition}
                onChange={(e) => {
                  const val = e.target.value
                  setNewCard({ ...newCard, condition: val, conditionScore: conditionToScore(val) })
                }}
                className="w-full mt-2 px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
              >
                {CONDITION_LEVELS.map((c) => (
                  <option key={c.label} value={c.label}>{c.label}</option>
                ))}
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
            {newCard.name?.trim() && newCard.set?.trim() && newCard.number?.trim() && (
              <div className="md:col-span-2 p-3 bg-cyber-yellow/20 border-2 border-cyber-yellow rounded">
                <span className="text-xs font-bold text-cyber-yellow uppercase tracking-wider">
                  Estimation de la carte :
                </span>{" "}
                <span className="font-bold text-cyber-yellow">
                  ~{estimateCardPrice({
                    name: newCard.name,
                    set: newCard.set,
                    number: newCard.number,
                    condition: newCard.condition || "Moyen",
                  }).toFixed(2)} €
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  Approximation selon le nom, la série, le numéro et l&apos;état (marché collection).
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAddCard}
              disabled={
                !newCard.name?.trim() ||
                !newCard.set?.trim() ||
                !newCard.number?.trim() ||
                (newCard.photos ?? []).filter(Boolean).length < 2
              }
              className="px-6 py-2 bg-neon-pink text-primary-foreground border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs font-bold uppercase tracking-wider"
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
          {((newCard.photos ?? []).filter(Boolean).length < 2 || !newCard.name?.trim() || !newCard.set?.trim() || !newCard.number?.trim()) && (
            <p className="text-xs text-muted-foreground mt-3">
              Pour activer &laquo; Ajouter au Classeur &raquo; : remplissez le <strong>nom</strong>, la <strong>série</strong>, le <strong>numéro</strong> et ajoutez <strong>2 photos</strong> (recto + verso).
            </p>
          )}
        </div>
      )}

      {editingCard && (
        <div className="mb-6 p-6 bg-muted/30 border-4 border-cyber-yellow">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display text-lg text-cyber-yellow uppercase flex items-center gap-2">
              <Pencil className="w-5 h-5" />
              Modifier la carte
            </h4>
            <button
              type="button"
              onClick={() => setEditingCard(null)}
              className="p-1 text-muted-foreground hover:text-neon-pink transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Vous pouvez modifier ou remplacer les photos (recto et verso). Au moins 2 photos sont requises.
          </p>
          <input
            ref={editGalleryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleEditGallerySelect}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1].map((slot) => {
              const editPhotos = getCardPhotos(editingCard)
              const slotUrl = editPhotos[slot] ?? ""
              return (
                <div key={slot} className="md:col-span-2 md:col-start-1">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Photo {slot === 0 ? "recto" : "verso"} *
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    {slotUrl ? (
                      <>
                        <img src={slotUrl} alt={slot === 0 ? "Recto" : "Verso"} className="h-24 w-auto rounded border-2 border-border object-cover" />
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => openCameraForSlot(slot as 0 | 1)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent text-cyber-yellow border-2 border-cyber-yellow hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            Remplacer (photo)
                          </button>
                          <button
                            type="button"
                            onClick={() => { editGalleryTargetRef.current = slot as 0 | 1; editGalleryInputRef.current?.click(); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent text-neon-pink border-2 border-neon-pink hover:bg-neon-pink hover:text-primary-foreground transition-all text-xs font-bold uppercase tracking-wider"
                          >
                            <ImagePlus className="w-3.5 h-3.5" />
                            Galerie
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const p = [...getCardPhotos(editingCard)]
                              while (p.length < 2) p.push("")
                              p[slot] = ""
                              setEditingCard({ ...editingCard, photos: p })
                            }}
                            className="px-3 py-1.5 bg-transparent text-destructive border-2 border-destructive hover:bg-destructive hover:text-destructive-foreground transition-all text-xs font-bold uppercase tracking-wider"
                          >
                            Retirer
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => openCameraForSlot(slot as 0 | 1)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-transparent text-cyber-yellow border-2 border-cyber-yellow hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider"
                        >
                          <Camera className="w-4 h-4" />
                          Prendre une photo
                        </button>
                        <button
                          type="button"
                          onClick={() => { editGalleryTargetRef.current = null; editGalleryInputRef.current?.click(); }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-transparent text-neon-pink border-2 border-neon-pink hover:bg-neon-pink hover:text-primary-foreground transition-all text-xs font-bold uppercase tracking-wider"
                        >
                          <ImagePlus className="w-4 h-4" />
                          Choisir depuis la galerie
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            {getCardPhotos(editingCard).length > 2 && (
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Autres photos
                </label>
                <div className="flex flex-wrap gap-2">
                  {getCardPhotos(editingCard).slice(2).map((url, i) => (
                    <div key={i} className="relative">
                      <img src={url} alt="" className="h-20 w-auto rounded border border-border object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          const p = getCardPhotos(editingCard).filter((_, j) => j !== i + 2)
                          setEditingCard({ ...editingCard, photos: p })
                        }}
                        className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-destructive text-destructive-foreground rounded text-xs"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => { editGalleryTargetRef.current = null; editGalleryInputRef.current?.click(); }}
                  className="mt-2 flex items-center gap-1.5 px-3 py-1.5 bg-transparent text-muted-foreground border-2 border-border hover:border-neon-pink hover:text-neon-pink transition-all text-xs font-bold uppercase tracking-wider"
                >
                  <ImagePlus className="w-3.5 h-3.5" />
                  Ajouter une photo
                </button>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Nom de la Carte *
              </label>
              <input
                type="text"
                value={editingCard.name}
                onChange={(e) => setEditingCard({ ...editingCard, name: e.target.value })}
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
                value={editingCard.set}
                onChange={(e) => setEditingCard({ ...editingCard, set: e.target.value })}
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
                value={editingCard.number}
                onChange={(e) => setEditingCard({ ...editingCard, number: e.target.value })}
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
                placeholder="Ex: 173/198"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Quantité
              </label>
              <input
                type="number"
                min="1"
                value={editingCard.quantity}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, quantity: parseInt(e.target.value) || 1 })
                }
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                État
              </label>
              <p className="text-xs text-muted-foreground mb-2">
                Glissez la barre (0 = très abîmée, 100 = parfaite) ou choisissez un libellé ci-dessous.
              </p>
              <div className="space-y-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={getConditionScore(editingCard)}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    setEditingCard({ ...editingCard, conditionScore: v, condition: scoreToCondition(v) })
                  }}
                  className="w-full h-4 bg-input border-2 border-border rounded-full appearance-none cursor-grab active:cursor-grabbing [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyber-yellow [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-border [&::-webkit-slider-thumb]:cursor-grab [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-cyber-yellow [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-border [&::-moz-range-thumb]:cursor-grab"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span className="font-bold text-cyber-yellow">{getConditionScore(editingCard)} / 100</span>
                  <span>100</span>
                </div>
              </div>
              <select
                value={editingCard.condition}
                onChange={(e) => {
                  const val = e.target.value
                  setEditingCard({ ...editingCard, condition: val, conditionScore: conditionToScore(val) })
                }}
                className="w-full mt-2 px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
              >
                {CONDITION_LEVELS.map((c) => (
                  <option key={c.label} value={c.label}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Notes (optionnel)
              </label>
              <textarea
                value={editingCard.notes ?? ""}
                onChange={(e) => setEditingCard({ ...editingCard, notes: e.target.value })}
                className="w-full px-4 py-2 bg-input border-2 border-border text-off-white focus:border-neon-pink focus:outline-none transition-colors"
                rows={2}
                placeholder="Notes supplémentaires..."
              />
            </div>
            <div className="md:col-span-2 p-3 bg-cyber-yellow/20 border-2 border-cyber-yellow rounded">
              <span className="text-xs font-bold text-cyber-yellow uppercase tracking-wider">
                Estimation de la carte :
              </span>{" "}
              <span className="font-bold text-cyber-yellow">
                ~{estimateCardPrice({
                  name: editingCard.name,
                  set: editingCard.set,
                  number: editingCard.number,
                  condition: editingCard.condition,
                }).toFixed(2)} €
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Mise à jour selon l&apos;état et les infos saisies.
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={() => editingCard.name && editingCard.set && editingCard.number && getCardPhotos(editingCard).filter(Boolean).length >= 2 && handleSaveEdit(editingCard)}
              disabled={!editingCard.name?.trim() || !editingCard.set?.trim() || !editingCard.number?.trim() || getCardPhotos(editingCard).filter(Boolean).length < 2}
              className="px-6 py-2 bg-cyber-yellow text-secondary-foreground border-2 border-border hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs font-bold uppercase tracking-wider"
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => setEditingCard(null)}
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
                    État
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider border-r-4 border-border">
                    Quantité
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider border-r-4 border-border">
                    Estimation
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
                      <div className="flex items-center gap-3">
                        {getCardPhotos(card).length > 0 && (
                          <>
                            <img src={getCardPhotos(card)[0]} alt="" className="w-10 h-14 object-cover rounded border border-border flex-shrink-0" />
                            {getCardPhotos(card).length > 1 && (
                              <span className="text-[10px] text-muted-foreground font-bold">
                                {getCardPhotos(card).length} photos
                              </span>
                            )}
                          </>
                        )}
                        <div>
                          <div className="font-display font-bold">{card.name}</div>
                          {card.notes && (
                            <div className="text-xs text-muted-foreground mt-1">{card.notes}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-off-white border-r-4 border-border">
                      <div>{card.set}</div>
                      <div className="text-xs text-muted-foreground">#{card.number}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-off-white border-r-4 border-border">
                      {CONDITION_LABELS[card.condition] ?? card.condition}
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
                    <td className="px-4 py-4 text-sm border-r-4 border-border">
                      <span className="text-cyber-yellow font-bold">
                        ~{getDisplayEstimatedPrice(card).toFixed(2)} €
                      </span>
                      {card.quantity > 1 && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          total : {(getDisplayEstimatedPrice(card) * card.quantity).toFixed(2)} €
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button
                        onClick={() => setViewingCard(card)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-neon-pink text-primary-foreground border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Consulter
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

      {/* Fiche de la carte (modal) */}
      {viewingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" role="dialog" aria-modal="true" aria-label="Fiche de la carte">
          <div className="bg-card border-4 border-cyber-yellow p-6 max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display text-lg text-cyber-yellow uppercase">
                Fiche de la carte
              </h4>
              <button
                type="button"
                onClick={() => setViewingCard(null)}
                className="p-1 text-muted-foreground hover:text-neon-pink transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {getCardPhotos(viewingCard).length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {getCardPhotos(viewingCard).map((url, i) => (
                    <img key={i} src={url} alt="" className="h-32 w-auto rounded border-2 border-border object-cover flex-shrink-0" />
                  ))}
                </div>
              )}
              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Carte</div>
                <div className="font-display text-xl text-off-white">{viewingCard.name}</div>
                {viewingCard.notes && <div className="text-sm text-muted-foreground mt-1">{viewingCard.notes}</div>}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Série</div>
                  <div className="text-off-white">{viewingCard.set}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Numéro</div>
                  <div className="text-off-white">#{viewingCard.number}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">État</div>
                  <div className="text-off-white">{CONDITION_LABELS[viewingCard.condition] ?? viewingCard.condition}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Quantité</div>
                  <div className="text-off-white">{viewingCard.quantity}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Estimation</div>
                  <div className="text-cyber-yellow font-bold text-lg">
                    ~{getDisplayEstimatedPrice(viewingCard).toFixed(2)} €
                    {viewingCard.quantity > 1 && (
                      <span className="text-sm font-normal text-muted-foreground ml-2">
                        (total : {(getDisplayEstimatedPrice(viewingCard) * viewingCard.quantity).toFixed(2)} €)
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t-2 border-border space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</p>
                <button
                  type="button"
                  onClick={() => { handleSellDirect(viewingCard); setViewingCard(null) }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neon-pink text-primary-foreground border-2 border-border hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-sm font-bold uppercase tracking-wider"
                  title="Vendre à la boutique à 50 % du prix estimé"
                >
                  <Store className="w-5 h-5" />
                  Vendre directement à la boutique (50 % du prix estimé)
                </button>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCard({
                        ...viewingCard,
                        photos: (() => {
                          const p = getCardPhotos(viewingCard)
                          return p.length >= 2 ? p : [...p, "", ""].slice(0, 2)
                        })(),
                      });
                      setViewingCard(null);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-transparent text-cyber-yellow border-2 border-cyber-yellow hover:bg-cyber-yellow hover:text-secondary-foreground transition-all text-xs font-bold uppercase tracking-wider"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => { handleDeleteCard(viewingCard.id); setViewingCard(null) }}
                    className="px-3 py-2 bg-transparent text-destructive border-2 border-destructive hover:bg-destructive hover:text-destructive-foreground transition-all text-xs font-bold uppercase tracking-wider"
                  >
                    Supprimer
                  </button>
                  <a
                    href={getEbaySellUrl(viewingCard)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 bg-transparent text-off-white border-2 border-border hover:border-neon-pink hover:text-neon-pink transition-all text-xs font-bold uppercase tracking-wider"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Vendre sur eBay
                  </a>
                  <a
                    href={getCardMarketSellUrl(viewingCard)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 bg-transparent text-off-white border-2 border-border hover:border-neon-pink hover:text-neon-pink transition-all text-xs font-bold uppercase tracking-wider"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Vendre sur CardMarket
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingCard(null)}
                className="w-full mt-4 py-2 bg-transparent text-muted-foreground border-2 border-border hover:border-neon-pink hover:text-neon-pink transition-all text-xs font-bold uppercase tracking-wider"
              >
                Fermer
              </button>
            </div>
          </div>
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
                ~{cards
                  .reduce((sum, card) => sum + getDisplayEstimatedPrice(card) * card.quantity, 0)
                  .toFixed(2)} €
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Valeur estimée
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
