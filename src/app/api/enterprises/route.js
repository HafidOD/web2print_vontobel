import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

import prisma from "@/libs/prisma";

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dfvesf8qn', 
  api_key: '118274489362436', 
  api_secret: 'Ez68b5lfWNMmQMjd5jr8IGXcY5Y' 
});

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
    const logo = data.get('logo');
    //  console.log(data);
    if (logo){
      const bytes = await logo.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // const logoPath = path.join(process.cwd(), 'public/images/enterprises/logos', logo.name)
      // await writeFile(logoPath, buffer)

       var res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
          },
          async (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            }

            resolve(result);
          }
        )
        .end(buffer);
    });
    }
    // console.log(res.secure_url);
    const enterprise = await prisma.enterprise.create({
      data: {
        enterpriseName: data.get('enterpriseName'),
        logo: res.secure_url,
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
