import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { success, serverError } from "@/lib/api-utils"

export async function GET(req: NextRequest) {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
      take: 50
    })
    return success(notifications)
  } catch (error) {
    return serverError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const notification = await prisma.notification.create({ data })
    return success(notification, 201)
  } catch (error) {
    return serverError(error)
  }
}
