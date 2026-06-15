'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Container, Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Shield, Users, Car, Settings, Database, Download, Upload, Sun, Moon, Tag, Gift, TrendingUp, Activity } from "lucide-react"
import toast from "react-hot-toast"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
    else if (session && (session.user as any).role !== "ADMIN") router.push("/dashboard")
  }, [session, status, router])

  if (status === "loading" || !session) return <div className="pt-20 text-center text-white/50">Loading...</div>

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "users", label: "Manage Users", icon: Users },
    { id: "dealers", label: "Manage Dealers", icon: Shield },
    { id: "cars", label: "Manage Cars", icon: Car },
    { id: "payments", label: "Payments", icon: TrendingUp },
    { id: "coupons", label: "Coupons", icon: Tag },
    { id: "offers", label: "Offers", icon: Gift },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "database", label: "Database", icon: Database }
  ]

  return (
    <div className="pt-16 min-h-screen bg-luxury-black">
      <div className="border-b border-white/5 bg-luxury-dark/50 backdrop-blur-xl">
        <Container className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.id ? "text-gold border-gold" : "text-white/50 border-transparent hover:text-white/80"}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </Container>
      </div>

      <Section className="!pt-6">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-white">Admin Panel</h1>
              <p className="text-white/50 text-sm">System administration & configuration</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Sun className="w-4 h-4" /> Light</Button>
              <Button variant="gold" size="sm"><Moon className="w-4 h-4" /> Dark</Button>
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Users, label: "Total Users", value: "156", color: "text-blue-400" },
                { icon: Shield, label: "Dealers", value: "8", color: "text-gold" },
                { icon: Car, label: "Listed Cars", value: "45", color: "text-green-400" },
                { icon: TrendingUp, label: "Total Revenue", value: "$8.2M", color: "text-purple-400" }
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-6 text-center">
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-3`} />
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "database" && (
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-display font-bold text-white">Database Management</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline"><Download className="w-4 h-4" /> Backup Database</Button>
                <Button variant="outline"><Upload className="w-4 h-4" /> Restore Database</Button>
                <Button variant="gold"><Activity className="w-4 h-4" /> Run Migration</Button>
              </div>
            </div>
          )}

          {activeTab === "coupons" && (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-white">Coupon Management</h3>
                <Button variant="gold" size="sm"><Tag className="w-4 h-4" /> Add Coupon</Button>
              </div>
              <p className="text-white/50 text-sm">Create and manage discount coupons for customers.</p>
            </div>
          )}

          {activeTab === "offers" && (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-white">Offer Management</h3>
                <Button variant="gold" size="sm"><Gift className="w-4 h-4" /> Create Offer</Button>
              </div>
              <p className="text-white/50 text-sm">Manage promotional offers and seasonal campaigns.</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-display font-bold text-white">System Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Site Name" placeholder="Luxury Elite Motors" />
                <Input label="Support Email" placeholder="support@luxuryelitemotors.com" />
                <Input label="Currency" placeholder="USD" />
                <Input label="Tax Rate (%)" placeholder="8.5" />
              </div>
              <Button variant="gold">Save Settings</Button>
            </div>
          )}

          {["users", "dealers", "cars", "payments"].includes(activeTab) && (
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-bold text-white capitalize mb-4">{activeTab.replace("-", " ")} Management</h3>
              <p className="text-white/50 text-sm">Full CRUD interface for managing {activeTab}.</p>
            </div>
          )}
        </Container>
      </Section>
    </div>
  )
}
