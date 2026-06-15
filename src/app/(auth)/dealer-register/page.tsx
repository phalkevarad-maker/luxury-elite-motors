'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Container } from "@/components/ui/Section"
import { Shield, UserPlus } from "lucide-react"
import toast from "react-hot-toast"

export default function DealerRegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", dealerCode: "", dealerName: "", dealerContact: "", dealerAddress: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/auth/dealer-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      toast.success("Dealer account created! Please sign in.")
      router.push("/dealer-login")
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value })

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 relative">
      <div className="absolute inset-0 particle-bg" />
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
          <div className="glass rounded-2xl p-8 md:p-10 border border-gold/20">
            <div className="text-center mb-8">
              <Shield className="w-10 h-10 text-gold mx-auto mb-4" />
              <h1 className="text-2xl font-display font-bold text-white">Dealer Registration</h1>
              <p className="text-white/50 text-sm mt-1">Authorized dealership application</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Full Name" placeholder="John Dealer" value={form.name} onChange={update("name")} required />
              <Input label="Email" type="email" placeholder="dealer@dealership.com" value={form.email} onChange={update("email")} required />
              <Input label="Password" type="password" placeholder="Min 8 characters" value={form.password} onChange={update("password")} required />
              <Input label="Phone" placeholder="+1 234 567 890" value={form.phone} onChange={update("phone")} />
              <Input label="Dealer Code" type="password" placeholder="Enter dealer code to verify" value={form.dealerCode} onChange={update("dealerCode")} required />
              <Input label="Dealership Name" placeholder="Premium Auto Group" value={form.dealerName} onChange={update("dealerName")} />
              <Input label="Dealer Contact" placeholder="+1 234 567 891" value={form.dealerContact} onChange={update("dealerContact")} />
              <Input label="Dealer Address" placeholder="123 Dealership Drive" value={form.dealerAddress} onChange={update("dealerAddress")} />

              <Button type="submit" variant="gold" size="lg" className="w-full" loading={loading}>
                <UserPlus className="w-4 h-4" /> Register as Dealer
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-white/40">
              Already registered? <Link href="/dealer-login" className="text-gold hover:underline">Dealer Login</Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
