import dbConnect from "@/lib/dbConnect";
import UserModal from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerficationEmail } from "@/helpers/sendVerficationEmail";

export async function POST(request: Request) {
    await dbConnect()
    try{
        const {username, email, password} = await request.json()
        const existingUserVerfiedByUsername = await UserModal.findOne({
            username,
            isVerified:true
        })
        if(existingUserVerfiedByUsername){
            return Response.json({
                success:false,
                message:"Username is already taken"
            }), {status:400}
        }
        const existingUserByEmail = await UserModal.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random()*900000).toString()
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                success:false,
                message:"user already exist with this email"
            },{status:400})
            }else{
                const hashPassword =  await bcrypt.hash(password,10)
                existingUserByEmail.password = hashPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
            }
        }else{
           const hashedPassword =  await bcrypt.hash(password,10)
           const expiryDate = new Date()
           expiryDate.setHours(expiryDate.getHours() +1)

          const newUser = new UserModal({
               username,
               email,
               password:hashedPassword,
               verifyCode,
               isVerified:false,
               verifyCodeExpiry:expiryDate,
               isAcceptingMessage:true,
               messages:[]
           })
           await newUser.save()
        }
        // send verification email
        const emailResponse = await sendVerficationEmail(
            email,
            username,
            verifyCode
        )
        if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message
            },{status:500})
        }
         return Response.json({
                success:true,
                message:"User Register successfully. PLease verfy your email"
            },{status:201})

    }catch(error){
        console.log("error registering user",error)
        return Response.json({
            success:false,
            message:"error registering user"
        },
        {
            status:500
        }
    )
    }
    
}
