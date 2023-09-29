import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

import prisma from "@/libs/prisma";

export async function GET(request) {
  try {
    const enterprises = await prisma.enterprise.findMany({
      include: {
        addresses: true,
        users: true,
        categories: true,
        products: true,
      },
    });
    return NextResponse.json({ enterprises }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const logo = data.get("logo");
    var pathImg = "";
    if (logo) {
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const logoPath = path.join(
        process.cwd(),
        "public/images/enterprises/logos",
        logo.name
      );
      await writeFile(logoPath, buffer);
      pathImg = `/images/enterprises/logos/${logo.name}`;
    } else {
      pathImg = data.get("old_logo");
    }
    const enterprise = await prisma.enterprise.create({
      data: {
        enterpriseName: data.get("enterpriseName"),
        logo: pathImg,
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
