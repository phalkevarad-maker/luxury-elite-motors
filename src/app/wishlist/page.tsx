'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { CarCard } from "@/components/cars/CarCard"
import { Button } from "@/components/ui/Button"
import { useWishlistStore, useCompareStore } from "@/store"
import { useCars } from "@/hooks"
import { Heart, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function WishlistPage() {
  const { items, removeItem, clear } = useWishlistStore()
  const { addItem: addCompare, isInCompare } = useCompareStore()
  const { cars } = useCars()
  const [wishlistCars, setWishlistCars] = useState<any[]>([])

  useEffect(() => {
    setWishlistCars(cars.filter((car: any) => items.includes(car.id)))
  }, [cars, items])

  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <SectionTitle
              title="My Wishlist"
              subtitle={`${items.length} saved vehicles`}
              className="!mb-0 text-left"
            />
            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clear}>
                <Trash2 className="w-4 h-4" /> Clear All
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50 text-lg mb-4">Your wishlist is empty</p>
              <Link href="/cars"><Button variant="gold">Browse Cars</Button></Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistCars.map((car: any) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isInWishlist={true}
                  onWishlist={() => removeItem(car.id)}
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
