import { errorResponse, omitPassword, successResponse } from "@/lib/api-response";
import { hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type SignupBody = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  company?: string;
  experience?: string;
  location?: string;
  isVerified?: boolean;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupBody;
    const { name, email, password, phone, company, experience, location } = body;

    if (!name || !email || !password || !phone || !experience || !location) {
      return errorResponse("Please complete all required fields");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse("Email already in use", 409);
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        role: "agent",
        phone,
        company: company || null,
        experience,
        location,
        isVerified: false,
      },
    });

    return successResponse(omitPassword(user), 201);
  } catch {
    return errorResponse("Something went wrong", 500);
  }
}
