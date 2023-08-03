import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  // console.log(params.userId);
  try {
    const addresses = await prisma.address.findMany({
      where: {
        enterpriseId: parseInt(params.enterpriseId),
        users: {
          some: {
            id: parseInt(params.userId),
          },
        },
      },
      include: {
        users: true,
      },
    });
    return NextResponse.json({ addresses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
