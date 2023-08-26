"use client"


import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Page({ params }) {
  // use react-hook-form to handle the form data and validation
  const { register, handleSubmit, formState: { errors } } = useForm()

  // use router to navigate to the dashboard page
  const router = useRouter()

  // use state to store the mode of the page (sign-up or sign-in)
  const [mode, setMode] = useState(params.authType || "sign-up")

  // define a function to handle the form submission
  const onSubmit = async (data) => {
    try {
      // send a post request to the backend api with the form data
      const response = await axios.post(`/api/${mode}`, data)
      // get the userJWT token from the response
      const userJWT = response.data.userJWT
      // set the userJWT token in localStorage
      localStorage.setItem('userJWT', userJWT)
      // show a success toast message
      toast.success(`You have successfully ${mode}ed!`)
      // redirect the user to the dashboard page
      router.push('/dashboard')
    } catch (error) {
      // show an error toast message
      toast.error(error.response.data.message)
    }
  }

  // define a function to toggle the mode of the page
  const toggleMode = () => {
    setMode(mode === 'sign-up' ? 'sign-in' : 'sign-up')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md bg-white shadow-md rounded-md p-6">
          <h1 className="text-2xl mb-4">
            {mode === 'sign-up' ? 'Create an account' : 'Log in to your account'}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <Input
                id="name"
                type="text"
                {...register('name', { required: mode === 'sign-up' })}
                className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ${
                  errors.name && 'border-red-500'
                }`}
              />
              {errors.name && (
                <p  className="text-sm text-red-500 mt-1">
                  Name is required
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                {...register('email', { required: true })}
                className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ${
                  errors.email && 'border-red-500'
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  Email is required
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                {...register('password', { required: true })}
                className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ${
                  errors.password && 'border-red-500'
                }`}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  Password is required
                </p>
              )}
            </div>
            <Button type="submit" variantColor="blue" className="w-full py-3 mt-6">
              {mode === 'sign-up' ? 'Sign up' : 'Sign in'}
            </Button>
          </form>
          <p className="text-sm text-gray-600 mt-4 text-center">
            {mode === 'sign-up' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Button variant="link" onClick={toggleMode}>
              {mode === 'sign-up' ? 'Sign in' : 'Sign up'}
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}

