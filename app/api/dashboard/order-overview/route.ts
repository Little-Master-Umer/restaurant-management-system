import { NextResponse,NextRequest } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(req:NextRequest){

    const {searchParams}=new URL(req.url);
    const days=Number(searchParams.get("days"))||7;

    const startDate=new Date();
    const endDate=new Date();
    startDate.setDate(endDate.getDate()-days+1);
    const grouped: Record<string, {
        day: string;
        totalorders: number;
        pending: number;
        delivered: number;
        cancelled: number;
    }> = {};

    try {
        const orders=await prisma.order.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            select: {
              createdAt: true,
              status: true,
            },          
        });

        //console.log(orders);
        for (const order of orders){
            const dateKey=order.createdAt.toISOString().split("T")[0];
            if (!grouped[dateKey]){
                grouped[dateKey]={
                    day:dateKey,
                    totalorders: 0,
                    pending: 0,
                    delivered: 0,
                    cancelled: 0,
                }
            }
            grouped[dateKey].totalorders++;
            switch (order.status) {
                case "PENDING":
                    grouped[dateKey].pending++;
                    break;

                case "DELIVERED":
                    grouped[dateKey].delivered++;
                    break;

                case "CANCELLED":
                    grouped[dateKey].cancelled++;
                    break;
            }

        }  
        const data = Object.values(grouped);

        
        return NextResponse.json(
            {
                success:true,
                data,
                message:""
            },{
                status:200,
            }
        );
    } catch (error) {
        const data = Object.values(grouped);
        return NextResponse.json(
            {
                success:false,
                data,
                message:"Internal Server Error"
            },{
                status:404,
            }
        );

        
    }

    
    




}