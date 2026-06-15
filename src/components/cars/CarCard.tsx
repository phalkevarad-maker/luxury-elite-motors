'use client'

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import { Heart, RefreshCw, Eye, Star, ChevronRight } from "lucide-react"
import { Button } from "./Button"
import { Badge } from "./Badge"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"

interface CarCardProps {
  car: {
    id: string
    slug: string
    name: string
    model: string
    year: number
    price: number
    originalPrice?: number
    images: string[]
    engine: string
    horsepower: number
    transmission: string
    fuelType: string
    mileage: number
    status: string
    isFeatured?: boolean
    isLimitedEdition?: boolean
    isTrending?: boolean
    isNewArrival?: boolean
    brand: { name: string; slug: string; logo?: string }
  }
  onWishlist?: () => void
  onCompare?: () => void
  isInWishlist?: boolean
  isInCompare?: boolean
}

export function CarCard({ car, onWishlist, onCompare, isInWishlist, isInCompare }: CarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative glass rounded-2xl overflow-hidden card-hover"
    >
      <Link href={`/cars/${car.slug}`}>
        <div className="relative h-56 overflow-hidden">
          <Image
            src={car.images[0] || "/images/cars/placeholder.jpg"}
            alt={car.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            {car.isFeatured && <Badge variant="gold">Featured</Badge>}
            {car.isLimitedEdition && <Badge variant="blue">Limited</Badge>}
            {car.isNewArrival && <Badge variant="green">New</Badge>}
            {car.status === "SOLD" && <Badge variant="red">Sold</Badge>}
          </div>
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.preventDefault(); onWishlist?.() }}
              className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-gold/80 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? "fill-red-500 text-red-500" : "text-white"}`} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); onCompare?.() }}
              className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-gold/80 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isInCompare ? "text-gold" : "text-white"}`} />
            </button>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            {car.brand.logo && (
              <Image src={car.brand.logo} alt={car.brand.name} width={24} height={24} className="rounded" />
            )}
            <span className="text-xs text-white/80">{car.brand.name}</span>
          </div>
        </div>
      </Link>

      <div className="p-5 space-y-3">
        <Link href={`/cars/${car.slug}`}>
          <h3 className="font-display text-xl font-bold text-white group-hover:text-gold transition-colors">
            {car.name}
          </h3>
          <p className="text-sm text-white/50">{car.model} {car.year}</p>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gold">{formatPrice(car.price)}</span>
            {car.originalPrice && (
              <span className="ml-2 text-sm text-white/40 line-through">{formatPrice(car.originalPrice)}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span className="text-sm text-white/60">4.9</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2 border-t border-white/5">
          <div className="text-center">
            <p className="text-xs text-white/40">Engine</p>
            <p className="text-sm font-medium text-white/80">{car.engine}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/40">Horsepower</p>
            <p className="text-sm font-medium text-white/80">{car.horsepower}hp</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/40">0-60</p>
            <p className="text-sm font-medium text-white/80">{car.mileage}s</p>
          </div>
        </div>

        <Link href={`/cars/${car.slug}`}>
          <Button variant="dark" size="sm" className="w-full group">
            View Details
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
