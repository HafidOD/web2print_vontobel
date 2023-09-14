import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { writeFile } from "fs/promises";
import path from "path";

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dfvesf8qn', 
  api_key: '118274489362436', 
  api_secret: 'Ez68b5lfWNMmQMjd5jr8IGXcY5Y' 
});

export async function GET(request) {
  try {
    const products = await prisma.product.findMany({
      include: {
        enterprise: true,
        categories: true,
      },
    });
    return NextResponse.json({ products: products }, { status: 200 });
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
    // console.log(data);
    const imageProduct = data.get('imageProduct');
    //  console.log(data);
    if (imageProduct){
      const bytes = await imageProduct.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // const logoPath = path.join(process.cwd(), 'public/images/products', imageProduct.name)
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
    const categoriesIds = data.get('categories').split(",").map(id => ({ id: parseInt(id) }));
    const booleanValue = data.get("published") === "true";
    // console.log(booleanValue);
  
    const product = await prisma.product.create({
      data: {
        sku: data.get('sku'),
        nameProduct: data.get('nameProduct'),
        imageProduct: res.secure_url,
        priceLocal: parseInt(data.get('priceLocal')),
        priceNacional: parseInt(data.get('priceNacional')),
        priceExt: parseInt(data.get('priceExt')),
        descriptionProduct: data.get('descriptionProduct'),
        stockProduct: parseInt(data.get('stockProduct')),
        unitsPackage: parseInt(data.get('unitsPackage')),
        published: booleanValue,
        enterpriseId: parseInt(data.get('enterpriseId')),
        categories: {
          connect: categoriesIds,
        },
      },
    });
    // return NextResponse.json({ mensaje: "ok" }, { status: 200 });
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
