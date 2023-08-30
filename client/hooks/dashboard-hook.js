import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "./user-hook";

const useDashboardLogic = () => {
    const { isSignedIn } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (!isSignedIn) {
            router.push("auth/sign-in");
        }
    }, [isLoading, isSignedIn, router]);

    useEffect(() => {
        const fetchUserData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setIsLoading(false);
        };

        fetchUserData();
    }, []);

    return { isLoading, isSignedIn };
};

export default useDashboardLogic;
