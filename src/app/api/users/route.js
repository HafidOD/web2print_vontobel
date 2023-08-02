import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { Role } from "@prisma/client";

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
    const { enterprises, addresses, ...newuser } = await request.json();
    const connect = enterprises.reduce((arr, item) => {
      arr.push({ id: item });
      return arr;
    }, []);
    const connectAddress = addresses.reduce((arr, item) => {
      arr.push({ id: item });
      return arr;
    }, []);
    // console.log(connectAddress);
    const user = await prisma.user.create({
      data: {
        email: newuser.email,
        password: newuser.password,
        userName: newuser.userName,
        typePrice: newuser.typePrice,
        role: newuser.role,
        currency: newuser.currency,
        enterprises: {
          connect: connect,
        },
        addresses: {
          connect: connectAddress,
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
