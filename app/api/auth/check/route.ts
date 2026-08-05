import { NextRequest, NextResponse } from "next/server";
import { decodetoken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("restaurnt_token")?.value;
  if (!token) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    const decoded: any = decodetoken(token);
    const exp = decoded?.exp ?? null;
    return NextResponse.json({ success: true, exp }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
