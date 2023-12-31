import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useAddProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addProfile = async (values) => {
        setIsLoading(true);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/profile`,
                values,
                {
                    withCredentials: true,
                }
            );
            if (response.status === parseInt(201)) {
                toast.success("KYC Successfully Submitted!");
                setTimeout(() => window.location.reload("/dashboard"), 3000);
                // window.location.reload("/dashboard");
            }
            setIsLoading(false);
            return response.data;
        } catch ({ message }) {
            toast.error(message);
            setError(error);
            setIsLoading(false);
            throw error;
        }
    };

    return { addProfile, isLoading, error };
};
