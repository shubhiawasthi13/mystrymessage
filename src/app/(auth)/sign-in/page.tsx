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
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"




function page() {
const [isSubmiting, setIsSubmitting] = useState(false)

const router =  useRouter()

// zod imple..........
const form = useForm<z.infer<typeof signInSchema>>({
    resolver:zodResolver(signInSchema),
    defaultValues: {identifier:"",password:""}
})


const onSubmit = async(data: z.infer<typeof signInSchema>) => {
  const result =  await signIn('credentials',{
    redirect: false,
    identifier:data.identifier,
    password:data.password
   })
   if(result?.error){
    alert("incorrect username and password")

   }
   if(result?.url){
    router.replace('./dashboard')
   }

}

  return (
   
      <>
    
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
  <div className="text-center mb-6">
    <h1 className="text-2xl font-bold text-gray-800">Join Mystry Message</h1>
    <p className="text-sm text-gray-500">Sign in to start your anonymous adventure</p>
  </div>

  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
  

      {/* Email Field */}
      <FormField
        control={form.control}
        name="identifier"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block text-sm font-medium text-gray-700">Email/username</FormLabel>
            <FormControl>
              <Input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email/username"
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
          'Signin'
        )}
      </Button>
    </form>
  </Form>

  <div className="mt-4 text-center">
    <p className="text-sm text-gray-600">
      Not register?{' '}
      <Link href="/sign-up" className="text-blue-600 hover:underline">
        Sign up
      </Link>
    </p>
  </div>
</div>

      
      </>
 
  )
}

export default page
