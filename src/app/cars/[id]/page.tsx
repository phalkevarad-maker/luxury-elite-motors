'use client'

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Container, Section } from "@/components/ui/Section"
import { CarCard } from "@/components/cars/CarCard"
import { Heart, Share2, Download, GitCompare, Truck, Shield, CheckCircle, Star, ChevronLeft, ChevronRight, Gauge, Zap, Settings, Fuel, Timer, Cpu, Snowflake, Wifi, Volume2, Tv, Car as CarIcon } from "lucide-react"
import Link from "next/link"
import { formatPrice, calculateEMI } from "@/lib/utils"
import { useState } from "react"
import { useWishlistStore, useCompareStore, useRecentStore } from "@/store"

const sampleCar = {
  id: "1", slug: "rolls-royce-phantom", name: "Rolls Royce Phantom VIII", model: "Phantom VIII", year: 2024,
  price: 460000, originalPrice: 490000, currency: "USD",
  description: "The pinnacle of automotive luxury. The Rolls-Royce Phantom VIII represents the absolute finest expression of motoring artistry. Every surface, every stitch, every component is crafted to perfection by master artisans in Goodwood, England.",
  images: ["/images/cars/phantom.jpg", "/images/cars/phantom-2.jpg", "/images/cars/phantom-3.jpg"],
  interiorImages: ["/images/cars/phantom-int-1.jpg", "/images/cars/phantom-int-2.jpg"],
  exteriorImages: ["/images/cars/phantom-ext-1.jpg", "/images/cars/phantom-ext-2.jpg"],
  engine: "6.75L V12 Twin-Turbo", horsepower: 563, transmission: "8-Speed Automatic",
  mileage: 14, topSpeed: 155, acceleration: 5.1, fuelType: "Petrol",
  seatingCapacity: 5, bodyType: "Sedan", drivetrain: "RWD",
  colors: ["Black", "White", "Silver", "Gold", "Midnight Blue", "Burgundy"],
  safetyFeatures: ["ABS", "Airbags", "Lane Assist", "Night Vision", "360 Camera", "Adaptive Cruise"],
  warranty: "7 years / 100,000 miles", accessories: ["Umbrella Set", "Champagne Cooler", "Custom Floor Mats"],
  isCustomizable: true, availableUnits: 3, status: "AVAILABLE", vin: "RRP8M123456",
  brand: { id: "1", name: "Rolls Royce", slug: "rolls-royce", logo: "/images/brands/rolls-royce.png" }
}

