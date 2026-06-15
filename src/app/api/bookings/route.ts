import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { success, badRequest, serverError, requireAuth } from "@/lib/api-utils"
import { generateBookingId } from "@/lib/utils"

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth()
    const data = await req.json()

    if (!data.car) return badRequest("Car selection required")

    const car = await prisma.car.findUnique({ where: { slug: data.car } })
    if (!car) return badRequest("Car not found")
    if (car.availableUnits < 1) return badRequest("Car not available")

    const bookingId = generateBookingId()

    const booking = await prisma.booking.create({
      data: {
        bookingId,
        userId: (session.user as any).id,
        carId: car.id,
        color: data.color,
        variant: data.variant,
        accessories: data.accessories || [],
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
        homeDelivery: data.homeDelivery ?? true,
        pickupLocation: data.pickupLocation,
        deliveryAddress: data.deliveryAddress,
        advanceAmount: data.advanceAmount || car.price * 0.1,
        totalAmount: car.price,
        status: "PENDING"
      }
    })

    await prisma.car.update({
      where: { id: car.id },
      data: {
        availableUnits: { decrement: 1 },
        bookedUnits: { increment: 1 }
      }
    })

    await prisma.notification.create({
      data: {
        userId: (session.user as any).id,
        title: "Booking Confirmed",
        message: `Your booking ${bookingId} for ${car.name} has been confirmed.`,
        type: "BOOKING"
      }
    })

    return success(booking, 201)
  } catch (error) {
    return serverError(error)
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth()
    const bookings = await prisma.booking.findMany({
      where: { userId: (session.user as any).id },
      include: { car: { include: { brand: true } }, payment: true, delivery: true },
      orderBy: { createdAt: "desc" }
    })
    return success(bookings)
  } catch (error) {
    return serverError(error)
  }
}
