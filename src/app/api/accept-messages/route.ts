import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModal from "@/model/User";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function POST(request:Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if(!session || !session.user){
           return Response.json(
            {
             success:false,
             message:"Not authenticated"
            },
            {
                status:401
            }
            )
     }

     const userId = user._id;
     const {acceptMessages} = await request.json()
     try{
      const updatedUser = await UserModal.findByIdAndUpdate(
        userId,
        {isAcceptingMessage:acceptMessages},
        {new:true}
      )
      if(!updatedUser){
         return Response.json(
            {
             success:false,
             message:"Failed to update user status to accept messages "
            },
            {
                status:401
            }
            )
      }
       return Response.json(
            {
             success:true,
             message:"message acceptance status updated successfully ",
             updatedUser
            },
            {
                status:201
            }
            )
     }
     catch(error){
        console.log("Failed to update user status to accept messages")
        return Response.json(
            {
             success:false,
             message:"Failed to update user status to accept messages "
            },
            {
                status:500
            }
            )
     }
}


export async function GET(request:Request){
      await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if(!session || !session.user){
           return Response.json(
            {
             success:false,
             message:"Not authenticated"
            },
            {
                status:401
            }
            )
     }

     const userId = user._id;

    try{
         const foundUser = await UserModal.findById(userId)
       if(!foundUser){
         return Response.json(
            {
             success:false,
             message:"user not found "
            },
            {
                status:401
            }
            )
      }
       return Response.json(
            {
             success:true,
             isAcceptingMessage: foundUser.isAcceptingMessage
            },
            {
                status:201
            }
            )
    }
   catch(error){
        console.log("Error in getting message acceptance status")
        return Response.json(
            {
             success:false,
             message:"Error in getting message acceptance status"
            },
            {
                status:500
            }
            )
     }
      
      
}