import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { success, badRequest, serverError } from "@/lib/api-utils"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, address, city, state, country, pincode } = await req.json()

    if (!name || !email || !password) {
      return badRequest("Missing required fields")
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
        address,
        city,
        state,
        country,
        pincode,
        role: "CUSTOMER"
      }
    })

    return success({ user: { id: user.id, name: user.name, email: user.email } }, 201)
  } catch (error) {
    return serverError(error)
  }
}
