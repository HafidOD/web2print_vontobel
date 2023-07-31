import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  // console.log(request); ;

  try {
    const enterprise = await prisma.enterprise.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        addresses: true,
        users: true,
        categories: true,
        products: true,
      },
    });
    return NextResponse.json({ data: enterprise }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const enterprise = await prisma.enterprise.update({
      where: {
        id: parseInt(params.id),
      },
      data: await request.json(),
      include: {
        users: true,
        addresses: true,
      },
    });
    return NextResponse.json({ enterprise }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deleteEnterprise = await prisma.enterprise.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      {
        message: "Enterprise deleted",
        enterprise: deleteEnterprise,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
