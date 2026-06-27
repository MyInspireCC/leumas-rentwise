import { errorResponse, successResponse } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

const INSPECTION_FEE = 5_000;
const ADD_ON_FEE = 5_000;

type CreatePaymentBody = {
  inspectionId?: string;
  addOn?: boolean;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreatePaymentBody;
    const { inspectionId, addOn = false } = body;

    if (!inspectionId) {
      return errorResponse("inspectionId is required");
    }

    const inspection = await prisma.inspection.findUnique({
      where: { id: inspectionId },
    });

    if (!inspection) {
      return errorResponse("Inspection not found", 404);
    }

    const total = addOn ? INSPECTION_FEE + ADD_ON_FEE : INSPECTION_FEE;

    const payment = await prisma.payment.create({
      data: {
        inspectionId,
        amount: total,
        status: "paid",
      },
    });

    await prisma.inspection.update({
      where: { id: inspectionId },
      data: { status: "confirmed" },
    });

    return successResponse(
      {
        payment,
        total,
      },
      201,
    );
  } catch {
    return errorResponse("Something went wrong", 500);
  }
}
