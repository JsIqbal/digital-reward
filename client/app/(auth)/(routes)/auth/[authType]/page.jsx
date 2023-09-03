"use client";

import { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import useAuth from "@/hooks/user-auth";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
    const router = useRouter();
    const { register, handleSubmit, errors, onSubmit, toggleMode, mode } =
        useAuth(params);

    return (
        <div className="container mx-auto px-4 py-8">
            <Toaster />
            <div className="flex justify-center items-center">
                <div className="w-full max-w-md bg-white shadow-md rounded-md p-6">
                    <div className="flex justify-between">
                        <h1 className="text-2xl mb-4">
                            {mode === "auth/sign-up"
                                ? "Create an account"
                                : "Log in to your account"}
                        </h1>
                        <X
                            className="cursor-pointer"
                            onClick={() => router.push("/")}
                        />
                    </div>

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
