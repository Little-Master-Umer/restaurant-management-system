import bcrypt from "bcryptjs";
import {cookies} from "next/headers";

import {prisma} from "./prisma";

import { genToken, verify } from "./jwt";

import { login } from "./validation";

const cookieName ="restaurnt_token";

export async function hashPass(password:string):Promise<string>{
     const pass=bcrypt.hash(password,12);
     console.log(pass);
     return pass;
}

export async function comparePass(password:string,hashedPass:string):Promise<boolean>{
    return bcrypt.compare(password,hashedPass);
}
// const admin{
//     id:
//     username:
//     password:
//     role:
//     createdAt:

//     @@map("users")

// }
export async function loginUser(username:string,password:string){
    //interface pasri

    // const [uerr,setUerr]=useState("");
    // const [perr,setPerr]=useState("");

    const result =login.safeParse({
        username,
        password,
    });

    //const newerror:result.error.flatten().fieldErrors

    if(!result.success){
        const newerror= result.error.flatten().fieldErrors
        return ret(
            newerror.username?.[0] ?? "",
            newerror.password?.[0] ?? ""
        );
        
    }

    const admin =await prisma.user.findUnique({
        where:{username},
    });

    // console.log(username);
    // console.log(password);


    if(!admin){
        return ret(
            "Invalid Username",
            ""
        )
    }

    const passwordMatch=await comparePass(
        password,
        admin.password
    );

    if(!passwordMatch){
        return ret(
            "",
            "Invalid Password"
        )  
    }
    // if(passwordMatch){
    //     console.log("Hurrah")
    // }

    const token=genToken({
        id:admin.id,
        username:admin.username,
        role:admin.role,
    });

    const cookieStore=await cookies();
    

    cookieStore.set(cookieName,token,{
        httpOnly:true,
        secure:false,
        //secure:process.env.NODE_ENV==="production", if its deployed then we use so that it can be sent only on httpsw
        sameSite:"strict",
        path:"/",
        maxAge:60*60*24*7,
    });
    const dude={
        success:true,
        admin1:admin,
    }
    //console.log(dude)
    return dude;
}

function ret(usererr: string, passerr: string) {
  console.log(usererr);
  console.log(passerr);
  return {
    success: false,
    error: {
      username: usererr,
      password: passerr,
    },
  };
}

export async function getAdmin(){
    const cookieStore = await cookies();

    const token=cookieStore.get(cookieName)?.value;
    if(!token){
        return null;
    }
    let payload;

    try{
        payload=verify(token);
    }catch{
        return null;
    }

    return prisma.user.findUnique({
        where:{
           id:payload.id
        },
    }); 
}

export async function logout(){
    const cookieStore=await cookies();

    cookieStore.delete(cookieName);
}


