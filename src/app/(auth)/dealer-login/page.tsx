'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Container } from "@/components/ui/Section"
import { Car, Shield, Eye, EyeOff, LogIn } from "lucide-react"
import toast from "react-hot-toast"

export default function DealerLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: "", password: "", dealerCode: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        role: "DEALER",
        redirect: false
      })

      if (result?.error) {
        toast.error("Invalid credentials")
      } else {
        toast.success("Welcome Dealer!")
        router.push("/dealer-dashboard")
        router.refresh()
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 relative">
      <div className="absolute inset-0 particle-bg" />
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
          <div className="glass rounded-2xl p-8 md:p-10 border border-gold/20">
            <div className="text-center mb-8">
              <Shield className="w-10 h-10 text-gold mx-auto mb-4" />
              <h1 className="text-2xl font-display font-bold text-white">Dealer Login</h1>
              <p className="text-white/50 text-sm mt-1">Authorized dealer portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Email" type="email" placeholder="dealer@dealership.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <div className="relative">
                <Input label="Password" type={showPassword ? "text" : "password"} placeholder="Enter password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-white/40 hover:text-white">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Input label="Dealer Code" type="password" placeholder="Enter dealer code" value={form.dealerCode} onChange={(e) => setForm({ ...form, dealerCode: e.target.value })} required />

              <Button type="submit" variant="gold" size="lg" className="w-full" loading={loading}>
                <LogIn className="w-4 h-4" /> Sign In as Dealer
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-white/40">
              Not a dealer? <Link href="/login" className="text-gold hover:underline">Customer Login</Link>
            </p>
            <p className="mt-2 text-center text-sm text-white/40">
              New dealer? <Link href="/dealer-register" className="text-gold hover:underline">Register Here</Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
