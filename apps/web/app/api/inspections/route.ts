import { errorResponse, successResponse } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

type CreateInspectionBody = {
  listingId?: string;
  userId?: string;
  date?: string;
  timeSlot?: string;
  addOn?: boolean;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateInspectionBody;
    const { listingId, userId, date, timeSlot, addOn = false } = body;

    if (!listingId || !userId || !date || !timeSlot) {
      return errorResponse("listingId, userId, date, and timeSlot are required");
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return errorResponse("Listing not found", 404);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return errorResponse("User not found", 404);
    }

    const inspection = await prisma.inspection.create({
      data: {
        listingId,
        userId,
        date,
        timeSlot,
        addOn,
        status: "pending",
      },
      include: {
        listing: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
      },
    });

    return successResponse(inspection, 201);
  } catch {
    return errorResponse("Something went wrong", 500);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get("agentId");

    const inspections = await prisma.inspection.findMany({
      where: agentId
        ? {
            listing: {
              agentId,
            },
          }
        : undefined,
      include: {
        listing: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(inspections);
  } catch {
    return errorResponse("Something went wrong", 500);
  }
}
