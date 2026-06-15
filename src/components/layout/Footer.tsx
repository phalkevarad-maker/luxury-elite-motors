'use client'

import Link from "next/link"
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"
import { Container } from "@/components/ui/Section"

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
    { href: "/blog", label: "Blog" }
  ],
  vehicles: [
    { href: "/brands/rolls-royce", label: "Rolls Royce" },
    { href: "/brands/lamborghini", label: "Lamborghini" },
    { href: "/brands/ferrari", label: "Ferrari" },
    { href: "/brands/porsche", label: "Porsche" },
    { href: "/brands/bentley", label: "Bentley" }
  ],
  support: [
    { href: "/faq", label: "FAQ" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/delivery", label: "Delivery Info" },
    { href: "/returns", label: "Returns & Refunds" }
  ],
  services: [
    { href: "/customization", label: "Customization Studio" },
    { href: "/finance", label: "Finance Options" },
    { href: "/trade-in", label: "Trade-In" },
    { href: "/insurance", label: "Insurance" },
    { href: "/shipping", label: "Shipping" }
  ]
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" }
]

export function Footer() {
  return (
    <footer className="relative bg-luxury-black border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-midnight/50 pointer-events-none" />

      <Container className="relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Car className="w-6 h-6 text-gold" />
              <span className="font-display text-xl font-bold">
                <span className="text-white">Luxury</span>
                <span className="text-gold"> Elite</span>
                <span className="text-white"> Motors</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              "Drive Beyond Luxury." Experience the pinnacle of automotive excellence with our curated collection of the world's finest luxury automobiles.
            </p>
            <div className="space-y-2 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                <span>Beverly Hills, California, USA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <span>+1 (800) LUX-CARS</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span>concierge@luxuryelitemotors.com</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-full bg-white/5 hover:bg-gold/20 text-white/50 hover:text-gold transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Luxury Elite Motors. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span>Premium Luxury Automobiles</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Drive Beyond Luxury</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
