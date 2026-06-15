'use client'

import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "gold" | "silver" | "red" | "green" | "blue"
  className?: string
}

export function Badge({ children, variant = "gold", className }: BadgeProps) {
  const variants = {
    gold: "bg-gold/20 text-gold border border-gold/30",
    silver: "bg-white/10 text-silver border border-white/20",
    red: "bg-red-500/20 text-red-400 border border-red-500/30",
    green: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    blue: "bg-blue-500/20 text-blue-400 border border-blue-500/30"
  }

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full",
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
