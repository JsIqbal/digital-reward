import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useAddProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const addProfile = async (values) => {
        setIsLoading(true);

        try {
            const response = await axios.post(
                `http://localhost:3004/api/users/profile`,
                values,
                {
                    withCredentials: true,
                }
            );
            if (response.status === parseInt(201)) {
                toast.success("KYC Successfully Submitted!");
                setTimeout(() => window.location.reload("/dashboard"), 3000);
            }
            setIsLoading(false);
            return response.data;
        } catch (error) {
            setError(error);
            setIsLoading(false);
            throw error;
        }
    };

    return { addProfile, isLoading, error };
};
