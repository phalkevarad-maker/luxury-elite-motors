'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { User, Calendar, Heart, FileText, MapPin, Settings, LogOut, Car, CreditCard, Bell, MessageSquare, Package, Truck } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const dashboardLinks = [
  { href: "/dashboard/bookings", icon: Calendar, label: "My Bookings", count: "3" },
  { href: "/dashboard/wishlist", icon: Heart, label: "Wishlist", count: "5" },
  { href: "/dashboard/invoices", icon: FileText, label: "Invoices", count: "2" },
  { href: "/dashboard/addresses", icon: MapPin, label: "Saved Addresses", count: "2" },
  { href: "/dashboard/payments", icon: CreditCard, label: "Payment History", count: "4" },
  { href: "/dashboard/customizations", icon: Package, label: "Customizations", count: "1" },
  { href: "/dashboard/delivery", icon: Truck, label: "Delivery Tracking", count: "1" },
  { href: "/dashboard/notifications", icon: Bell, label: "Notifications", count: "3" },
  { href: "/dashboard/messages", icon: MessageSquare, label: "Messages", count: "2" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" }
]

export default function CustomerDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status, router])

  if (status === "loading") return <div className="pt-20 text-center text-white/50">Loading...</div>
  if (!session) return null

  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
              <User className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-white">Welcome, {session.user?.name}</h1>
              <p className="text-white/50 text-sm">{session.user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Car, label: "Total Orders", value: "3" },
              { icon: Truck, label: "Delivered", value: "1" },
              { icon: Calendar, label: "Pending", value: "2" },
              { icon: CreditCard, label: "Total Spent", value: "$690K" }
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center">
                <stat.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div whileHover={{ y: -2 }} className="glass rounded-xl p-4 card-hover flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <link.icon className="w-5 h-5 text-gold" />
                    <span className="text-sm font-medium text-white">{link.label}</span>
                  </div>
                  {link.count && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold">{link.count}</span>
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
