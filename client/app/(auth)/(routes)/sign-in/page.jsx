// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//     return <SignIn />;
// }

"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/api/users/login",
                {
                    email,
                    password,
                }
            );
            console.log(response.data.message);
            if (response.data.data.token) {
                axios.defaults.headers.common[
                    "token"
                ] = `Bearer ${response.data.data.token}`;
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("isLoggedIn", true);

                router.push({
                    pathname: "/admin/dashboard",
                    query: { isLoggedIn: true },
                });
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            } else {
                setError(
                    "An error occurred while logging in. Please try again later."
                );
            }
        }
    };

    return (
        <div>
            <h1>Login Page</h1>

            <form class="form">
                <p class="form-title">Sign in to your account</p>
                <div class="input-container">
                    <input placeholder="Enter email" type="email" />
                    <span>
                        <svg
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                stroke-width="2"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                            ></path>
                        </svg>
                    </span>
                </div>
                <div class="input-container">
                    <input placeholder="Enter password" type="password" />

                    <span>
                        <svg
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                stroke-width="2"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                            ></path>
                            <path
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                stroke-width="2"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                            ></path>
                        </svg>
                    </span>
                </div>
                <button class="submit" type="submit">
                    Sign in
                </button>

                <p class="signup-link">
                    No account?
                    <Link href="/sign-up">Sign up</Link>
                </p>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
};

export default Page;
