import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  const adminPassword = await bcrypt.hash("admin123", 12)
  const customerPassword = await bcrypt.hash("customer123", 12)
  const dealerPassword = await bcrypt.hash("dealer123", 12)

  const admin = await prisma.user.upsert({
    where: { email: "admin@luxuryelitemotors.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@luxuryelitemotors.com",
      password: adminPassword,
      role: "ADMIN",
      phone: "+1 234 567 890"
    }
  })

  const customer = await prisma.user.upsert({
    where: { email: "john@example.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "john@example.com",
      password: customerPassword,
      role: "CUSTOMER",
      phone: "+1 234 567 891",
      address: "123 Luxury Ave",
      city: "Beverly Hills",
      state: "California",
      country: "USA",
      pincode: "90210"
    }
  })

  const dealer = await prisma.user.upsert({
    where: { email: "dealer@dealership.com" },
    update: {},
    create: {
      name: "Varad Dealer",
      email: "dealer@dealership.com",
      password: dealerPassword,
      role: "DEALER",
      phone: "+1 234 567 892",
      dealerCode: "varad.2345",
      dealerName: "Elite Auto Group",
      dealerContact: "+1 234 567 893",
      dealerAddress: "444 Rodeo Drive, Beverly Hills"
    }
  })

  const brands = await Promise.all([
    prisma.brand.upsert({ where: { slug: "rolls-royce" }, update: {}, create: { name: "Rolls Royce", slug: "rolls-royce", country: "UK", foundedYear: 1904 } }),
    prisma.brand.upsert({ where: { slug: "lamborghini" }, update: {}, create: { name: "Lamborghini", slug: "lamborghini", country: "Italy", foundedYear: 1963 } }),
    prisma.brand.upsert({ where: { slug: "ferrari" }, update: {}, create: { name: "Ferrari", slug: "ferrari", country: "Italy", foundedYear: 1939 } }),
    prisma.brand.upsert({ where: { slug: "porsche" }, update: {}, create: { name: "Porsche", slug: "porsche", country: "Germany", foundedYear: 1931 } }),
    prisma.brand.upsert({ where: { slug: "bentley" }, update: {}, create: { name: "Bentley", slug: "bentley", country: "UK", foundedYear: 1919 } }),
    prisma.brand.upsert({ where: { slug: "mercedes-maybach" }, update: {}, create: { name: "Mercedes Maybach", slug: "mercedes-maybach", country: "Germany", foundedYear: 1921 } }),
    prisma.brand.upsert({ where: { slug: "bugatti" }, update: {}, create: { name: "Bugatti", slug: "bugatti", country: "France", foundedYear: 1909 } }),
    prisma.brand.upsert({ where: { slug: "mclaren" }, update: {}, create: { name: "McLaren", slug: "mclaren", country: "UK", foundedYear: 1963 } }),
    prisma.brand.upsert({ where: { slug: "aston-martin" }, update: {}, create: { name: "Aston Martin", slug: "aston-martin", country: "UK", foundedYear: 1913 } }),
    prisma.brand.upsert({ where: { slug: "bmw-m" }, update: {}, create: { name: "BMW M", slug: "bmw-m", country: "Germany", foundedYear: 1972 } }),
    prisma.brand.upsert({ where: { slug: "audi-rs" }, update: {}, create: { name: "Audi RS", slug: "audi-rs", country: "Germany", foundedYear: 1994 } })
  ])

  const cars = [
    {
      brandSlug: "rolls-royce",
      name: "Rolls Royce Phantom VIII",
      model: "Phantom VIII",
      year: 2024,
      price: 460000,
      engine: "6.75L V12 Twin-Turbo",
      horsepower: 563,
      transmission: "8-Speed Automatic",
      mileage: 14,
      topSpeed: 155,
      acceleration: 5.1,
      fuelType: "Petrol",
      seatingCapacity: 5,
      bodyType: "Sedan",
      drivetrain: "RWD",
      isFeatured: true,
      isCustomizable: true,
      availableUnits: 3,
      description: "The pinnacle of automotive luxury. The Rolls-Royce Phantom VIII represents the absolute finest expression of motoring artistry."
    },
    {
      brandSlug: "lamborghini",
      name: "Lamborghini Revuelto",
      model: "Revuelto",
      year: 2024,
      price: 608000,
      engine: "6.5L V12 Hybrid",
      horsepower: 1001,
      transmission: "8-Speed DCT",
      mileage: 2.5,
      topSpeed: 217,
      acceleration: 2.5,
      fuelType: "Hybrid",
      seatingCapacity: 2,
      bodyType: "Supercar",
      drivetrain: "AWD",
      isTrending: true,
      availableUnits: 2,
      description: "The first HPEV (High Performance Electrified Vehicle) from Lamborghini. A new era of super sports cars."
    },
    {
      brandSlug: "ferrari",
      name: "Ferrari SF90 Stradale",
      model: "SF90",
      year: 2024,
      price: 524000,
      engine: "4.0L V8 Hybrid",
      horsepower: 986,
      transmission: "8-Speed DCT",
      mileage: 2.5,
      topSpeed: 211,
      acceleration: 2.5,
      fuelType: "Hybrid",
      seatingCapacity: 2,
      bodyType: "Supercar",
      drivetrain: "AWD",
      isNewArrival: true,
      availableUnits: 2,
      description: "Ferrari's first production plug-in hybrid. Unprecedented performance meets Italian artistry."
    },
    {
      brandSlug: "porsche",
      name: "Porsche 911 Turbo S",
      model: "992 Turbo S",
      year: 2024,
      price: 230000,
      engine: "3.8L Flat-6 Twin-Turbo",
      horsepower: 640,
      transmission: "8-Speed PDK",
      mileage: 2.6,
      topSpeed: 205,
      acceleration: 2.6,
      fuelType: "Petrol",
      seatingCapacity: 4,
      bodyType: "Coupe",
      drivetrain: "AWD",
      isTrending: true,
      availableUnits: 5,
      description: "The benchmark for everyday supercars. Unmatched performance meets daily usability."
    },
    {
      brandSlug: "bentley",
      name: "Bentley Continental GT Speed",
      model: "Continental GT",
      year: 2024,
      price: 285000,
      engine: "6.0L W12 Twin-Turbo",
      horsepower: 650,
      transmission: "8-Speed DCT",
      mileage: 2.7,
      topSpeed: 208,
      acceleration: 3.5,
      fuelType: "Petrol",
      seatingCapacity: 4,
      bodyType: "Coupe",
      drivetrain: "AWD",
      availableUnits: 3,
      description: "The ultimate grand tourer. Power, luxury, and craftsmanship in perfect harmony."
    },
    {
      brandSlug: "mercedes-maybach",
      name: "Mercedes Maybach S680",
      model: "S680",
      year: 2024,
      price: 320000,
      engine: "6.0L V12 Twin-Turbo",
      horsepower: 621,
      transmission: "9-Speed Automatic",
      mileage: 2.8,
      topSpeed: 155,
      acceleration: 4.4,
      fuelType: "Petrol",
      seatingCapacity: 5,
      bodyType: "Sedan",
      drivetrain: "AWD",
      availableUnits: 4,
      description: "The pinnacle of Mercedes-Benz luxury. Executive comfort redefined."
    },
    {
      brandSlug: "bugatti",
      name: "Bugatti Mistral",
      model: "Mistral",
      year: 2024,
      price: 5000000,
      engine: "8.0L W16 Quad-Turbo",
      horsepower: 1578,
      transmission: "7-Speed DCT",
      mileage: 1.8,
      topSpeed: 261,
      acceleration: 2.3,
      fuelType: "Petrol",
      seatingCapacity: 2,
      bodyType: "Roadster",
      drivetrain: "AWD",
      isLimitedEdition: true,
      availableUnits: 1,
      description: "The ultimate roadster. The last W16-powered Bugatti roadster ever made."
    }
  ]

  for (const carData of cars) {
    const brand = brands.find(b => b.slug === carData.brandSlug)
    if (!brand) continue

    const slug = carData.name.toLowerCase().replace(/\s+/g, "-")

    const car = await prisma.car.upsert({
      where: { slug },
      update: {},
      create: {
        brandId: brand.id,
        name: carData.name,
        model: carData.model,
        slug,
        year: carData.year,
        price: carData.price,
        description: carData.description,
        images: [`/images/cars/${slug}.jpg`],
        interiorImages: [`/images/cars/${slug}-int.jpg`],
        exteriorImages: [`/images/cars/${slug}-ext.jpg`],
        engine: carData.engine,
        horsepower: carData.horsepower,
        transmission: carData.transmission,
        mileage: carData.mileage,
        topSpeed: carData.topSpeed,
        acceleration: carData.acceleration,
        fuelType: carData.fuelType,
        seatingCapacity: carData.seatingCapacity,
        bodyType: carData.bodyType,
        drivetrain: carData.drivetrain,
        colors: ["Black", "White", "Silver", "Gold", "Blue"],
        safetyFeatures: ["ABS", "Airbags", "Lane Assist", "360 Camera", "Night Vision", "Adaptive Cruise"],
        accessories: ["Umbrella Set", "Car Cover", "Floor Mats"],
        isFeatured: carData.isFeatured || false,
        isTrending: carData.isTrending || false,
        isNewArrival: carData.isNewArrival || false,
        isLimitedEdition: carData.isLimitedEdition || false,
        isCustomizable: carData.isCustomizable || false,
        availableUnits: carData.availableUnits,
        status: "AVAILABLE"
      }
    })

    await prisma.inventory.upsert({
      where: { carId: car.id },
      update: {},
      create: {
        carId: car.id,
        stockNumber: `STK-${car.id.slice(0, 8)}`,
        vin: `VIN-${car.id.slice(0, 8)}`,
        availableUnits: carData.availableUnits,
        warehouse: "Beverly Hills",
      }
    })
  }

  console.log("Seeding complete!")
  console.log(`Created ${brands.length} brands and ${cars.length} cars`)
  console.log("Test accounts:")
  console.log("  Admin: admin@luxuryelitemotors.com / admin123")
  console.log("  Customer: john@example.com / customer123")
  console.log("  Dealer: dealer@dealership.com / dealer123 (code: varad.2345)")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
