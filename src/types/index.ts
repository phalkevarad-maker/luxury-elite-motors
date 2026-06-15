import { User } from "@prisma/client"

export type SafeUser = Omit<User, "password" | "createdAt" | "updatedAt">

export interface CarWithBrand {
  id: string
  brandId: string
  brand: { id: string; name: string; slug: string; logo?: string }
  name: string
  model: string
  slug: string
  year: number
  price: number
  originalPrice?: number
  currency: string
  description: string
  images: string[]
  interiorImages: string[]
  exteriorImages: string[]
  videoUrl?: string
  engine: string
  horsepower: number
  transmission: string
  mileage: number
  topSpeed: number
  acceleration: number
  fuelType: string
  seatingCapacity: number
  bodyType: string
  drivetrain: string
  colors: string[]
  safetyFeatures: string[]
  warranty?: string
  accessories: string[]
  isFeatured: boolean
  isTrending: boolean
  isNewArrival: boolean
  isLimitedEdition: boolean
  isCustomizable: boolean
  availableUnits: number
  bookedUnits: number
  soldUnits: number
  incomingStock: number
  warehouse?: string
  status: string
  vin?: string
  stockNumber?: string
  views: number
}

export interface BookingWithDetails {
  id: string
  bookingId: string
  userId: string
  user: SafeUser
  carId: string
  car: CarWithBrand
  color?: string
  variant?: string
  accessories: string[]
  deliveryDate?: string
  homeDelivery: boolean
  pickupLocation?: string
  deliveryAddress?: string
  advanceAmount?: number
  totalAmount: number
  status: string
  createdAt: string
  payment?: PaymentInfo
  delivery?: DeliveryInfo
}

export interface PaymentInfo {
  id: string
  amount: number
  currency: string
  method: string
  status: string
  transactionId?: string
  invoiceUrl?: string
  refundAmount?: number
  refundStatus?: string
  paidAt?: string
}

export interface DeliveryInfo {
  id: string
  address: string
  city: string
  state: string
  country: string
  pincode: string
  phone: string
  deliverySlot?: string
  estimatedDate?: string
  actualDate?: string
  status: string
  trackingNumber?: string
  carrier?: string
}

export interface DashboardStats {
  totalCars: number
  availableCars: number
  bookedCars: number
  soldCars: number
  totalRevenue: number
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  totalCustomers: number
  monthlySales: { month: string; sales: number }[]
  revenueData: { month: string; revenue: number }[]
  bestSellingCars: { name: string; sales: number }[]
}

export interface SearchFilters {
  brand?: string
  model?: string
  minPrice?: number
  maxPrice?: number
  year?: number
  fuelType?: string
  transmission?: string
  color?: string
  minHorsepower?: number
  seatingCapacity?: number
  bodyType?: string
  availability?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface CustomizationState {
  exteriorColor: string
  dualTonePaint: boolean
  bonnetFinish: string
  wheelDesign: string
  wheelSize: string
  tyreDesign: string
  spiritOfEcstasy: string
  interiorLeather: string
  woodFinish: string
  dashboard: string
  roofStarlight: boolean
  rearEntertainment: boolean
  champagneFridge: boolean
  umbrellaColor: string
  embroidery: string
  seatMassage: boolean
  seatCooling: boolean
  seatHeating: boolean
  headliner: string
  ambientLighting: string
  customNamePlate: string
  vipPackage: boolean
  securityPackage: boolean
  executivePackage: boolean
}
