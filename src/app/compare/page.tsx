'use client'

import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import Image from "next/image"
import { useCompareStore } from "@/store"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { Trash2, X } from "lucide-react"

export default function ComparePage() {
  const { items, removeItem, clear } = useCompareStore()

  const specs = ["Engine", "Horsepower", "Transmission", "Top Speed", "0-60 mph", "Fuel Type", "Drivetrain", "Price"]

  return (
    <div className="pt-20">
      <Section className="!pt-8">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <SectionTitle
              title="Compare Cars"
              subtitle="Compare up to 4 luxury vehicles side by side"
              className="!mb-0 text-left"
            />
            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clear}>
                <Trash2 className="w-4 h-4" /> Clear All
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg mb-4">No cars to compare</p>
              <Link href="/cars"><Button variant="gold">Browse Cars</Button></Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="text-left text-sm text-white/40 uppercase tracking-wider pb-4 pr-4 w-40">Specifications</th>
                    {items.map((car) => (
                      <th key={car.id} className="pb-4 px-3">
                        <div className="relative glass rounded-2xl p-4 text-center">
                          <button onClick={() => removeItem(car.id)} className="absolute top-2 right-2 text-white/30 hover:text-red-400">
                            <X className="w-4 h-4" />
                          </button>
                          <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                            <Image src={car.images[0]} alt={car.name} fill className="object-cover" />
                          </div>
                          <h3 className="font-display font-bold text-white text-sm">{car.name}</h3>
                          <p className="text-xs text-white/40">{car.year}</p>
                          <p className="text-lg font-bold text-gold mt-1">{formatPrice(car.price)}</p>
                          <Link href={`/cars/${car.slug}`}><Button variant="outline" size="sm" className="w-full mt-2">View</Button></Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec) => (
                    <tr key={spec} className="border-t border-white/5">
                      <td className="py-3 pr-4 text-sm text-white/50">{spec}</td>
                      {items.map((car) => {
                        const getValue = () => {
                          switch (spec) {
                            case "Engine": return car.engine;
                            case "Horsepower": return `${car.horsepower} hp`;
                            case "Transmission": return car.transmission;
                            case "Top Speed": return `${car.topSpeed} mph`;
                            case "0-60 mph": return `${car.acceleration}s`;
                            case "Fuel Type": return car.fuelType;
                            case "Drivetrain": return car.drivetrain;
                            case "Price": return formatPrice(car.price);
                            default: return "-";
                          }
                        }
                        return <td key={car.id} className="py-3 px-3 text-sm text-white text-center">{getValue()}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Container>
      </Section>
    </div>
  )
}
