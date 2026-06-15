'use client'

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Button } from "@/components/ui/Button"
import { Input, Select } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { CheckCircle, Plus, ShoppingCart, Palette, Car, Star } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useCustomizationStore } from "@/store"
import toast from "react-hot-toast"

const colorOptions = ["#000000", "#1a1a2e", "#16213e", "#0f3460", "#d4af37", "#c0c0c0", "#ffffff", "#8b0000", "#00008b", "#006400"]
const wheelDesigns = ["Classic Spoke", "Turbine", "5-Spoke", "Black Edition", "Diamond Cut", "Forged"]
const wheelSizes = ["19 inch", "20 inch", "21 inch", "22 inch", "23 inch"]
const interiorLeathers = ["Black", "Tan", "Cream", "Red", "Blue", "Brown", "White", "Two-Tone"]
const woodFinishes = ["Piano Black", "Walnut", "Oak", "Carbon Fiber", "Rosewood", "Mahogany"]
const embroideryOptions = ["None", "Monogram", "Crest", "Custom Text", "Gold Thread"]

export default function CustomizationStudio() {
  const params = useParams()
  const router = useRouter()
  const { customization, setCustomization } = useCustomizationStore()
  const [step, setStep] = useState(1)

  const basePrice = 460000
  let additionalPrice = 0

  if (customization.dualTonePaint) additionalPrice += 25000
  if (customization.roofStarlight) additionalPrice += 15000
  if (customization.rearEntertainment) additionalPrice += 12000
  if (customization.champagneFridge) additionalPrice += 8000
  if (customization.seatMassage) additionalPrice += 5000
  if (customization.seatCooling) additionalPrice += 4000
  if (customization.seatHeating) additionalPrice += 3000
  if (customization.vipPackage) additionalPrice += 35000
  if (customization.securityPackage) additionalPrice += 20000
  if (customization.executivePackage) additionalPrice += 28000

  const totalPrice = basePrice + additionalPrice
  const estimatedDelivery = "12-16 weeks"

  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container>
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-gold" />
            <SectionTitle title="Rolls Royce Bespoke Studio" subtitle="Personalize every detail of your masterpiece" className="!mb-0 text-left" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold text-white mb-4">Exterior</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-white/60 mb-2">Exterior Color</p>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((color) => (
                        <button key={color} onClick={() => setCustomization({ exteriorColor: color })} className={`w-8 h-8 rounded-full border-2 transition-all ${customization.exteriorColor === color ? "border-gold scale-110" : "border-white/20"}`} style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={customization.dualTonePaint} onChange={(e) => setCustomization({ dualTonePaint: e.target.checked })} className="w-4 h-4 accent-gold" />
                    <label className="text-sm text-white">Dual Tone Paint (+$25,000)</label>
                  </div>
                  <Select label="Bonnet Finish" options={["Gloss", "Matte", "Satin", "Carbon Fiber"].map(v => ({ value: v, label: v }))} value={customization.bonnetFinish} onChange={(e) => setCustomization({ bonnetFinish: e.target.value })} />
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold text-white mb-4">Wheels & Spirit of Ecstasy</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select label="Wheel Design" options={wheelDesigns.map(v => ({ value: v, label: v }))} value={customization.wheelDesign} onChange={(e) => setCustomization({ wheelDesign: e.target.value })} />
                  <Select label="Wheel Size" options={wheelSizes.map(v => ({ value: v, label: v }))} value={customization.wheelSize} onChange={(e) => setCustomization({ wheelSize: e.target.value })} />
                  <Select label="Spirit of Ecstasy" options={["Chrome", "Gold", "Silver", "Black", "Illuminated"].map(v => ({ value: v, label: v }))} value={customization.spiritOfEcstasy} onChange={(e) => setCustomization({ spiritOfEcstasy: e.target.value })} />
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold text-white mb-4">Interior</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select label="Leather Color" options={interiorLeathers.map(v => ({ value: v, label: v }))} value={customization.interiorLeather} onChange={(e) => setCustomization({ interiorLeather: e.target.value })} />
                  <Select label="Wood Finish" options={woodFinishes.map(v => ({ value: v, label: v }))} value={customization.woodFinish} onChange={(e) => setCustomization({ woodFinish: e.target.value })} />
                  <Select label="Embroidery" options={embroideryOptions.map(v => ({ value: v, label: v }))} value={customization.embroidery} onChange={(e) => setCustomization({ embroidery: e.target.value })} />
                  <Select label="Headliner" options={["Standard", "Starlight Headliner", "Leather", "Alcantara"].map(v => ({ value: v, label: v }))} value={customization.headliner} onChange={(e) => setCustomization({ headliner: e.target.value })} />
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold text-white mb-4">Features & Packages</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: "roofStarlight", label: "Starlight Roof", price: "+$15,000" },
                    { key: "rearEntertainment", label: "Rear Entertainment", price: "+$12,000" },
                    { key: "champagneFridge", label: "Champagne Fridge", price: "+$8,000" },
                    { key: "seatMassage", label: "Seat Massage", price: "+$5,000" },
                    { key: "seatCooling", label: "Seat Cooling", price: "+$4,000" },
                    { key: "seatHeating", label: "Seat Heating", price: "+$3,000" },
                    { key: "vipPackage", label: "VIP Package", price: "+$35,000" },
                    { key: "securityPackage", label: "Security Package", price: "+$20,000" },
                    { key: "executivePackage", label: "Executive Package", price: "+$28,000" }
                  ].map((feature) => (
                    <button key={feature.key} onClick={() => setCustomization({ [feature.key]: !(customization as any)[feature.key] })} className={`flex items-center justify-between p-3 rounded-lg border transition-all ${(customization as any)[feature.key] ? "border-gold bg-gold/10" : "border-white/10"}`}>
                      <span className="text-sm text-white">{feature.label}</span>
                      <span className="text-[10px] text-gold">{feature.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold text-white mb-4">Personalization</h3>
                <Input label="Custom Name Plate" placeholder="Enter text for name plate" value={customization.customNamePlate} onChange={(e) => setCustomization({ customNamePlate: e.target.value })} />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-6 sticky top-24 space-y-4">
                <h3 className="font-display text-lg font-bold text-white">Your Configuration</h3>

                <div className="aspect-square rounded-xl bg-luxury-dark flex items-center justify-center border border-white/5">
                  <div className="text-center">
                    <Car className="w-16 h-16 text-gold/30 mx-auto mb-2" />
                    <p className="text-xs text-white/30">Premium Preview</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/50">Base Price</span>
                    <span className="text-white">{formatPrice(basePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Customizations</span>
                    <span className="text-gold">{formatPrice(additionalPrice)}</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 flex justify-between">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-xl font-bold text-gold">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-white/50">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  Est. Delivery: {estimatedDelivery}
                </div>

                <Button variant="gold" size="lg" className="w-full" onClick={() => { toast.success("Customization saved! Proceed to booking."); router.push(`/booking?car=${params.carId}`) }}>
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </Button>
                <Button variant="outline" size="sm" className="w-full" onClick={() => { useCustomizationStore.getState().resetCustomization(); toast.success("Reset to defaults") }}>
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
