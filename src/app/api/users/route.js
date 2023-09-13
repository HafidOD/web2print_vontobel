import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";

export async function GET(request) {
  try {
    const users = await prisma.user.findMany({
      include: {
        enterprises: true,
        addresses: true,
      },
    });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  // const { ...user } = await request.json();

  try {
    const data = await request.formData();
    // console.log(data);
    const enterpriseIds = data.get('enterprises').split(",").map(id => ({ id: parseInt(id) }));
    const addressIds = data.get('addresses').split(",").map(id => ({ id: parseInt(id) }));
    const password = await bcrypt.hash(data.get('password'), 10)

    // console.log(enterpriseIds);
    // console.log(addressIds);

    const user = await prisma.user.create({
      data: {
        email: data.get('email'),
        password: data.get('password'),
        telefono: data.get('telefono'),
        userName: data.get('userName'),
        typePrice: parseInt(data.get('typePrice')),
        role: parseInt(data.get('role')),
        currency: data.get('currency'),
        enterprises: {
          connect: enterpriseIds,
        },
        addresses: {
          connect: addressIds,
        },
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
