"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceValue } from 'usehooks-ts' // value store delay 
import { useRouter } from "next/router"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"



import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"



function page() {
const [username, setUsername] = useState('')
const [usernameMessage, setUsernameMessage] = useState('')
const [isCheckingusername, setIsCheckingUsername] = useState(false)
const [isSubmiting, setIsSubmitting] = useState(false)

const debounceUsername = useDebounceValue(username, 300)
const router =  useRouter()

// zod imple..........
const form = useForm<z.infer<typeof signUpSchema>>({
    resolver:zodResolver(signUpSchema),
    defaultValues: {username:"",email:"",password:""}
})

useEffect(()=> {
    const checkUsenameUnique = async () =>{
        if(debounceUsername){
            setIsCheckingUsername(true)
            setUsernameMessage('')
            try {
               const response =  await axios.get(`/api/check-username-unique?username=${debounceUsername}`)
               setUsernameMessage(response.data.message)
                
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                setUsernameMessage(axiosError.response?.data.message??"Error checking user")
            }
            finally{
                setIsCheckingUsername(false)
            }
        }
    }
    checkUsenameUnique()
},[debounceUsername])

const onSubmit = async(data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
         const response =  await axios.post<ApiResponse>(`/api/sign-up`, data)
         alert(response.data.message)
         router.replace(`/verify/${username}`)
         setIsSubmitting(false)
    } catch (error) {
        console.log("error in signup pf user", error)
         const axiosError = error as AxiosError<ApiResponse>;
        let errorMessage = axiosError.response?.data.message
        alert(errorMessage)
    }
    setIsSubmitting(false)

}

  return (
   
      <>
      <center>
        <div>
   
         <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} 
                onChange={(e) =>{ field.onChange(e)
                setUsername(e.target.value)
                }}
        
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
         </form>
         </Form>
</div>
      </center>
      </>
 
  )
}

export default page
