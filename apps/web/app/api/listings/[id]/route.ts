import { errorResponse, successResponse } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

type ListingRouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: ListingRouteParams) {
  try {
    const { id } = await params;

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        agent: true,
        inspections: true,
      },
    });

    if (!listing) {
      return errorResponse("Listing not found", 404);
    }

    const safeListing = {
      ...listing,
      agent: listing.agent
        ? (({ password: _password, ...agent }) => agent)(listing.agent)
        : listing.agent,
    };

    return successResponse(safeListing);
  } catch {
    return errorResponse("Something went wrong", 500);
  }
}
