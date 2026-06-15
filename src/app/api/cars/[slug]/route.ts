import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { success, notFound, serverError } from "@/lib/api-utils"

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const car = await prisma.car.findUnique({
      where: { slug: params.slug },
      include: {
        brand: true,
        inventory: true,
        customizationOptions: true
      }
    })

    if (!car) return notFound("Car not found")

    await prisma.car.update({
      where: { id: car.id },
      data: { views: { increment: 1 } }
    })

    return success(car)
  } catch (error) {
    return serverError(error)
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await req.json()
    const car = await prisma.car.update({
      where: { slug: params.slug },
      data,
      include: { brand: true, inventory: true }
    })
    return success(car)
  } catch (error) {
    return serverError(error)
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.car.delete({ where: { slug: params.slug } })
    return success({ message: "Car deleted" })
  } catch (error) {
    return serverError(error)
  }
}
