import {prisma} from "@/lib/prisma";
import { NextRequest ,NextResponse } from "next/server";

export async function GET(req:NextRequest){

    

    //const body =await req.json();
    const startDay = new Date();
    startDay.setHours(0, 0, 0, 0);

    const startTomorrow = new Date(startDay);
    startTomorrow.setDate(startTomorrow.getDate() + 1);

    // console.log(startDay);
    // console.log(startTomorrow );
    try {
        const totalorders=await prisma.order.count({
            where:{
                createdAt:{
                    gte:startDay,
                    lte:startTomorrow ,
                },
            },
        });

        //console.log(totalorders);

        const pendingor=await prisma.order.count({
            where:{
                status:"PENDING",
                createdAt:{
                    gte:startDay,
                    lte:startTomorrow ,
                },
            },
        });

        const deliveredor=await prisma.order.count({
            where:{
                status:"DELIVERED",
                createdAt:{
                    gte:startDay,
                    lte:startTomorrow ,
                },
            },
        });

        const cancelledor=await prisma.order.count({
            where:{
             status:"CANCELLED",
                createdAt:{
                    gte:startDay,
                    lte:startTomorrow ,
                },
            },
        });

       const revenue=await prisma.order.aggregate({
            where:{
                createdAt:{
                    gte:startDay,
                    lte:startTomorrow ,
                }
                },_sum:{
                    total:true,
                },
            });

        const totalRevenue=revenue._sum.total??0;

        return NextResponse.json(
             {
                 success: true,
                 data: {
                     total: totalorders,
                     pending:pendingor,
                     delivered: deliveredor,
                     revenue: totalRevenue,
                     cancelled: cancelledor,
                 },
                 message: " ",
             },
             { status: 200 }
        );



        
    } catch (error) {
         console.error(error);

         return NextResponse.json(
             {
                 success: false,
                 data: {
                     total: 0,
                     pending: 0,
                     delivered: 0,
                     revenue: 0,
                     cancelled: 0,
                 },
                 message: "Failed to fetch dashboard statistics.",
             },
             { status: 500 }
         );
    }
    




}