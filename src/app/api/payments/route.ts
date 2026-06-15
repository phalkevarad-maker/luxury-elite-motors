import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { success, badRequest, serverError, requireAuth } from "@/lib/api-utils"

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth()
    const data = await req.json()

    const booking = await prisma.booking.findUnique({
      where: { bookingId: data.bookingId }
    })

    if (!booking) return badRequest("Booking not found")

    const payment = await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: data.amount || booking.totalAmount,
        method: data.method || "STRIPE",
        status: "COMPLETED",
        transactionId: data.transactionId,
        paymentIntentId: data.paymentIntentId,
        paidAt: new Date()
      }
    })

    await prisma.booking.update({
      where: { id: booking.id },
      data: { status: "CONFIRMED" }
    })

    return success(payment, 201)
  } catch (error) {
    return serverError(error)
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth()
    const payments = await prisma.payment.findMany({
      where: { booking: { userId: (session.user as any).id } },
      include: { booking: { include: { car: { include: { brand: true } } } } },
      orderBy: { createdAt: "desc" }
    })
    return success(payments)
  } catch (error) {
    return serverError(error)
  }
}
