import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { success, badRequest, serverError, forbidden } from "@/lib/api-utils"
import { DEALER_CODE } from "@/lib/utils"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, dealerCode, dealerName, dealerContact, dealerAddress } = await req.json()

    if (!name || !email || !password || !dealerCode) {
      return badRequest("Missing required fields")
    }

    if (dealerCode !== DEALER_CODE) {
      return forbidden()
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return badRequest("Email already registered")
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        dealerCode,
        dealerName: dealerName || name,
        dealerContact: dealerContact || phone,
        dealerAddress,
        role: "DEALER"
      }
    })

    return success({ user: { id: user.id, name: user.name, email: user.email, role: "DEALER" } }, 201)
  } catch (error) {
    return serverError(error)
  }
}
