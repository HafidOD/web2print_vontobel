import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  // console.log(request); ;

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({ data: property }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.formData();
    console.log(data);

    const property = await prisma.property.update({
      data: {
        propertyName: data.get("propertyName"),
      },
    });
    // return NextResponse.json({ mensaje: "ok" }, { status: 200 });
    return NextResponse.json({ enterprise }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deleteProperty = await prisma.property.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      {
        message: "Property deleted",
        enterprise: deleteProperty,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
