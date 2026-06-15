'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { CarCard } from "@/components/cars/CarCard"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useWishlistStore, useCompareStore } from "@/store"

const featuredCars = [
  {
    id: "1", slug: "rolls-royce-phantom", name: "Rolls Royce Phantom VIII", model: "Phantom VIII", year: 2024,
    price: 460000, images: ["/images/cars/phantom.jpg"], engine: "V12", horsepower: 563, transmission: "Automatic",
    mileage: 4.5, fuelType: "Petrol", status: "AVAILABLE", isFeatured: true,
    brand: { name: "Rolls Royce", slug: "rolls-royce", logo: "/images/brands/rolls-royce.png" }
  },
  {
    id: "2", slug: "lamborghini-revuelto", name: "Lamborghini Revuelto", model: "Revuelto", year: 2024,
    price: 608000, images: ["/images/cars/revuelto.jpg"], engine: "V12 Hybrid", horsepower: 1001, transmission: "DCT",
    mileage: 2.5, fuelType: "Hybrid", status: "AVAILABLE", isTrending: true,
    brand: { name: "Lamborghini", slug: "lamborghini", logo: "/images/brands/lamborghini.png" }
  },
  {
    id: "3", slug: "ferrari-sf90-stradale", name: "Ferrari SF90 Stradale", model: "SF90", year: 2024,
    price: 524000, images: ["/images/cars/sf90.jpg"], engine: "V8 Hybrid", horsepower: 986, transmission: "DCT",
    mileage: 2.5, fuelType: "Hybrid", status: "AVAILABLE", isNewArrival: true,
    brand: { name: "Ferrari", slug: "ferrari", logo: "/images/brands/ferrari.png" }
  },
  {
    id: "4", slug: "porsche-911-turbo-s", name: "Porsche 911 Turbo S", model: "992 Turbo S", year: 2024,
    price: 230000, images: ["/images/cars/911.jpg"], engine: "Flat-6", horsepower: 640, transmission: "PDK",
    mileage: 2.6, fuelType: "Petrol", status: "AVAILABLE", isTrending: true,
    brand: { name: "Porsche", slug: "porsche", logo: "/images/brands/porsche.png" }
  }
]

const brands = [
  { name: "Rolls Royce", slug: "rolls-royce", logo: "/images/brands/rolls-royce.png" },
  { name: "Lamborghini", slug: "lamborghini", logo: "/images/brands/lamborghini.png" },
  { name: "Ferrari", slug: "ferrari", logo: "/images/brands/ferrari.png" },
  { name: "Porsche", slug: "porsche", logo: "/images/brands/porsche.png" },
  { name: "Bentley", slug: "bentley", logo: "/images/brands/bentley.png" },
  { name: "Bugatti", slug: "bugatti", logo: "/images/brands/bugatti.png" },
  { name: "McLaren", slug: "mclaren", logo: "/images/brands/mclaren.png" },
  { name: "Aston Martin", slug: "aston-martin", logo: "/images/brands/aston-martin.png" },
  { name: "BMW M", slug: "bmw-m", logo: "/images/brands/bmw-m.png" },
  { name: "Audi RS", slug: "audi-rs", logo: "/images/brands/audi-rs.png" }
]

export function FeaturedCollections() {
  return (
    <Section className="bg-luxury-dark">
      <Container>
        <SectionTitle
          title="Featured Collections"
          subtitle="Curated masterpieces of automotive engineering"
          gold
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/cars">
            <Button variant="outline" size="lg">
              View All Vehicles <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}

export function BrandsCarousel() {
  return (
    <Section className="bg-luxury-black">
      <Container>
        <SectionTitle
          title="World's Finest Brands"
          subtitle="Exclusive partnerships with legendary manufacturers"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          <div className="flex gap-8 md:gap-12 items-center justify-center flex-wrap">
            {brands.map((brand) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center gap-2 p-4 group cursor-pointer"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full glass flex items-center justify-center p-3 group-hover:border-gold/50 transition-all border border-white/10">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={60}
                      height={60}
                      className="object-contain grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <span className="text-xs text-white/50 group-hover:text-gold transition-colors text-center font-medium">
                    {brand.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

export function WhyChooseUs() {
  const features = [
    { title: "Certified Pre-Owned", desc: "Every vehicle undergoes a 300-point inspection", icon: "✓" },
    { title: "Bespoke Customization", desc: "Personalize every detail to your taste", icon: "✦" },
    { title: "Global Delivery", desc: "White-glove delivery to your doorstep worldwide", icon: "🌍" },
    { title: "Premium Financing", desc: "Exclusive rates from 1.99% APR", icon: "💰" },
    { title: "Extended Warranty", desc: "Up to 7 years / 100,000 miles coverage", icon: "🛡️" },
    { title: "Concierge Service", desc: "24/7 personal assistant for all your needs", icon: "👑" }
  ]

  return (
    <Section className="relative">
      <div className="absolute inset-0 particle-bg" />
      <Container className="relative">
        <SectionTitle
          title="Why Choose Us"
          subtitle="Experience unparalleled luxury service"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 card-hover text-center"
            >
              <span className="text-3xl mb-4 block">{feature.icon}</span>
              <h3 className="font-display text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function CustomerReviews() {
  const reviews = [
    { name: "James Whitfield", car: "Rolls Royce Phantom", rating: 5, text: "An extraordinary experience from start to finish. The customization studio is unparalleled." },
    { name: "Sarah Kensington", car: "Lamborghini Revuelto", rating: 5, text: "They made my dream of owning a Lamborghini a reality. The financing process was seamless." },
    { name: "Michael Chen", car: "Ferrari SF90", rating: 5, text: "White-glove service at every step. My SF90 arrived in a enclosed carrier with a full detail." }
  ]

  return (
    <Section className="bg-luxury-dark">
      <Container>
        <SectionTitle
          title="What Our Clients Say"
          subtitle="Trusted by discerning clientele worldwide"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                  {review.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{review.name}</p>
                  <p className="text-xs text-white/40">{review.car}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function Star(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
