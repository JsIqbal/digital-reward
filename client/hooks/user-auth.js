import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

function useAuth(params) {
    const router = useRouter();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [mode, setMode] = useState(`auth/${params.authType}` || "sign-up");

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                `http://localhost:3004/api/${mode}`,
                data
            );

            if (response.status === parseInt(200)) {
                toast.success("Logged in successfully");
                setResource(response);
                setTimeout(() => router.push("/dashboard"), 3000);
            }
            if (response.status === parseInt(201)) {
                toast.success("User created successfully");
                router.push("/auth/sign-in");
                setTimeout(() => window.location.reload("auth/sign-in"), 3000);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    function setResource(response) {
        axios.defaults.headers.common[
            "token"
        ] = `Bearer ${response.data.data.token}`;
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userType", true);
        Cookies.set("token", response.data.data.token);
    }

    const toggleMode = () => {
        setMode(mode === "auth/sign-up" ? "auth/sign-in" : "auth/sign-up");
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        toggleMode,
        mode,
        control,
    };
}

export default useAuth;
