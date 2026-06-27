import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  const agent = await prisma.user.upsert({
    where: { email: "agent@rentwise.test" },
    update: { isVerified: true },
    create: {
      name: "Demo Agent",
      email: "agent@rentwise.test",
      password,
      role: "agent",
      phone: "+234 800 000 0001",
      experience: "5+ years",
      location: "Lagos",
      isVerified: true,
    },
  });

  const tenant = await prisma.user.upsert({
    where: { email: "user@rentwise.test" },
    update: {},
    create: {
      name: "Demo User",
      email: "user@rentwise.test",
      password,
      role: "user",
    },
  });

  const listings = [
    {
      title: "Luxury 3-Bedroom Flat",
      location: "Lekki Phase 1, Lagos",
      price: 4_500_000,
      bedrooms: 3,
      bathrooms: 3,
      size: 2200,
      description:
        "Spacious 3-bedroom flat in Lekki Phase 1 with premium finishes, dedicated parking, and 24/7 security. Ideal for professionals and small families.",
      amenities: [
        "24/7 Power Supply",
        "Armed Security",
        "Gated Parking",
        "Fiber Internet",
      ],
      serviceCharge: 450_000,
      agencyFee: 450_000,
      isVerified: true,
      image: "/images/listings/listing-1.jpg",
    },
    {
      title: "Modern Studio Apartment",
      location: "Yaba, Lagos",
      price: 2_800_000,
      bedrooms: 1,
      bathrooms: 1,
      size: 650,
      description:
        "Compact studio in Yaba close to tech hubs and universities. Fully serviced with reliable power and fast internet.",
      amenities: ["24/7 Power Supply", "Fiber Internet"],
      serviceCharge: 280_000,
      agencyFee: 280_000,
      isVerified: true,
      image: "/images/listings/listing-3.jpg",
    },
  ];

  for (const listing of listings) {
    const existing = await prisma.listing.findFirst({
      where: {
        title: listing.title,
        agentId: agent.id,
      },
    });

    if (!existing) {
      await prisma.listing.create({
        data: {
          ...listing,
          agentId: agent.id,
        },
      });
    }
  }

  console.log("Seeded agent:", agent.id);
  console.log("Seeded user:", tenant.id);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
