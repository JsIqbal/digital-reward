import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [profileStatus, setProfileStatus] = useState(false);
    const userJWT = Cookies.get("token");

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3004/api/users/profile",
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                setProfile(response.data);
                setProfileStatus(true);
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

    return { profile, profileStatus };
};

export default useProfile;
