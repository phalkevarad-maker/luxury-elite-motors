import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { RateLimiter } from "./rate-limiter"

export async function getSession() {
  return await getServerSession(authOptions)
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}

export function forbidden() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 })
}

export function badRequest(message = "Bad request") {
  return NextResponse.json({ error: message }, { status: 400 })
}

export function notFound(message = "Not found") {
  return NextResponse.json({ error: message }, { status: 404 })
}

export function success(data: any, status = 200) {
  return NextResponse.json(data, { status })
}

export function serverError(error: any) {
  console.error(error)
  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}

export async function requireAuth() {
  const session = await getSession()
  if (!session?.user) throw new Error("Unauthorized")
  return session
}

export async function requireRole(...roles: string[]) {
  const session = await requireAuth()
  const userRole = (session.user as any).role
  if (!roles.includes(userRole)) throw new Error("Forbidden")
  return session
}

export const rateLimiter = new RateLimiter()
