import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { success, serverError, requireRole } from "@/lib/api-utils"

export async function GET(req: NextRequest) {
  try {
    await requireRole("DEALER", "ADMIN")

    const totalCars = await prisma.car.count()
    const availableCars = await prisma.car.count({ where: { status: "AVAILABLE" } })
    const bookedCars = await prisma.car.count({ where: { status: "BOOKED" } })
    const soldCars = await prisma.car.count({ where: { status: "SOLD" } })
    const totalBookings = await prisma.booking.count()
    const pendingOrders = await prisma.booking.count({ where: { status: "PENDING" } })
    const completedOrders = await prisma.booking.count({ where: { status: "COMPLETED" } })
    const totalCustomers = await prisma.user.count({ where: { role: "CUSTOMER" } })

    const payments = await prisma.payment.findMany({ where: { status: "COMPLETED" } })
    const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0)

    return success({
      totalCars, availableCars, bookedCars, soldCars,
      totalRevenue, totalOrders: totalBookings,
      pendingOrders, completedOrders, totalCustomers
    })
  } catch (error) {
    return serverError(error)
  }
}
