'use client'

import { Container, Section, SectionTitle } from "@/components/ui/Section"

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container className="max-w-3xl">
          <SectionTitle title="Privacy Policy" subtitle="How we protect and handle your information" className="text-left" />
          <div className="glass rounded-2xl p-8 space-y-6 text-white/60 text-sm leading-relaxed">
            <p>Last updated: January 1, 2025</p>
            <h3 className="text-white font-display font-bold text-lg">1. Information We Collect</h3>
            <p>We collect information you provide directly to us, including name, email address, phone number, shipping address, and payment information when you make a purchase or create an account.</p>
            <h3 className="text-white font-display font-bold text-lg">2. How We Use Your Information</h3>
            <p>We use the information we collect to process your orders, provide customer support, send you updates about your purchases, and improve our services.</p>
            <h3 className="text-white font-display font-bold text-lg">3. Data Security</h3>
            <p>We implement industry-standard security measures including encryption, secure socket layer technology, and regular security audits to protect your personal information.</p>
            <h3 className="text-white font-display font-bold text-lg">4. Third-Party Services</h3>
            <p>We may share your information with trusted third-party service providers for payment processing, shipping, and marketing purposes. All third parties are contractually obligated to protect your data.</p>
            <h3 className="text-white font-display font-bold text-lg">5. Your Rights</h3>
            <p>You have the right to access, correct, or delete your personal data at any time. Contact our privacy team at privacy@luxuryelitemotors.com for assistance.</p>
          </div>
        </Container>
      </Section>
    </div>
  )
}
