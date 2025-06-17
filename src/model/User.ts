import mongoose,{ Schema, Document} from "mongoose";  

export interface Message extends Document{
    content: string;
    createdAt: Date;
}
export interface User extends Document{
   username:string;
   email:string;
   password:string;
   verifyCode:string;
   isVerified:boolean;
   verifyCodeExpiry:Date;
   isAcceptingMessage:boolean;
   messages:Message[];

}


const MessageSchema : Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        required:true,
        default:Date.now
    }

})


const UserSchema : Schema<User> = new Schema({
    username:{
       type:String,
       required:[true, "Username is required"],
       trim :true,
       unique:true,
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:true,
        
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    verifyCode:{
        type:String,
        required:[true, "verifyCode is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true, "verifyCode expiry is required"]
    },
    isVerified:{
        type:Boolean,
        default:false

    },
    isAcceptingMessage:{
        type:Boolean,
        default:true

    },
    messages:[MessageSchema],
   
})

const UserModal =  (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)
export default UserModal



































































































// DATABASE_URI= "ZnsTJdAdbzDptyvp/"
// RESEND_API_KEY="re_F2NVFioh_6v5fBfLWW84mdTipxMNWUaRd"
// NEXTAUTH_SECERET="hdkdjujhsjsojsjojho"
