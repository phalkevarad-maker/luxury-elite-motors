'use client'

import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Button } from "@/components/ui/Button"
import { Shield, CreditCard, Truck, HeadphonesIcon, CheckCircle } from "lucide-react"
import Link from "next/link"

export function FinanceOptions() {
  return (
    <Section className="bg-luxury-dark">
      <Container>
        <SectionTitle
          title="Premium Finance Options"
          subtitle="Flexible solutions tailored to your lifestyle"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Standard Financing", rate: "From 2.99% APR", term: "12-84 months", desc: "Competitive rates with quick approval" },
            { title: "Premium Lease", rate: "From 1.99% APR", term: "24-60 months", desc: "Lower monthly payments, upgrade sooner" },
            { title: "Cash Purchase", rate: "Best Value", term: "One-time payment", desc: "Exclusive perks for full payment" }
          ].map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 card-hover text-center"
            >
              <CreditCard className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-white mb-2">{plan.title}</h3>
              <p className="text-2xl font-bold text-gold mb-1">{plan.rate}</p>
              <p className="text-sm text-white/40 mb-4">{plan.term}</p>
              <p className="text-white/50 text-sm mb-6">{plan.desc}</p>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="w-full">Apply Now</Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function HomeDeliveryBanner() {
  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gold/20 via-gold/10 to-luxury-dark border border-gold/20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_70%)]" />
          <div className="relative p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <Truck className="w-12 h-12 text-gold mb-4 mx-auto lg:mx-0" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                White-Glove Home Delivery
              </h2>
              <p className="text-white/60 max-w-lg">
                Your vehicle delivered to your doorstep anywhere in the world. 
                Fully insured, enclosed transport with real-time tracking.
              </p>
              <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
                {["Free within 50 miles", "Express delivery available", "Fully insured"].map((feature) => (
                  <span key={feature} className="flex items-center gap-1.5 text-sm text-gold">
                    <CheckCircle className="w-4 h-4" /> {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href="/cars">
                <Button variant="gold" size="xl">
                  Schedule Delivery
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

export function NewsLetter() {
  return (
    <Section className="bg-luxury-dark">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <HeadphonesIcon className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Stay Connected
          </h2>
          <p className="text-white/50 mb-8">
            Subscribe to receive exclusive offers, new arrivals, and luxury automotive news.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
            />
            <Button variant="gold" size="lg">Subscribe</Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
