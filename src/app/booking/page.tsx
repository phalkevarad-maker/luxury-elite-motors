'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Button } from "@/components/ui/Button"
import { Input, Select } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Calendar, Truck, MapPin, CreditCard, CheckCircle, ArrowRight, Car } from "lucide-react"
import toast from "react-hot-toast"
import { formatPrice } from "@/lib/utils"

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [bookingId, setBookingId] = useState("")
  const [form, setForm] = useState({
    car: searchParams.get("car") || "",
    color: "",
    variant: "",
    accessories: [] as string[],
    deliveryDate: "",
    homeDelivery: true,
    pickupLocation: "",
    deliveryAddress: "",
    advanceAmount: 50000
  })

  const colors = ["Black", "White", "Silver", "Gold", "Midnight Blue", "Burgundy"]
  const accessories = ["Umbrella Set", "Champagne Cooler", "Custom Floor Mats", "Car Cover", "Dash Camera"]
  const variants = ["Standard", "Premium", "Executive", "Black Badge"]

  const handleBooking = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setBookingId(data.bookingId)
      setStep(4)
      toast.success("Booking confirmed!")
    } catch {
      toast.error("Booking failed")
    } finally {
      setLoading(false)
    }
  }

  const update = (field: string, value: any) => setForm({ ...form, [field]: value })

  const toggleAccessory = (item: string) => {
    setForm({
      ...form,
      accessories: form.accessories.includes(item)
        ? form.accessories.filter(a => a !== item)
        : [...form.accessories, item]
    })
  }

  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container>
          <SectionTitle title="Book Your Luxury Vehicle" subtitle="Complete your purchase in four simple steps" />

          <div className="flex items-center justify-center gap-2 md:gap-4 mb-10">
            {["Select Options", "Delivery", "Payment", "Confirmation"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? "bg-gold text-black" : step === i + 1 ? "bg-gold/20 text-gold border border-gold" : "bg-white/5 text-white/30"}`}>
                  {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm hidden md:block ${step === i + 1 ? "text-gold" : "text-white/30"}`}>{label}</span>
                {i < 3 && <div className="w-8 h-px bg-white/10 mx-1" />}
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass rounded-xl p-6">
                  <h3 className="font-display text-lg font-bold text-white mb-4">Vehicle Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select label="Car Model" options={[{ value: "rolls-royce-phantom", label: "Rolls Royce Phantom" }, { value: "lamborghini-revuelto", label: "Lamborghini Revuelto" }, { value: "ferrari-sf90", label: "Ferrari SF90 Stradale" }, { value: "porsche-911-turbo-s", label: "Porsche 911 Turbo S" }]} value={form.car} onChange={(e) => update("car", e.target.value)} />
                    <Select label="Variant" options={variants.map(v => ({ value: v, label: v }))} value={form.variant} onChange={(e) => update("variant", e.target.value)} />
                    <Select label="Color" options={colors.map(c => ({ value: c, label: c }))} value={form.color} onChange={(e) => update("color", e.target.value)} />
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="font-display text-lg font-bold text-white mb-4">Accessories</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {accessories.map((item) => (
                      <button key={item} onClick={() => toggleAccessory(item)} className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${form.accessories.includes(item) ? "border-gold bg-gold/10 text-gold" : "border-white/10 text-white/50 hover:border-white/20"}`}>
                        <CheckCircle className={`w-4 h-4 ${form.accessories.includes(item) ? "text-gold" : "text-white/20"}`} />
                        <span className="text-sm">{item}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button variant="gold" size="lg" className="w-full" onClick={() => setStep(2)}>
                  Continue to Delivery <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass rounded-xl p-6">
                  <h3 className="font-display text-lg font-bold text-white mb-4">Delivery Options</h3>
                  <div className="flex gap-4 mb-6">
                    <button onClick={() => update("homeDelivery", true)} className={`flex-1 flex items-center gap-3 p-4 rounded-xl border transition-all ${form.homeDelivery ? "border-gold bg-gold/10" : "border-white/10"}`}>
                      <Truck className={`w-6 h-6 ${form.homeDelivery ? "text-gold" : "text-white/30"}`} />
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">Home Delivery</p>
                        <p className="text-xs text-white/40">White-glove service</p>
                      </div>
                    </button>
                    <button onClick={() => update("homeDelivery", false)} className={`flex-1 flex items-center gap-3 p-4 rounded-xl border transition-all ${!form.homeDelivery ? "border-gold bg-gold/10" : "border-white/10"}`}>
                      <MapPin className={`w-6 h-6 ${!form.homeDelivery ? "text-gold" : "text-white/30"}`} />
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">Pickup</p>
                        <p className="text-xs text-white/40">From showroom</p>
                      </div>
                    </button>
                  </div>

                  {form.homeDelivery ? (
                    <Input label="Delivery Address" placeholder="Enter your address" value={form.deliveryAddress} onChange={(e) => update("deliveryAddress", e.target.value)} />
                  ) : (
                    <Input label="Pickup Location" placeholder="Enter showroom location" value={form.pickupLocation} onChange={(e) => update("pickupLocation", e.target.value)} />
                  )}

                  <div className="mt-4">
                    <Input label="Preferred Delivery Date" type="date" value={form.deliveryDate} onChange={(e) => update("deliveryDate", e.target.value)} />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                  <Button variant="gold" size="lg" className="flex-1" onClick={() => setStep(3)}>
                    Continue to Payment <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass rounded-xl p-6">
                  <h3 className="font-display text-lg font-bold text-white mb-4">Payment</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Vehicle Price</span>
                      <span className="text-white font-medium">{formatPrice(460000)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Advance Amount (10%)</span>
                      <span className="text-gold font-medium">{formatPrice(46000)}</span>
                    </div>
                    <div className="border-t border-white/5 pt-3 flex justify-between">
                      <span className="text-white font-medium">Total Due Today</span>
                      <span className="text-xl font-bold text-gold">{formatPrice(46000)}</span>
                    </div>
                  </div>

                  <h4 className="text-sm font-medium text-white mb-3">Payment Method</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { name: "Stripe", icon: CreditCard },
                      { name: "Razorpay", icon: CreditCard },
                      { name: "PayPal", icon: CreditCard },
                      { name: "UPI", icon: CreditCard }
                    ].map((method) => (
                      <button key={method.name} className="glass rounded-xl p-3 text-center hover:border-gold/50 transition-all border border-white/10">
                        <method.icon className="w-5 h-5 text-gold mx-auto mb-1" />
                        <span className="text-xs text-white/60">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                  <Button variant="gold" size="lg" className="flex-1" loading={loading} onClick={handleBooking}>
                    Pay Advance & Book <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center glass rounded-2xl p-10">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-2xl font-display font-bold text-white mb-2">Booking Confirmed!</h2>
                <p className="text-white/50 mb-6">Your luxury vehicle has been booked successfully.</p>
                <div className="glass-dark rounded-xl p-6 mb-6 inline-block">
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-1">Booking ID</p>
                  <p className="text-2xl font-bold text-gold font-mono">{bookingId || "LEM-XK4P-7M2A"}</p>
                </div>
                <div className="space-y-2 text-sm text-white/50 mb-8">
                  <p>A confirmation email has been sent to your registered email.</p>
                  <p>Our concierge team will contact you within 24 hours.</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="gold" onClick={() => router.push("/dashboard")}>View Dashboard</Button>
                  <Button variant="outline" onClick={() => router.push("/")}>Back to Home</Button>
                </div>
              </motion.div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  )
}
