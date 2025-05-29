import dbConnect from "@/lib/dbConnect";
import UserModal from "@/model/User";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const usernameQuerySchema = z.object({
    username:usernameValidation

})

export async function GET(request:Request) {
    await dbConnect()
    try{
        const {searchParams} = new URL (request.url)
        const queryPararm ={
            username:searchParams.get('username')
        }
        // validate with zod
        const result = usernameQuerySchema.safeParse(queryPararm)
        console.log(result)
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors ||[]
               return Response.json(
            {
             success:false,
             message:usernameErrors?.length > 0
             ? usernameErrors.join(', ')
             :'invailid query parameters'
            },
            {
                status:400
            }
    )
        }
        const {username} = result.data
        const existingVerfiedUser = await UserModal.findOne({username,isVerified:true})
        if(existingVerfiedUser){
            return Response.json(
            {
             success:false,
             message:"username already taken"
            },
            {
                status:400
            }
         )
        }
           return Response.json(
            {
             success:true,
             message:"username available"
            },
            {
                status:200
            }
    )

    }
    catch(error){
        console.log("Error checking username", error)
        return Response.json(
            {
             success:false,
             message:"error checking username"
            },
            {
                status:500
            }
    )
    }

    
}