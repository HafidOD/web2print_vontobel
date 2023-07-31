import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
export async function GET(request) {
  try {
    const addresses = await prisma.address.findMany({
      include: {
        enterprise: true,
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

export async function POST(request) {
  try {
    const { ...newAddress } = await request.json();
    const address = await prisma.address.create({
      data: newAddress,
    });
    return NextResponse.json({ address }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
