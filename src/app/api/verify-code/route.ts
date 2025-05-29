import dbConnect from "@/lib/dbConnect";
import UserModal from "@/model/User";


export async function POST(request:Request) {
    await dbConnect()
    try{
     const {username, code} = await request.json()
     const decodedUsername = decodeURIComponent(username)
     const user = await UserModal.findOne({username:decodedUsername})
     if(!user){
           return Response.json(
            {
             success:false,
             message:"user not found"
            },
            {
                status:500
            }
            )
    }
    const isCodeValid = user.verifyCode === code
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()
     if(isCodeValid && isCodeNotExpired){ 
        user.isVerified =true
        await user.save()
        return Response.json(
            {
             success:true,
             message:"verification successfull"
            },
            {
                status:200
            }
            )
     }
     else if(!isCodeNotExpired){
        return Response.json(
            {
             success:false,
             message:"Verify code has expired, please signup again to get code "
            },
            {
                status:400
            }
            )
     }else{
        return Response.json(
            {
             success:false,
             message:"Verification code incoreect"
            },
            {
                status:400
            }
            )
     }

    }
      catch(error){
        console.log("Error verifying user", error)
        return Response.json(
            {
             success:false,
             message:"Error verifying user"
            },
            {
                status:500
            }
    )
    }
}