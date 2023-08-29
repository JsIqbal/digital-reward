"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

export default function Page({ params }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const router = useRouter();

    const [mode, setMode] = useState(`auth/${params.authType}` || "sign-up");
    console.log(mode);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                `http://localhost:3004/api/${mode}`,
                data
            );

            if (response.data.data.token) {
                axios.defaults.headers.common[
                    "token"
                ] = `Bearer ${response.data.data.token}`;
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userType", true);
                Cookies.set("token", response.data.data.token);
            }

            toast.success(`You have successfully ${mode}ed!`);
            router.push("/dashboard");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const toggleMode = () => {
        setMode(mode === "auth/sign-up" ? "auth/sign-in" : "auth/sign-up");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Toaster />
            <div className="flex justify-center items-center">
                <div className="w-full max-w-md bg-white shadow-md rounded-md p-6">
                    <h1 className="text-2xl mb-4">
                        {mode === "auth/sign-up"
                            ? "Create an account"
                            : "Log in to your account"}
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {mode === "auth/sign-up" && (
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    {...register("name", {
                                        required: mode === "auth/sign-up",
                                    })}
                                    className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ${
                                        errors.name && "border-red-500"
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        Name is required
                                    </p>
                                )}
                            </div>
                        )}
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Username
                            </label>
                            <Input
                                id="username"
                                type="username"
                                {...register("username", { required: true })}
                                className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ${
                                    errors.username && "border-red-500"
                                }`}
                            />
                            {errors.username && (
                                <p className="text-sm text-red-500 mt-1">
                                    Username is required
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password", { required: true })}
                                className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ${
                                    errors.password && "border-red-500"
                                }`}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">
                                    Password is required
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            variantcolor="blue"
                            className="w-full py-3 mt-6"
                        >
                            {mode === "auth/sign-up" ? "Sign up" : "Sign in"}
                        </Button>
                    </form>
                    <p className="text-sm text-gray-600 mt-4 text-center">
                        {mode === "auth/sign-up"
                            ? "Already have an account?"
                            : "Don't have an account?"}{" "}
                        <Button variant="link" onClick={toggleMode}>
                            {mode === "auth/sign-up" ? "Sign in" : "Sign up"}
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    );
}
