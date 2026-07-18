import { NextResponse,NextRequest } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(req:NextRequest){

    const {searchParams}=new URL(req.url);
    const days=Number(searchParams.get("days"))||7;

    const startDate=new Date();
    const endDate=new Date();
    startDate.setDate(endDate.getDate()-days+1);
    const grouped: Record<string, {
        date: string;
        totalOrders: number;
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

        for (const order of orders){
            const dateKey=order.createdAt.toISOString().split("T")[0];
            if (!grouped[dateKey]){
                grouped[dateKey]={
                    date:dateKey,
                    totalOrders: 0,
                    pending: 0,
                    delivered: 0,
                    cancelled: 0,
                }
            }
            grouped[dateKey].totalOrders++;
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
        
        return NextResponse.json(
            {
                success:"true",
                grouped,
                message:""
            },{
                status:200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success:"false",
                grouped,
                message:"Internal Server Error"
            },{
                status:404,
            }
        );

        
    }

    
    




}