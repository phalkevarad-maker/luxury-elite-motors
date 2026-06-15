import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { success, serverError } from "@/lib/api-utils"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const review = await prisma.review.create({
      data: {
        userId: data.userId,
        carId: data.carId,
        rating: data.rating,
        comment: data.comment
      }
    })
    return success(review, 201)
  } catch (error) {
    return serverError(error)
  }
}

export async function GET(req: NextRequest) {
  try {
    const reviews = await prisma.review.findMany({
      where: { isApproved: true },
      include: { user: { select: { name: true, image: true } }, car: { select: { name: true } } },
      orderBy: { createdAt: "desc" }
    })
    return success(reviews)
  } catch (error) {
    return serverError(error)
  }
}
