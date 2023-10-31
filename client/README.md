problem : route issue

fix: can use dynamic routes

fix: can use profile api and render only the kyc form in all the routes. if not profile

recycled:

```js
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useProfile = () => {
    const [profile, setProfile] = useState([]);
    const [profileStatus, setProfileStatus] = useState(false);
    const [approvalStatus, setApprovalStatus] = useState(false);
    const [kyc, setKyc] = useState(false);
    const userJWT = Cookies.get("token");

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(
                "${process.env.NEXT_PUBLIC_SERVER_URL}//api/users/profile",
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                const responseData = response.data.data; // Assuming user profile data is nested under 'data'
                setProfile(responseData);
                setKyc(true);
                console.log(
                    "-----------------------------------------------response.data",
                    response.data
                );
                setProfileStatus(response.data.data.Profile.status);
                if (response.data.data.profile.status === true) {
                    setApprovalStatus(true);
                }
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

    return { profile, profileStatus, approvalStatus, kyc };
};

export default useProfile;
```
