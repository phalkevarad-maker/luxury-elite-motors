'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Container, Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Input, Select } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Plus, Edit2, Trash2, TrendingUp, Users, Car, DollarSign, ShoppingCart, Package, BarChart3, Search, X, Image as ImageIcon } from "lucide-react"
import toast from "react-hot-toast"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"

export default function DealerDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddCar, setShowAddCar] = useState(false)
  const [cars, setCars] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])

  const [carForm, setCarForm] = useState({
    name: "", brandId: "", model: "", slug: "", year: 2024, price: 0,
    description: "", engine: "", horsepower: 0, transmission: "", mileage: 0,
    topSpeed: 0, acceleration: 0, fuelType: "", seatingCapacity: 4, bodyType: "",
    drivetrain: "", availableUnits: 1, images: [] as string[], colors: [] as string[],
    safetyFeatures: [] as string[], accessories: [] as string[]
  })

  useEffect(() => {
    if (status === "unauthenticated") router.push("/dealer-login")
    else if (session && (session.user as any).role !== "DEALER") router.push("/login")
  }, [session, status, router])

  useEffect(() => {
    if (session) {
      fetch("/api/cars").then(r => r.json()).then(setCars)
      fetch("/api/bookings").then(r => r.json()).then(setBookings)
    }
  }, [session])

  if (status === "loading") return <div className="pt-20 text-center text-white/50">Loading...</div>
  if (!session) return null

  const stats = [
    { icon: Car, label: "Total Cars", value: cars.length.toString(), color: "text-blue-400" },
    { icon: DollarSign, label: "Revenue", value: "$2.4M", color: "text-gold" },
    { icon: ShoppingCart, label: "Orders", value: bookings.length.toString(), color: "text-green-400" },
    { icon: Users, label: "Customers", value: "24", color: "text-purple-400" },
    { icon: Package, label: "Pending Orders", value: bookings.filter((b: any) => b.status === "PENDING").length.toString(), color: "text-orange-400" },
    { icon: TrendingUp, label: "Best Seller", value: "Phantom", color: "text-gold" }
  ]

  const handleAddCar = async () => {
    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...carForm, slug: carForm.name.toLowerCase().replace(/\s+/g, "-") })
      })
      if (!res.ok) throw new Error("Failed to add car")
      toast.success("Car added successfully!")
      setShowAddCar(false)
      setCarForm({ name: "", brandId: "", model: "", slug: "", year: 2024, price: 0, description: "", engine: "", horsepower: 0, transmission: "", mileage: 0, topSpeed: 0, acceleration: 0, fuelType: "", seatingCapacity: 4, bodyType: "", drivetrain: "", availableUnits: 1, images: [], colors: [], safetyFeatures: [], accessories: [] })
    } catch { toast.error("Failed to add car") }
  }

  const handleDeleteCar = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return
    try {
      await fetch(`/api/cars/${slug}`, { method: "DELETE" })
      setCars(cars.filter(c => c.slug !== slug))
      toast.success("Car deleted")
    } catch { toast.error("Failed to delete") }
  }

  const tabs = ["overview", "inventory", "bookings", "analytics", "employees", "reports"]

  return (
    <div className="pt-16 min-h-screen bg-luxury-black">
      <div className="border-b border-white/5 bg-luxury-dark/50 backdrop-blur-xl">
        <Container className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 text-sm font-medium capitalize whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? "text-gold border-gold" : "text-white/50 border-transparent hover:text-white/80"}`}>
              {tab}
            </button>
          ))}
        </Container>
      </div>

      <Section className="!pt-6">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-white">Dealer Dashboard</h1>
              <p className="text-white/50 text-sm">Welcome, {session.user?.name}</p>
            </div>
            <Button variant="gold" onClick={() => setShowAddCar(true)}>
              <Plus className="w-4 h-4" /> Add Car
            </Button>
          </div>

          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {stats.map((stat) => (
                  <motion.div key={stat.label} whileHover={{ y: -2 }} className="glass rounded-xl p-4 text-center">
                    <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/40">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display font-bold text-white mb-4">Monthly Sales</h3>
                  <div className="flex items-end gap-2 h-32">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
                      <div key={month} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-gold/20 rounded-t" style={{ height: `${20 + Math.random() * 80}px` }}>
                          <div className="w-full h-full bg-gradient-to-t from-gold to-gold-light rounded-t opacity-80" />
                        </div>
                        <span className="text-[10px] text-white/40">{month}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display font-bold text-white mb-4">Revenue Overview</h3>
                  <p className="text-3xl font-bold text-gold">$2,456,000</p>
                  <p className="text-sm text-green-400 mt-1">+12.5% from last month</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <span className="text-xs text-white/40">Revenue target: $3M this quarter</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-bold text-white mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {bookings.slice(0, 5).map((booking: any) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div>
                        <p className="text-sm font-medium text-white">{booking.bookingId}</p>
                        <p className="text-xs text-white/40">{booking.car?.name || "N/A"} · {booking.totalAmount && formatPrice(booking.totalAmount)}</p>
                      </div>
                      <Badge variant={booking.status === "PENDING" ? "blue" : booking.status === "CONFIRMED" ? "green" : "gold"}>{booking.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "inventory" && (
            <>
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-4 h-4 text-white/30" />
                <input type="text" placeholder="Search inventory..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50" />
              </div>
              <div className="glass rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left p-3 text-white/40 font-medium">Car</th>
                        <th className="text-left p-3 text-white/40 font-medium">Stock #</th>
                        <th className="text-left p-3 text-white/40 font-medium">Available</th>
                        <th className="text-left p-3 text-white/40 font-medium">Booked</th>
                        <th className="text-left p-3 text-white/40 font-medium">Sold</th>
                        <th className="text-left p-3 text-white/40 font-medium">Status</th>
                        <th className="text-left p-3 text-white/40 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cars.map((car: any) => (
                        <tr key={car.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="p-3">
                            <p className="text-white font-medium">{car.name}</p>
                            <p className="text-white/40 text-xs">{car.brand?.name}</p>
                          </td>
                          <td className="p-3 text-white/60">{car.stockNumber || "N/A"}</td>
                          <td className="p-3 text-white">{car.availableUnits}</td>
                          <td className="p-3 text-white">{car.bookedUnits || 0}</td>
                          <td className="p-3 text-white">{car.soldUnits || 0}</td>
                          <td className="p-3"><Badge variant={car.status === "AVAILABLE" ? "green" : car.status === "BOOKED" ? "blue" : "red"}>{car.status}</Badge></td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-gold"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteCar(car.slug)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "bookings" && (
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-bold text-white mb-4">Manage Bookings</h3>
              <div className="space-y-3">
                {bookings.map((booking: any) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-medium text-white">{booking.bookingId}</p>
                        <p className="text-xs text-white/40">{booking.car?.name} · {booking.totalAmount && formatPrice(booking.totalAmount)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={booking.status === "PENDING" ? "blue" : "green"}>{booking.status}</Badge>
                      <Button variant="ghost" size="sm">Approve</Button>
                      <Button variant="ghost" size="sm" className="text-red-400">Reject</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-bold text-white mb-4">Sales Chart</h3>
                <div className="flex items-end gap-2 h-48">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-gradient-to-t from-gold to-gold-light rounded-t opacity-60" style={{ height: `${15 + Math.random() * 85}px` }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-bold text-white mb-4">Best Selling Cars</h3>
                <div className="space-y-3">
                  {["Rolls Royce Phantom", "Lamborghini Revuelto", "Ferrari SF90", "Porsche 911 Turbo S", "Bentley Continental"].map((car, i) => (
                    <div key={car} className="flex items-center gap-3">
                      <span className="text-sm text-white/40 w-6">{i + 1}.</span>
                      <span className="flex-1 text-sm text-white">{car}</span>
                      <div className="w-24 h-2 rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-gold" style={{ width: `${100 - i * 15}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "employees" && (
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-bold text-white mb-4">Team Members</h3>
              <p className="text-white/50 text-sm">Employee management module. Add, edit, and manage dealer staff.</p>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-bold text-white mb-4">Reports</h3>
              <p className="text-white/50 text-sm">Generate sales, inventory, and customer reports.</div>
          )}
        </Container>
      </Section>

      {showAddCar && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowAddCar(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-white">Add New Car</h2>
              <button onClick={() => setShowAddCar(false)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Car Name" placeholder="e.g., Rolls Royce Phantom" value={carForm.name} onChange={(e) => setCarForm({ ...carForm, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} />
              <Input label="Brand ID" placeholder="Brand ID from database" value={carForm.brandId} onChange={(e) => setCarForm({ ...carForm, brandId: e.target.value })} />
              <Input label="Model" placeholder="Phantom VIII" value={carForm.model} onChange={(e) => setCarForm({ ...carForm, model: e.target.value })} />
              <Input label="Year" type="number" value={carForm.year} onChange={(e) => setCarForm({ ...carForm, year: parseInt(e.target.value) })} />
              <Input label="Price" type="number" value={carForm.price || ""} onChange={(e) => setCarForm({ ...carForm, price: parseInt(e.target.value) })} />
              <Input label="Engine" placeholder="6.75L V12" value={carForm.engine} onChange={(e) => setCarForm({ ...carForm, engine: e.target.value })} />
              <Input label="Horsepower" type="number" value={carForm.horsepower || ""} onChange={(e) => setCarForm({ ...carForm, horsepower: parseInt(e.target.value) })} />
              <Input label="Transmission" placeholder="Automatic" value={carForm.transmission} onChange={(e) => setCarForm({ ...carForm, transmission: e.target.value })} />
              <Input label="Top Speed" type="number" placeholder="155" value={carForm.topSpeed || ""} onChange={(e) => setCarForm({ ...carForm, topSpeed: parseInt(e.target.value) })} />
              <Input label="0-60 (seconds)" type="number" step="0.1" value={carForm.acceleration || ""} onChange={(e) => setCarForm({ ...carForm, acceleration: parseFloat(e.target.value) })} />
              <Input label="Fuel Type" placeholder="Petrol" value={carForm.fuelType} onChange={(e) => setCarForm({ ...carForm, fuelType: e.target.value })} />
              <Input label="Body Type" placeholder="Sedan" value={carForm.bodyType} onChange={(e) => setCarForm({ ...carForm, bodyType: e.target.value })} />
              <Input label="Drivetrain" placeholder="RWD" value={carForm.drivetrain} onChange={(e) => setCarForm({ ...carForm, drivetrain: e.target.value })} />
              <Input label="Available Units" type="number" value={carForm.availableUnits} onChange={(e) => setCarForm({ ...carForm, availableUnits: parseInt(e.target.value) })} />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-white/80 mb-1.5">Description</label>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 h-24" placeholder="Car description..." value={carForm.description} onChange={(e) => setCarForm({ ...carForm, description: e.target.value })} />
            </div>
            <Button variant="gold" size="lg" className="w-full mt-6" onClick={handleAddCar}>
              <Plus className="w-4 h-4" /> Add Car to Inventory
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
