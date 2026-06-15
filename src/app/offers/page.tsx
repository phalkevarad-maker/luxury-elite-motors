'use client'

import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Gift, Clock, Tag } from "lucide-react"
import Link from "next/link"

const offers = [
  { title: "New Year, New Drive", discount: "15%", desc: "Special New Year offer on all Rolls Royce models", valid: "Jan 31, 2025", code: "NEWYEAR15" },
  { title: "Loyalty Reward", discount: "10%", desc: "Exclusive discount for returning customers", valid: "Mar 1, 2025", code: "LOYAL10" },
  { title: "First Purchase", discount: "5%", desc: "Welcome offer for first-time buyers", valid: "Ongoing", code: "WELCOME5" },
  { title: "Trade-In Bonus", discount: "$25K", desc: "Extra value when you trade in your current luxury vehicle", valid: "Feb 15, 2025", code: "TRADE25" }
]

export default function OffersPage() {
  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container>
          <SectionTitle title="Exclusive Offers" subtitle="Limited-time premium offers for our discerning clientele" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer, i) => (
              <motion.div key={offer.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="glass rounded-2xl p-6 card-hover border border-gold/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Gift className="w-5 h-5 text-gold" />
                      <Badge variant="gold">{offer.discount} OFF</Badge>
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-2">{offer.title}</h3>
                    <p className="text-sm text-white/50 mb-4">{offer.desc}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex items-center gap-1 text-xs text-white/30"><Clock className="w-3 h-3" /> Valid until {offer.valid}</span>
                      <span className="flex items-center gap-1 text-xs text-gold"><Tag className="w-3 h-3" /> {offer.code}</span>
                    </div>
                    <Button variant="gold" size="sm">Claim Offer</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
