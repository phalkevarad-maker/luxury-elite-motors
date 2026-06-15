'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"
import { Truck, MapPin, Package, CheckCircle, Search } from "lucide-react"

export default function DeliveryPage() {
  const [trackingId, setTrackingId] = useState("")
  const [delivery, setDelivery] = useState<any>(null)

  const handleTrack = () => {
    if (trackingId) {
      setDelivery({
        id: trackingId,
        status: "IN_TRANSIT",
        estimatedDate: "2024-12-20",
        carrier: "Elite Logistics",
        origin: "Beverly Hills, CA",
        destination: "New York, NY",
        currentLocation: "Dallas, TX",
        updates: [
          { date: "2024-12-15", status: "Picked up from showroom" },
          { date: "2024-12-16", status: "Arrived at sorting facility" },
          { date: "2024-12-17", status: "In transit to destination" }
        ]
      })
    }
  }

  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container>
          <SectionTitle title="Delivery Tracking" subtitle="Track your luxury vehicle delivery in real-time" />

          <div className="max-w-xl mx-auto mb-10">
            <div className="flex gap-3">
              <Input placeholder="Enter Booking ID or Tracking Number" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} icon={<Search className="w-4 h-4" />} />
              <Button variant="gold" onClick={handleTrack}>Track</Button>
            </div>
          </div>

          {delivery && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
              <div className="glass rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-white">Delivery #{delivery.id}</h3>
                  <span className="px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-medium">{delivery.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div><span className="text-white/40">Origin:</span><span className="text-white ml-2">{delivery.origin}</span></div>
                  <div><span className="text-white/40">Destination:</span><span className="text-white ml-2">{delivery.destination}</span></div>
                  <div><span className="text-white/40">Carrier:</span><span className="text-white ml-2">{delivery.carrier}</span></div>
                  <div><span className="text-white/40">Est. Date:</span><span className="text-white ml-2">{delivery.estimatedDate}</span></div>
                  <div className="col-span-2"><span className="text-white/40">Current Location:</span><span className="text-gold ml-2">{delivery.currentLocation}</span></div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-bold text-white mb-4">Tracking Timeline</h3>
                <div className="space-y-4">
                  {delivery.updates.map((update: any, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-gold" />
                        {i < delivery.updates.length - 1 && <div className="w-px flex-1 bg-gold/20" />}
                      </div>
                      <div>
                        <p className="text-sm text-white">{update.status}</p>
                        <p className="text-xs text-white/40">{update.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </Container>
      </Section>
    </div>
  )
}
