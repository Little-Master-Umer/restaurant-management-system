import { error } from "console";
import jwt from "jsonwebtoken";

const secret= process.env.JWT_SECRET!;
if(!secret){
    throw new Error("Secret key is missing!")

}

export interface payloadT{
    id:string;
    username:string;
    role:'CUSTOMER'|'ADMIN';
}

export function genToken(payload:payloadT):string{
   // console.log("reached");
    return jwt.sign(payload,secret,{
        expiresIn:"7d",
    });
}

export function verify (token:string):payloadT{
    try{
        return jwt.verify(token,secret)as payloadT
    }catch(error){
        throw new Error("Verification Failed!")

    }
    
}

export function decodetoken(token :string):payloadT|null{
    return jwt.decode(token) as payloadT|null;
}
