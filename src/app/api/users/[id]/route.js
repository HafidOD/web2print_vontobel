import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  // console.log(request); ;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        enterprises: true,
      },
    });
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  // cosnt updateData = await re
  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(params.id),
      },
      data: await request.json(),
      include: {
        enterprises: true,
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      {
        message: "User deleted",
        enterprise: deleteUser,
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
