import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CarWithBrand, SearchFilters, CustomizationState } from '@/types'

interface WishlistStore {
  items: string[]
  addItem: (carId: string) => void
  removeItem: (carId: string) => void
  isInWishlist: (carId: string) => boolean
  clear: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (carId) => set((state) => ({
        items: state.items.includes(carId) ? state.items : [...state.items, carId]
      })),
      removeItem: (carId) => set((state) => ({
        items: state.items.filter((id) => id !== carId)
      })),
      isInWishlist: (carId) => get().items.includes(carId),
      clear: () => set({ items: [] })
    }),
    { name: 'wishlist-storage' }
  )
)

interface CompareStore {
  items: CarWithBrand[]
  addItem: (car: CarWithBrand) => void
  removeItem: (carId: string) => void
  clear: () => void
  isInCompare: (carId: string) => boolean
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (car) => set((state) => ({
        items: state.items.length < 4 && !state.items.find(c => c.id === car.id)
          ? [...state.items, car]
          : state.items
      })),
      removeItem: (carId) => set((state) => ({
        items: state.items.filter((c) => c.id !== carId)
      })),
      clear: () => set({ items: [] }),
      isInCompare: (carId) => get().items.some((c) => c.id === carId)
    }),
    { name: 'compare-storage' }
  )
)

interface FilterStore {
  filters: SearchFilters
  setFilters: (filters: Partial<SearchFilters>) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterStore>()((set) => ({
  filters: {},
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  resetFilters: () => set({ filters: {} })
}))

interface CustomizationStore {
  customization: Partial<CustomizationState>
  setCustomization: (updates: Partial<CustomizationState>) => void
  resetCustomization: () => void
}

export const useCustomizationStore = create<CustomizationStore>()(
  persist(
    (set) => ({
      customization: {
        exteriorColor: '#000000',
        dualTonePaint: false,
        bonnetFinish: 'Gloss',
        wheelDesign: 'Classic',
        wheelSize: '21 inch',
        tyreDesign: 'Standard',
        spiritOfEcstasy: 'Chrome',
        interiorLeather: 'Black',
        woodFinish: 'Piano Black',
        dashboard: 'Standard',
        roofStarlight: false,
        rearEntertainment: false,
        champagneFridge: false,
        umbrellaColor: 'Black',
        embroidery: 'None',
        seatMassage: false,
        seatCooling: false,
        seatHeating: false,
        headliner: 'Standard',
        ambientLighting: 'Warm White',
        customNamePlate: '',
        vipPackage: false,
        securityPackage: false,
        executivePackage: false
      },
      setCustomization: (updates) => set((state) => ({
        customization: { ...state.customization, ...updates }
      })),
      resetCustomization: () => set({
        customization: {
          exteriorColor: '#000000',
          dualTonePaint: false,
          bonnetFinish: 'Gloss',
          wheelDesign: 'Classic',
          wheelSize: '21 inch',
          tyreDesign: 'Standard',
          spiritOfEcstasy: 'Chrome',
          interiorLeather: 'Black',
          woodFinish: 'Piano Black',
          dashboard: 'Standard',
          roofStarlight: false,
          rearEntertainment: false,
          champagneFridge: false,
          umbrellaColor: 'Black',
          embroidery: 'None',
          seatMassage: false,
          seatCooling: false,
          seatHeating: false,
          headliner: 'Standard',
          ambientLighting: 'Warm White',
          customNamePlate: '',
          vipPackage: false,
          securityPackage: false,
          executivePackage: false
        }
      })
    }),
    { name: 'customization-storage' }
  )
)

interface RecentStore {
  items: string[]
  addItem: (carId: string) => void
}

export const useRecentStore = create<RecentStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (carId) => set((state) => {
        const filtered = state.items.filter(id => id !== carId)
        return { items: [carId, ...filtered].slice(0, 10) }
      })
    }),
    { name: 'recent-storage' }
  )
)
