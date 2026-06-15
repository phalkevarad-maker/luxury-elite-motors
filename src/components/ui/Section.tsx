'use client'

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  dark?: boolean
  gold?: boolean
}

export function Section({ children, className, id, dark, gold }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 md:py-24 overflow-hidden",
        dark && "bg-luxury-black",
        gold && "bg-gradient-to-b from-luxury-black to-luxury-dark",
        className
      )}
    >
      {children}
    </section>
  )
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("container px-4 md:px-6 mx-auto max-w-7xl", className)}>
      {children}
    </div>
  )
}

export function SectionTitle({
  title,
  subtitle,
  center = true,
  gold = false,
  className
}: {
  title: string
  subtitle?: string
  center?: boolean
  gold?: boolean
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-12 md:mb-16",
        center && "text-center",
        className
      )}
    >
      <h2 className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4",
        gold ? "text-gradient" : "text-white"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-body">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
