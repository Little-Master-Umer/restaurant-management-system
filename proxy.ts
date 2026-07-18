import { NextResponse,NextRequest } from "next/server";
import { verify } from "./lib/jwt";

export async function proxy(request:NextRequest){
    const token= request.cookies.get("restaurnt_token")?.value;
    // console.log("Token:", token);
    if (!token){
        return NextResponse.redirect(new URL("/login",request.url));
    }

    try {
        const payload = verify(token);
        if (payload.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
        
    } catch (err) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
}

export const config={
    matcher:[
        "/dashboard/:path*",
        "/api/admin/:path*"
    ]
}
