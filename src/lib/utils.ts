import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | string, currency = "USD"): string {
  const num = typeof price === "string" ? parseFloat(price) : price
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num)
}

export function generateBookingId(): string {
  const prefix = "LEM"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export function calculateEMI(
  principal: number,
  rate: number,
  tenure: number
): { emi: number; totalInterest: number; totalPayment: number } {
  const monthlyRate = rate / 12 / 100
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1)
  const totalPayment = emi * tenure
  const totalInterest = totalPayment - principal
  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment)
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + "..."
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date))
}

export const DEALER_CODE = "varad.2345"

export const LUXURY_BRANDS = [
  { name: "Rolls Royce", slug: "rolls-royce", country: "UK", founded: 1904 },
  { name: "Lamborghini", slug: "lamborghini", country: "Italy", founded: 1963 },
  { name: "Ferrari", slug: "ferrari", country: "Italy", founded: 1939 },
  { name: "Porsche", slug: "porsche", country: "Germany", founded: 1931 },
  { name: "Bentley", slug: "bentley", country: "UK", founded: 1919 },
  { name: "Mercedes Maybach", slug: "mercedes-maybach", country: "Germany", founded: 1921 },
  { name: "Bugatti", slug: "bugatti", country: "France", founded: 1909 },
  { name: "McLaren", slug: "mclaren", country: "UK", founded: 1963 },
  { name: "Aston Martin", slug: "aston-martin", country: "UK", founded: 1913 },
  { name: "BMW M", slug: "bmw-m", country: "Germany", founded: 1972 },
  { name: "Audi RS", slug: "audi-rs", country: "Germany", founded: 1994 }
]