export default function CarDetailPage() {
  const params = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState("exterior")
  const { addItem, removeItem, isInWishlist } = useWishlistStore()
  const { addItem: addCompare, isInCompare } = useCompareStore()
  const { addItem: addRecent } = useRecentStore()
  const [selectedColor, setSelectedColor] = useState(sampleCar.colors[0])

  const emi = calculateEMI(sampleCar.price, 3.99, 60)

  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden glass group">
                <Image
                  src={sampleCar.images[activeImage] || sampleCar.images[0]}
                  alt={sampleCar.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {sampleCar.isCustomizable && <Badge variant="gold">Customizable</Badge>}
                  <Badge variant="green">{sampleCar.status}</Badge>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button className="p-2 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-gold/80 transition-colors" onClick={() => isInWishlist(sampleCar.id) ? removeItem(sampleCar.id) : addItem(sampleCar.id)}>
                    <Heart className={`w-5 h-5 ${isInWishlist(sampleCar.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                  <button className="p-2 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-gold/80 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-gold/80 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {sampleCar.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {["exterior", "interior", "360"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? "bg-gold text-black" : "bg-white/5 text-white/60 hover:bg-white/10"}`}>
                    {tab === "360" ? "360° View" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Image src={sampleCar.brand.logo} alt={sampleCar.brand.name} width={24} height={24} className="rounded" />
                  <Link href={`/brands/${sampleCar.brand.slug}`} className="text-sm text-gold hover:underline">{sampleCar.brand.name}</Link>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">{sampleCar.name}</h1>
                <p className="text-white/40 text-lg mt-1">{sampleCar.model} · {sampleCar.year}</p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gold">{formatPrice(sampleCar.price)}</span>
                {sampleCar.originalPrice && (
                  <span className="text-lg text-white/40 line-through">{formatPrice(sampleCar.originalPrice)}</span>
                )}
                <Badge variant="green">Save {formatPrice(sampleCar.originalPrice! - sampleCar.price)}</Badge>
              </div>

              <p className="text-white/60 leading-relaxed">{sampleCar.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Gauge, label: "Engine", value: sampleCar.engine },
                  { icon: Zap, label: "Horsepower", value: `${sampleCar.horsepower} hp` },
                  { icon: Settings, label: "Transmission", value: sampleCar.transmission },
                  { icon: Timer, label: "0-60 mph", value: `${sampleCar.acceleration}s` },
                  { icon: Fuel, label: "Fuel Type", value: sampleCar.fuelType },
                  { icon: Cpu, label: "Top Speed", value: `${sampleCar.topSpeed} mph` },
                  { icon: CarIcon, label: "Mileage", value: `${sampleCar.mileage} MPG` },
                  { icon: Snowflake, label: "Drivetrain", value: sampleCar.drivetrain }
                ].map((spec) => (
                  <div key={spec.label} className="glass rounded-xl p-3 text-center">
                    <spec.icon className="w-4 h-4 text-gold mx-auto mb-1" />
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">{spec.label}</p>
                    <p className="text-xs font-semibold text-white mt-0.5">{spec.value}</p>
                  </div>
                ))}
              </div>

              {sampleCar.colors.length > 0 && (
                <div>
                  <p className="text-sm text-white/60 mb-2">Available Colors: <span className="text-white">{selectedColor}</span></p>
                  <div className="flex gap-2">
                    {sampleCar.colors.map((color) => (
                      <button key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? "border-gold scale-110" : "border-white/20"}`} style={{ backgroundColor: color.toLowerCase() }} title={color} />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 5 ? "fill-gold text-gold" : "text-white/20"}`} />
                ))}
                <span className="text-sm text-white/40 ml-2">5.0 (24 reviews)</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href={`/booking?car=${sampleCar.slug}`}>
                  <Button variant="gold" size="lg">Book Now</Button>
                </Link>
                <Link href={`/customization/${sampleCar.id}`}>
                  <Button variant="outline" size="lg">Customize</Button>
                </Link>
                <Button variant="secondary" size="lg" onClick={() => addCompare(sampleCar as any)}>
                  <GitCompare className="w-4 h-4" /> Compare
                </Button>
              </div>

              <div className="glass rounded-xl p-4 space-y-3">
                <h3 className="font-display font-bold text-white">EMI Calculator</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-white/40">Monthly EMI</p>
                    <p className="text-lg font-bold text-gold">${emi.emi.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Total Interest</p>
                    <p className="text-lg font-bold text-white">${emi.totalInterest.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Total Payment</p>
                    <p className="text-lg font-bold text-white">${emi.totalPayment.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-xs text-white/30 text-center">At 3.99% APR for 60 months</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[{ icon: Truck, label: "Home Delivery", desc: "White-glove service" }, { icon: Shield, label: "Warranty", desc: sampleCar.warranty }, { icon: CheckCircle, label: "Stock", desc: `${sampleCar.availableUnits} units available` }, { icon: CarIcon, label: "VIN", desc: sampleCar.vin! }].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 glass rounded-xl p-3">
                    <item.icon className="w-5 h-5 text-gold flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="bg-luxury-dark">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-display font-bold text-white mb-6">Safety Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sampleCar.safetyFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2 glass rounded-xl p-3">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  <span className="text-sm text-white/70">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
