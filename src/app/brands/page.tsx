'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { LUXURY_BRANDS } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function BrandsPage() {
  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container>
          <SectionTitle
            title="Our Brands"
            subtitle="Exclusive partnerships with the world's finest automotive manufacturers"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LUXURY_BRANDS.map((brand, i) => (
              <motion.div
                key={brand.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/brands/${brand.slug}`}>
                  <div className="glass rounded-2xl p-6 card-hover group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl glass flex items-center justify-center p-3 group-hover:border-gold/50 transition-all">
                        <Image
                          src={`/images/brands/${brand.slug}.png`}
                          alt={brand.name}
                          width={60}
                          height={60}
                          className="object-contain grayscale group-hover:grayscale-0 transition-all"
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-white group-hover:text-gold transition-colors">
                          {brand.name}
                        </h3>
                        <p className="text-sm text-white/40">{brand.country} · Est. {brand.founded}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Explore Collection</span>
                      <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
