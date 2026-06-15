'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Container } from "@/components/ui/Section"
import { Car, UserPlus } from "lucide-react"
import toast from "react-hot-toast"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", address: "", city: "", state: "", country: "", pincode: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      toast.success("Account created! Please sign in.")
      router.push("/login")
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
          <div className="glass rounded-2xl p-8 md:p-10 border border-white/10">
            <div className="text-center mb-8">
              <Car className="w-10 h-10 text-gold mx-auto mb-4" />
              <h1 className="text-2xl font-display font-bold text-white">Create Account</h1>
              <p className="text-white/50 text-sm mt-1">Join the elite</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="John Doe" value={form.name} onChange={update("name")} required />
                <Input label="Email" type="email" placeholder="john@email.com" value={form.email} onChange={update("email")} required />
                <Input label="Phone" placeholder="+1 234 567 890" value={form.phone} onChange={update("phone")} />
                <Input label="Password" type="password" placeholder="Min 8 characters" value={form.password} onChange={update("password")} required />
              </div>
              <Input label="Address" placeholder="123 Luxury Ave" value={form.address} onChange={update("address")} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Input label="City" placeholder="Beverly Hills" value={form.city} onChange={update("city")} />
                <Input label="State" placeholder="California" value={form.state} onChange={update("state")} />
                <Input label="Country" placeholder="USA" value={form.country} onChange={update("country")} />
                <Input label="Pincode" placeholder="90210" value={form.pincode} onChange={update("pincode")} />
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full" loading={loading}>
                <UserPlus className="w-4 h-4" /> Create Account
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-white/40">
              Already have an account? <Link href="/login" className="text-gold hover:underline">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
