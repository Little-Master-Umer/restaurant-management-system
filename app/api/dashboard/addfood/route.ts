import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FoodCategory } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name")?.toString().trim() ?? "";
    const description = formData.get("description")?.toString().trim() ?? "";
    const price = formData.get("price")?.toString().trim() ?? "";
    const category = formData.get("category")?.toString().trim().toUpperCase() ?? "";
    const isAvailable = formData.get("isAvailable") === "true" || formData.get("isAvailable") === "on";
    const imageFile = formData.get("image");

    if (!name || !description || !price || !category) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const parsedPrice = Number(price);
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return NextResponse.json(
        { success: false, message: "Price must be a valid positive number." },
        { status: 400 }
      );
    }

    if (!Object.values(FoodCategory).includes(category as FoodCategory)) {
      return NextResponse.json(
        { success: false, message: "Invalid category selected." },
        { status: 400 }
      );
    }

    let imagePath: string | null = null;
    if (imageFile && imageFile instanceof File) {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });

      const extension = path.extname(imageFile.name) || ".jpg";
      const filename = `${Date.now()}-${randomUUID()}${extension}`;
      const filePath = path.join(uploadDir, filename);

      const bytes = await imageFile.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));
      imagePath = `/uploads/${filename}`;
    }

    const food = await prisma.food.create({
      data: {
        name,
        description,
        price: parsedPrice,
        category: category as FoodCategory,
        isAvailable,
        image: imagePath ?? undefined,
      },
    });

    return NextResponse.json(
      { success: true, message: "Food added successfully", data: food },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to add food", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
