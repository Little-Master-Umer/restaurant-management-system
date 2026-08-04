import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.food.count({
      where: {
        isAvailable: true,
      },
    });

    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error("Failed to fetch food count", error);
    return NextResponse.json(
      { success: false, count: 0, message: "Unable to fetch available items" },
      { status: 500 }
    );
  }
}
