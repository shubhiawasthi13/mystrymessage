"use client"
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import { verifySchema } from '@/schemas/verifySchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
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

function VerifyAccount() {
    const router = useRouter()
    const params = useParams<{username: string}>()

    // zod imple..........
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver:zodResolver(verifySchema),
       
    })
    const onSubmit = async (data: z.infer<typeof verifySchema>) =>{
        try {
          const Response =   await axios.post(`/api/verify-code`,{
                username :params.username,
                code:data.code
            }) 
            alert(Response.data.message)
            router.replace(`/sign-in`)
        } catch (error) {
            console.log("error in verify user", error)
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message
            alert(errorMessage)
        }
    }

  return (
   <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
  <div className="text-center mb-6">
    <h1 className="text-2xl font-bold text-gray-800">Verify Your Account</h1>
    <p className="text-sm text-gray-500">Enter the verification code sent to your email</p>
  </div>

  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Verification Code Field */}
      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block text-sm font-medium text-gray-700">
              Verification Code
            </FormLabel>
            <FormControl>
              <Input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter code"
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
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        Submit
      </Button>
    </form>
  </Form>
</div>

  )
}

export default VerifyAccount
