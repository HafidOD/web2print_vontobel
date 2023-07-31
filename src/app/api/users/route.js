import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request) {
  try {
    const users = await prisma.user.findMany({
      include: {
        enterprises: true,
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
    const { enterprises, ...newuser } = await request.json();
    const connect = enterprises.reduce((arr, item) => {
      arr.push({ id: item });
      return arr;
    }, []);
    // console.log(connect);
    const user = await prisma.user.create({
      data: {
        email: newuser.email,
        password: newuser.password,
        userName: newuser.userName,
        enterprises: {
          connect: connect,
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
