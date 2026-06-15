'use client'

import { Container, Section, SectionTitle } from "@/components/ui/Section"

export default function TermsPage() {
  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container className="max-w-3xl">
          <SectionTitle title="Terms of Service" subtitle="Conditions governing the use of our services" className="text-left" />
          <div className="glass rounded-2xl p-8 space-y-6 text-white/60 text-sm leading-relaxed">
            <p>Last updated: January 1, 2025</p>
            <h3 className="text-white font-display font-bold text-lg">1. Acceptance of Terms</h3>
            <p>By accessing and using Luxury Elite Motors services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
            <h3 className="text-white font-display font-bold text-lg">2. Purchases & Payments</h3>
            <p>All purchases are subject to availability and confirmation. Payment must be received in full before vehicle delivery. We accept various payment methods as listed on our website.</p>
            <h3 className="text-white font-display font-bold text-lg">3. Shipping & Delivery</h3>
            <p>Delivery times are estimates and not guaranteed. Risk of loss passes to you upon delivery. International shipments may be subject to customs duties and taxes.</p>
            <h3 className="text-white font-display font-bold text-lg">4. Returns & Refunds</h3>
            <p>Our 7-day satisfaction guarantee applies to all vehicle purchases. Return shipping costs are the responsibility of the buyer unless the return is due to our error.</p>
            <h3 className="text-white font-display font-bold text-lg">5. Limitation of Liability</h3>
            <p>Luxury Elite Motors shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or products.</p>
          </div>
        </Container>
      </Section>
    </div>
  )
}
