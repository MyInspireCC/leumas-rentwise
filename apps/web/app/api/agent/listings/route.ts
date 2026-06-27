import { errorResponse, successResponse } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get("agentId");

    if (!agentId) {
      return errorResponse("agentId query parameter is required");
    }

    const listings = await prisma.listing.findMany({
      where: { agentId },
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
