import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const useUser = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const userJWT = Cookies.get("token");

    const fetchUser = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3004/api/users/user",
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                setIsSignedIn(true);
            } else {
                setIsSignedIn(false);
            }
        } catch (error) {
            setIsSignedIn(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [userJWT]);

    return {
        isSignedIn,
    };
};

export default useUser;
