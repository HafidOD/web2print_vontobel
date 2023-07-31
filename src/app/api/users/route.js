import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request) {
    try {
      const users = await prisma.user.findMany();
      return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Internal Error", error },
        { status: 500 }
      );
    }
}