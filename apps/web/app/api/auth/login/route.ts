import { errorResponse, omitPassword, successResponse } from "@/lib/api-response";
import { verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;
    const { email, password } = body;

    if (!email || !password) {
      return errorResponse("Email and password are required");
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse("Invalid email or password", 401);
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return errorResponse("Invalid email or password", 401);
    }

    return successResponse(omitPassword(user));
  } catch {
    return errorResponse("Something went wrong", 500);
  }
}
