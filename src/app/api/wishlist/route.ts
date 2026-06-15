import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { success, serverError, requireAuth } from "@/lib/api-utils"

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth()
    const { carId } = await req.json()

    const existing = await prisma.wishlist.findUnique({
      where: { userId_carId: { userId: (session.user as any).id, carId } }
    })

    if (existing) {
      await prisma.wishlist.delete({ where: { id: existing.id } })
      return success({ wishlisted: false })
    }

    await prisma.wishlist.create({
      data: { userId: (session.user as any).id, carId }
    })

    return success({ wishlisted: true })
  } catch (error) {
    return serverError(error)
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth()
    const wishlist = await prisma.wishlist.findMany({
      where: { userId: (session.user as any).id },
      include: { car: { include: { brand: true } } }
    })
    return success(wishlist)
  } catch (error) {
    return serverError(error)
  }
}
