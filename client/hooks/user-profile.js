import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const userJWT = Cookies.get("token");

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3004/api/admins/profile",
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                setProfile(response.data);
            } else {
                setProfile(null);
            }
        } catch (error) {
            setProfile(null);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [userJWT]);

    return profile;
};

export default useProfile;