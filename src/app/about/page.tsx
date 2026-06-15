'use client'

import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Car, Shield, Star, Award, Users, Globe } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default function AboutPage() {
  const stats = [
    { icon: Car, value: "500+", label: "Vehicles Sold" },
    { icon: Users, value: "1000+", label: "Happy Clients" },
    { icon: Star, value: "5.0", label: "Average Rating" },
    { icon: Globe, value: "30+", label: "Countries Served" }
  ]

  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container>
          <SectionTitle title="About Luxury Elite Motors" subtitle="Redefining automotive excellence since 2010" />

          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-white/60 leading-relaxed">
              Luxury Elite Motors was founded with a singular vision: to provide the world's most discerning clientele 
              with access to the finest automotive masterpieces. From our flagship showroom on Rodeo Drive to our 
              global delivery network, we represent the pinnacle of luxury automotive retail.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 text-center">
                <stat.icon className="w-6 h-6 text-gold mx-auto mb-3" />
                <p className="text-3xl font-bold text-white font-display">{stat.value}</p>
                <p className="text-sm text-white/40">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Award, title: "Exclusive Partnerships", desc: "Direct partnerships with 11 luxury manufacturers ensure priority access to limited editions." },
              { icon: Shield, title: "Certified Excellence", desc: "Every vehicle undergoes a rigorous 300-point inspection and certification process." },
              { icon: Star, title: "Bespoke Services", desc: "From our Rolls Royce customization studio to white-glove delivery, every detail matters." },
              { icon: Users, title: "Dedicated Concierge", desc: "Your personal concierge is available 24/7 to assist with every aspect of your purchase." }
            ].map((item) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-6 card-hover">
                <item.icon className="w-8 h-8 text-gold mb-3" />
                <h3 className="font-display font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button variant="gold" size="xl">Contact Our Team</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
