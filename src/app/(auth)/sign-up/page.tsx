"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback} from 'usehooks-ts' // value store delay 
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import {Loader2} from "lucide-react"



import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
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

const debounceUsername = useDebounceCallback(setUsername, 300)
const router =  useRouter()

// zod imple..........
const form = useForm<z.infer<typeof signUpSchema>>({
    resolver:zodResolver(signUpSchema),
    defaultValues: {username:"",email:"",password:""}
})

useEffect(()=> {
    const checkUsenameUnique = async () =>{
        if(username){
            setIsCheckingUsername(true)
            setUsernameMessage('')
            try {
               const response =  await axios.get(`/api/check-username-unique?username=${username}`)
               console.log(response.data.message)
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
},[username])

const onSubmit = async(data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
         const response =  await axios.post<ApiResponse>(`/api/sign-up`, data)
         alert(response.data.message)
         router.replace(`/verify/${username}`)
         setIsSubmitting(false)
    } catch (error) {
        console.log("error in signup of user", error)
         const axiosError = error as AxiosError<ApiResponse>;
        let errorMessage = axiosError.response?.data.message
        alert(errorMessage)
    }
    setIsSubmitting(false)

}

  return (
   
      <>
    
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
  <div className="text-center mb-6">
    <h1 className="text-2xl font-bold text-purple-800">Join Mystry Message</h1>
    <p className="text-sm text-gray-500">Signup to start your anonymous adventure</p>
  </div>

  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Username Field */}
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block text-sm font-medium text-gray-700">Username</FormLabel>
            <FormControl>
              <Input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="username"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  debounceUsername(e.target.value);
                }}
              />
            </FormControl>
            {isCheckingusername && <Loader2 className="animate-spin"/>}
            <p className={`text-sm mt-1 ${usernameMessage === "username available" ? 'text-green-500' : 'text-red-500'}`}>
              test: {usernameMessage}
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Email Field */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block text-sm font-medium text-gray-700">Email</FormLabel>
            <FormControl>
              <Input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Password Field */}
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block text-sm font-medium text-gray-700">Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmiting}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmiting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          'Signup'
        )}
      </Button>
    </form>
  </Form>

  <div className="mt-4 text-center">
    <p className="text-sm text-gray-600">
      Already a member?{' '}
      <Link href="/sign-in" className="text-blue-600 hover:underline">
        Sign in
      </Link>
    </p>
  </div>
</div>

      
      </>
 
  )
}

export default page
