'use client'

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { CarCard } from "@/components/cars/CarCard"
import { Button } from "@/components/ui/Button"
import { useCars } from "@/hooks"
import { useWishlistStore, useCompareStore } from "@/store"
import { LUXURY_BRANDS } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BrandPage() {
  const params = useParams()
  const brand = LUXURY_BRANDS.find(b => b.slug === params.slug)
  const { cars, loading } = useCars({ brand: params.slug as string })
  const { addItem, removeItem, isInWishlist } = useWishlistStore()
  const { addItem: addCompare, isInCompare } = useCompareStore()

  if (!brand) return <div className="pt-20 text-center text-white/50">Brand not found</div>

  return (
    <div className="pt-20">
      <Section className="relative !pt-8">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <Container className="relative">
          <Link href="/cars" className="inline-flex items-center gap-2 text-white/50 hover:text-gold transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Inventory
          </Link>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center p-4">
              <Image src={`/images/brands/${brand.slug}.png`} alt={brand.name} width={80} height={80} className="object-contain" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white">{brand.name}</h1>
              <p className="text-white/50">{brand.country} · Founded {brand.founded}</p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass rounded-2xl h-[400px] animate-pulse">
                  <div className="h-56 bg-white/5 rounded-t-2xl" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-white/5 rounded w-3/4" />
                    <div className="h-4 bg-white/5 rounded w-1/2" />
                    <div className="h-8 bg-white/5 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cars.map((car: any) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isInWishlist={isInWishlist(car.id)}
                  onWishlist={() => isInWishlist(car.id) ? removeItem(car.id) : addItem(car.id)}
                  isInCompare={isInCompare(car.id)}
                  onCompare={() => addCompare(car)}
                />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </div>
  )
}
