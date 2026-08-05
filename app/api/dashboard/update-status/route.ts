import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // ensure admin
    const admin = await getAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized - Admin access required" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status } = body as { id?: string; status?: string };
    if (!id || !status) {
      return NextResponse.json({ success: false, message: "Missing parameters: id and status required" }, { status: 400 });
    }

    // map UI status to prisma OrderStatus enum
    const mapping: Record<string, string> = {
      PENDING: "PENDING",
      PREPARATION: "PREPARATION",
      DELIVERED: "DELIVERED",
      CANCELLED: "CANCELLED",
    };

    const mapped = mapping[status] ?? status;

    const updated = await prisma.order.update({
      where: { id },
      data: { status: mapped as any },
    });
    return NextResponse.json({ success: true, order: updated });
  } catch (err) {
    console.error('Update error:', err);
    return NextResponse.json({ success: false, message: "Update failed: " + (err instanceof Error ? err.message : "Unknown error") }, { status: 500 });
  }
}
