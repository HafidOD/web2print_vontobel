import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        enterprises: true,
        products: true,
      },
    });
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { enterprises, ...newCategory } = await request.json();
    const connect = enterprises.reduce((arr, item) => {
      arr.push({ id: item });
      return arr;
    }, []);
    const category = await prisma.category.create({
      data: {
        categoryName: newCategory.categoryName,
        imageCategory: newCategory.imageCategory,
        parentCategory: newCategory.parentCategory,
        enterprises: {
          connect: connect,
        },
      },
    });

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
