import { NextResponse, NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET(req:NextRequest){
    let data:any[] = [];
    try{
        data=await prisma.food.findMany({
            where:{
            },orderBy:{
                createdAt:"desc"
            },take:3,
        });
        return NextResponse.json({
                success:true,
                data,
                message:""
        },{
            status:200
        })

        
    }catch(e){
        return NextResponse.json({
                success:false,
                data,
                message:"Internal Server Error"
        },{
            status:400
        })
    }

}