'use client'

import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Card } from "@/components/ui/Card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

const faqs = [
  { q: "How do I book a test drive?", a: "You can book a test drive through any car detail page by clicking 'Book Test Drive'. Select your preferred date and time, and our concierge will confirm your appointment." },
  { q: "What financing options are available?", a: "We offer standard financing from 2.99% APR, premium leasing from 1.99% APR, and cash purchase options. All financing is subject to credit approval." },
  { q: "Can I customize my vehicle?", a: "Yes! Rolls Royce vehicles can be customized through our Bespoke Studio. Other brands offer select customization options. Visit the car detail page and click 'Customize'." },
  { q: "What is the delivery process?", a: "We offer white-glove home delivery for all vehicles. Your car will be delivered in an enclosed carrier, fully detailed, with a full orientation by our product specialist." },
  { q: "Do you offer international shipping?", a: "Yes, we ship vehicles worldwide. International shipping rates vary by destination. Contact our concierge team for a quote." },
  { q: "What warranty coverage is provided?", a: "All our vehicles come with a minimum 7-year/100,000-mile warranty. Extended warranty options are available for purchase." },
  { q: "Can I return my vehicle?", a: "We offer a 7-day satisfaction guarantee. If you're not completely satisfied, you may return the vehicle for a full refund within 7 days of delivery." },
  { q: "How do I track my delivery?", a: "Once your vehicle is shipped, you'll receive a tracking number via email and SMS. You can also track your delivery in real-time through our delivery portal." }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container className="max-w-3xl">
          <SectionTitle title="Frequently Asked Questions" subtitle="Everything you need to know about our services" />

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full glass rounded-xl p-4 text-left flex items-center justify-between group">
                  <span className="text-sm font-medium text-white group-hover:text-gold transition-colors">{faq.q}</span>
                  {openIndex === i ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
                </button>
                {openIndex === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-4 py-3">
                    <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
