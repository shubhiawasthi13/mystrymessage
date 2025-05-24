import {z} from "zod";
import { email } from "zod/v4";

// single validation
export const usernameValidation  = z
.string()
.min(2,"usename must be atleast 2 characters")
.max(20,"usename must not be more than 20 characters")
.regex(/^[a-zA-Z0-9_]+$/,"username must not conatin any special characters")

// multiple validation in  single object
export const signUpSchema  = z.object({
    username: usernameValidation,
    email:z.string() .email({message:"invalid email address"}),
    password:z.string() .min(6,{message:"password must be atleast 6 characters"})
})