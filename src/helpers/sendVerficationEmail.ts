import { resend } from "@/lib/resend";
import VerficationEmail from "../../emails/verficationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerficationEmail(
    email:string,
    username:string,
    verifyCode:string
): Promise<ApiResponse>{
try{
    await resend.emails.send({
    from: 'onboarding@resend.dev>',
    to: email,
    subject: 'Mystry Message | Verfication Code',
    react: VerficationEmail({username,otp:verifyCode}),
    });
      return{success:true,message:"verfication email send successfully"}
}
catch(emailError){
    console.error("Error sending verfication email", emailError)
    return{success:false,message:"failed to send verfication email"}
}
}