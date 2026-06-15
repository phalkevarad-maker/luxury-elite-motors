import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { success, serverError } from "@/lib/api-utils"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const brand = searchParams.get("brand")
    const model = searchParams.get("model")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const year = searchParams.get("year")
    const fuelType = searchParams.get("fuelType")
    const transmission = searchParams.get("transmission")
    const minHorsepower = searchParams.get("minHorsepower")
    const seatingCapacity = searchParams.get("seatingCapacity")
    const bodyType = searchParams.get("bodyType")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"
    const featured = searchParams.get("featured")
    const trending = searchParams.get("trending")
    const newArrival = searchParams.get("newArrival")
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined

    const where: any = { status: { not: "SOLD" } }

    if (brand) where.brand = { slug: brand }
    if (model) where.model = { contains: model, mode: "insensitive" }
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }
    if (year) where.year = parseInt(year)
    if (fuelType) where.fuelType = fuelType
    if (transmission) where.transmission = transmission
    if (minHorsepower) where.horsepower = { gte: parseInt(minHorsepower) }
    if (seatingCapacity) where.seatingCapacity = parseInt(seatingCapacity)
    if (bodyType) where.bodyType = bodyType
    if (featured === "true") where.isFeatured = true
    if (trending === "true") where.isTrending = true
    if (newArrival === "true") where.isNewArrival = true

    const cars = await prisma.car.findMany({
      where,
      include: { brand: { select: { id: true, name: true, slug: true, logo: true } } },
      orderBy: { [sortBy]: sortOrder },
      take: limit
    })

    return success(cars)
  } catch (error) {
    return serverError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const car = await prisma.car.create({
      data: {
        brandId: data.brandId,
        name: data.name,
        model: data.model,
        slug: data.slug,
        year: data.year,
        price: data.price,
        description: data.description,
        images: data.images || [],
        interiorImages: data.interiorImages || [],
        exteriorImages: data.exteriorImages || [],
        engine: data.engine,
        horsepower: data.horsepower,
        transmission: data.transmission,
        mileage: data.mileage,
        topSpeed: data.topSpeed,
        acceleration: data.acceleration,
        fuelType: data.fuelType,
        seatingCapacity: data.seatingCapacity || 4,
        bodyType: data.bodyType,
        drivetrain: data.drivetrain,
        colors: data.colors || [],
        safetyFeatures: data.safetyFeatures || [],
        accessories: data.accessories || [],
        availableUnits: data.availableUnits || 1,
        status: data.status || "AVAILABLE"
      },
      include: { brand: true }
    })

    await prisma.inventory.create({
      data: {
        carId: car.id,
        stockNumber: data.stockNumber || `STK-${car.id.slice(0, 8)}`,
        vin: data.vin || `VIN-${car.id.slice(0, 8)}`,
        availableUnits: data.availableUnits || 1
      }
    })

    return success(car, 201)
  } catch (error) {
    return serverError(error)
  }
}
