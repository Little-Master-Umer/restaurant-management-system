import { login } from "@/lib/validation";
import { NextRequest ,NextResponse } from "next/server";
import { loginUser } from "@/lib/auth";
import { genToken } from "@/lib/jwt";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { error } from "console";


export async function POST(req:NextRequest){

    

    const body= await req.json();
    const abc=await loginUser(body.username,body.password);

    if(!abc.success){
        return NextResponse.json(abc,{
            status:400,
        });
    }
    if (abc.success){
        console.log(abc)
        return NextResponse.json(abc,{
            status:200,
        })
    }







}