import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

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
    const { categories, ...newProduct } = await request.json();

    const connect = categories.reduce((arr, item) => {
      arr.push({ id: item });
      return arr;
    }, []);
    const product = await prisma.product.create({
      data: {
        sku: newProduct.sku,
        nameProduct: newProduct.nameProduct,
        imageProduct: newProduct.imageProduct,
        priceLocal: newProduct.priceLocal,
        priceNacional: newProduct.priceNacional,
        priceExt: newProduct.priceExt,
        descriptionProduct: newProduct.descriptionProduct,
        stockProduct: newProduct.stockProduct,
        unitsPackage: newProduct.unitsPackage,
        published: newProduct.published,
        enterpriseId: newProduct.enterpriseId,
        categories: {
          connect: connect,
        },
      },
    });
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
