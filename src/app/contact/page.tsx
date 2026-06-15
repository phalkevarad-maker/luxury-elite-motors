'use client'

import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import toast from "react-hot-toast"

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Message sent! Our concierge will respond within 24 hours.")
  }

  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container>
          <SectionTitle title="Contact Our Concierge" subtitle="We're here to assist you 24 hours a day, 7 days a week" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="glass rounded-2xl p-8">
                <h3 className="font-display text-xl font-bold text-white mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" placeholder="John" required />
                    <Input label="Last Name" placeholder="Doe" required />
                  </div>
                  <Input label="Email" type="email" placeholder="john@example.com" required />
                  <Input label="Phone" placeholder="+1 234 567 890" />
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-white/80">Message</label>
                    <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 h-32" placeholder="How can we assist you?" />
                  </div>
                  <Button type="submit" variant="gold" size="lg" className="w-full">
                    <Send className="w-4 h-4" /> Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="glass rounded-xl p-6 flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gold mt-1" />
                <div>
                  <h4 className="font-medium text-white">Visit Our Showroom</h4>
                  <p className="text-sm text-white/50">444 Rodeo Drive<br />Beverly Hills, CA 90210<br />United States</p>
                </div>
              </div>
              <div className="glass rounded-xl p-6 flex items-start gap-4">
                <Phone className="w-5 h-5 text-gold mt-1" />
                <div>
                  <h4 className="font-medium text-white">Call Us</h4>
                  <p className="text-sm text-white/50">+1 (800) 589-2277<br />+1 (310) 555-0199</p>
                </div>
              </div>
              <div className="glass rounded-xl p-6 flex items-start gap-4">
                <Mail className="w-5 h-5 text-gold mt-1" />
                <div>
                  <h4 className="font-medium text-white">Email Us</h4>
                  <p className="text-sm text-white/50">concierge@luxuryelitemotors.com<br />support@luxuryelitemotors.com</p>
                </div>
              </div>
              <div className="glass rounded-xl p-6 flex items-start gap-4">
                <Clock className="w-5 h-5 text-gold mt-1" />
                <div>
                  <h4 className="font-medium text-white">Business Hours</h4>
                  <p className="text-sm text-white/50">Monday - Saturday: 9:00 AM - 8:00 PM<br />Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
