import { errorResponse, successResponse } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      size,
      description,
      amenities,
      serviceCharge,
      agencyFee,
      image,
      agentId,
    } = body;

    if (
      !title ||
      !location ||
      price == null ||
      bedrooms == null ||
      bathrooms == null ||
      !image ||
      !agentId
    ) {
      return errorResponse("Missing required fields", 400);
    }

    const agent = await prisma.user.findUnique({
      where: { id: agentId },
    });

    if (!agent) {
      return errorResponse("Agent not found", 404);
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        location,
        price: Number(price),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        size: size != null ? Number(size) : null,
        description: description ?? null,
        amenities: Array.isArray(amenities) ? amenities : [],
        serviceCharge: serviceCharge != null ? Number(serviceCharge) : null,
        agencyFee: agencyFee != null ? Number(agencyFee) : null,
        image,
        agentId,
        isVerified: agent.isVerified,
      },
    });

    return successResponse(listing, 201);
  } catch {
    return errorResponse("Something went wrong", 500);
  }
}

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      include: { agent: true },
      orderBy: { createdAt: "desc" },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      agent: listing.agent
        ? (({ password: _password, ...agent }) => agent)(listing.agent)
        : listing.agent,
    }));

    return successResponse(safeListings);
  } catch {
    return errorResponse("Something went wrong", 500);
  }
}
