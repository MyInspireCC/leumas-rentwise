import { errorResponse, successResponse } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get("agentId");

    if (!agentId) {
      return errorResponse("agentId query parameter is required");
    }

    const inspections = await prisma.inspection.findMany({
      where: {
        listing: {
          agentId,
        },
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
        payments: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(inspections);
  } catch {
    return errorResponse("Something went wrong", 500);
  }
}
