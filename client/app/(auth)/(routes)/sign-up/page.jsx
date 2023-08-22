// import { SignUp } from "@clerk/nextjs";

// export default function Page() {
//     return <SignUp />;
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
        <form class="form">
            <p class="title">Register </p>
            <p class="message">Signup now and get full access to our app. </p>
            <div class="flex">
                <label>
                    <input
                        required=""
                        placeholder=""
                        type="text"
                        class="input"
                    />
                    <span>Firstname</span>
                </label>

                <label>
                    <input
                        required=""
                        placeholder=""
                        type="text"
                        class="input"
                    />
                    <span>Lastname</span>
                </label>
            </div>

            <label>
                <input required="" placeholder="" type="email" class="input" />
                <span>Email</span>
            </label>

            <label>
                <input
                    required=""
                    placeholder=""
                    type="password"
                    class="input"
                />
                <span>Password</span>
            </label>
            <label>
                <input
                    required=""
                    placeholder=""
                    type="password"
                    class="input"
                />
                <span>Confirm password</span>
            </label>
            <button class="submit">Submit</button>
            <p class="signin">
                Already have an acount ? <Link href="/sign-in">Signin</Link>{" "}
            </p>
        </form>
    );
};

export default Page;
