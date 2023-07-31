import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ message: "Hola mundo" }, { status: 200 });
}
