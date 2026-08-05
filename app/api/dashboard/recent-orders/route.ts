import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            food: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5, // Get last 5 orders
    });

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      customer: order.customerName,
      items: order.items
        .map((item) => `${item.quantity}x ${item.food.name}`)
        .join(", "),
      amount: `$${order.total}`,
      status: order.status,
      time: formatTimeAgo(order.createdAt),
    }));

    return NextResponse.json(
      {
        success: true,
        data: formattedOrders,
        message: "Orders fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}
