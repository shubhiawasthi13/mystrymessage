'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Message } from '@/model/User'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'

function page() {
  const [messages,setMessages] = useState<Message[]>([])
  const [isloading, setIsLoading] =useState(false)
  const [isSwitchloading, setIsSwitchLoading] = useState(false)

  const handleDeleteMessage = (messageId:string) =>{
    setMessages(messages.filter((message) => message._id !== messageId))
  }
  const {data: session} = useSession()

  const form = useForm({
    resolver:zodResolver(acceptMessageSchema)
  })
  const {register, watch, setValue} = form;
  const acceptMessages = watch('acceptMessages')
  
  const fetchAcceptMessage = useCallback(async() =>{
    setIsSwitchLoading(true)
    try {
     const response =  await axios.get(`/api/accept-messages`)
     setValue('acceptMessages', response.data.isAcceptingMessage)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.log(axiosError.response?.data.message || "failed to fetch message settings")
    }finally{
      setIsSwitchLoading(false)
    }
  } ,[setValue])

  const fetchMessages = useCallback(async(refresh :boolean = false) =>{
    setIsLoading(true)
    setIsSwitchLoading(false)
    try {
      const response =  await axios.get(`/api/get-messages`)
      setMessages(response.data.messages || [])
      if(refresh){
        alert("Showing latest messages")
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.log(axiosError.response?.data.message || "failed to fetch message")
    }finally{
      setIsLoading(false)
      setIsSwitchLoading(false)
    }

  },[setIsLoading, setMessages])

  useEffect(() => {
    if(!session || !session.user) return
    fetchMessages()
    fetchAcceptMessage()
    
  },[session, setValue, fetchAcceptMessage, fetchMessages])

  // handle switch change 
  const handleSwitchChange = async() =>{
    try {
        const response =  await axios.post(`/api/accept-messages`,{
          acceptMessages:!acceptMessages
        })
        setValue('acceptMessages', !acceptMessages)
        alert(response.data.message)
    } catch (error) {
         const axiosError = error as AxiosError<ApiResponse>
         console.log(axiosError.response?.data.message || "failed to fetch message settings")
    }
  }
  if(!session || !session.user){
    return 
    <div>
      Please Login
    </div>
  }
   const { username } = session.user ;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
   
  };

  return (
    <div>
      <h1>Dashboard</h1>
    
    </div>
  )
}

export default page
