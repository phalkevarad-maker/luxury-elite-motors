'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { CarCard } from "@/components/cars/CarCard"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { useCars, useDebounce } from "@/hooks"
import { useWishlistStore, useCompareStore } from "@/store"

export default function CarsPage() {
  const [filters, setFilters] = useState<any>({})
  const [showFilters, setShowFilters] = useState(false)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)
  const { cars, loading } = useCars({ ...filters, model: debouncedSearch })
  const { addItem, removeItem, isInWishlist } = useWishlistStore()
  const { addItem: addCompare, isInCompare } = useCompareStore()

  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container>
          <SectionTitle title="Our Collection" subtitle="Browse our exclusive inventory of luxury automobiles" />

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Search by model, brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </Button>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass rounded-xl p-6 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" value={filters.brand || ""} onChange={(e) => setFilters({ ...filters, brand: e.target.value })}>
                  <option value="">All Brands</option>
                  <option value="rolls-royce">Rolls Royce</option>
                  <option value="lamborghini">Lamborghini</option>
                  <option value="ferrari">Ferrari</option>
                  <option value="porsche">Porsche</option>
                  <option value="bentley">Bentley</option>
                </select>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" value={filters.fuelType || ""} onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}>
                  <option value="">Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="Diesel">Diesel</option>
                </select>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" value={filters.transmission || ""} onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}>
                  <option value="">Transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="DCT">DCT</option>
                  <option value="Manual">Manual</option>
                  <option value="PDK">PDK</option>
                </select>
                <input type="number" placeholder="Min Price" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" value={filters.minPrice || ""} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} />
                <input type="number" placeholder="Max Price" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" value={filters.maxPrice || ""} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
                <input type="number" placeholder="Min Horsepower" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" value={filters.minHorsepower || ""} onChange={(e) => setFilters({ ...filters, minHorsepower: e.target.value })} />
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
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
