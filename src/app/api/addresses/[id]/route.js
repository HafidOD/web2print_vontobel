import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  // console.log(request); ;
  try {
    const address = await prisma.address.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        enterprise: true,
      },
    });
    return NextResponse.json({ address }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const address = await prisma.address.update({
      where: {
        id: parseInt(params.id),
      },
      data: await request.json(),
    });

    return NextResponse.json({ address }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deleteAddress = await prisma.address.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      {
        message: "Address deleted",
        enterprise: deleteAddress,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
