import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
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
    const data = await request.formData();
    const imageCategory = data.get('imageCategory');
    // console.log(imageCategory);
    if (imageCategory){
      const bytes = await imageCategory.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const logoPath = path.join(process.cwd(), 'public/images/categories', imageCategory.name)
      await writeFile(logoPath, buffer)
    }
    const enterpriseIds = data.get('enterprises').split(",").map(id => ({ id: parseInt(id) }));
    // console.log(enterpriseIds);
    const category = await prisma.category.create({
      data: {
        categoryName: data.get('categoryName'),
        imageCategory: `/images/categories/${imageCategory.name}`,
        parentCategory: parseInt(data.get('parentCategory')),
        enterprises: {
          connect: enterpriseIds,
        },
      },
    });

    // return NextResponse.json({ message: "ok" }, { status: 200 });
    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
