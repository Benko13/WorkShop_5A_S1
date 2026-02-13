import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AccountDashboard } from "@/components/account-dashboard"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <AccountDashboard />
      </main>
      <SiteFooter />
    </div>
  )
}
