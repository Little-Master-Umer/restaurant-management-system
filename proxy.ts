import { NextResponse,NextRequest } from "next/server";
import { verify, decodetoken } from "./lib/jwt";

export async function proxy(request:NextRequest){
    const token= request.cookies.get("restaurnt_token")?.value;
    // console.log("Token:", token);
    if (!token){
        return NextResponse.redirect(new URL("/login",request.url));
    }

    try {
        // quick client-side expiry check using token `exp` claim
        const decoded:any = decodetoken(token);
        const now = Math.floor(Date.now()/1000);
        if(decoded && typeof decoded.exp === 'number' && decoded.exp <= now){
            if (request.nextUrl.pathname.startsWith("/api/")) {
                const res = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
                res.cookies.delete("restaurnt_token");
                return res;
            }
            const res = NextResponse.redirect(new URL("/login", request.url));
            res.cookies.delete("restaurnt_token");
            return res;
        }

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
       "/api/admin/:path*",
        "/api/dashboard/:path*"
    ]
}
