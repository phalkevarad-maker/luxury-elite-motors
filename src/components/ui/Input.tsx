'use client'

import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function Input({ label, error, icon, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-white/80">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white/40">
            {icon}
          </div>
        )}
        <input
          className={cn(
            "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30",
            "focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30",
            "transition-all duration-200",
            icon && "pl-10",
            error && "border-red-500",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export function Select({ label, error, options, className, ...props }: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-white/80">{label}</label>
      )}
      <select
        className={cn(
          "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white",
          "focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30",
          "transition-all duration-200",
          error && "border-red-500",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-luxury-dark">{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}
