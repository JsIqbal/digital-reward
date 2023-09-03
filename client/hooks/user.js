// import { useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const useUser = () => {
//     const [isSignedIn, setIsSignedIn] = useState(false);
//     // const [user, setUser] = useState(null);
//     // const [isAdmin, setIsAdmin] = useState(false);
//     // const [isLoading, setIsLoading] = useState(true);

//     const userJWT = Cookies.get("token");
//     const fetchUser = async () => {
//         try {
//             const response = await axios.get(
//                 "http://localhost:3004/api/admins/me",
//                 {
//                     headers: userJWT,
//                 }
//             );
//             console.log("---------------------------", response);
//             const userData = response.data;
//             setIsSignedIn(true);
//             // setUser(userData.user);
//             // setIsAdmin(userData.isAdmin);
//             // setIsLoading(false);
//         } catch (error) {
//             setIsSignedIn(false);
//             // setUser(null);
//             // setIsAdmin(false);
//             // setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUser();
//     }, [userJWT]);

//     return {
//         isSignedIn,
//         // , user, isAdmin, isLoading
//     };
// };

// export default useUser;

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const useUser = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const userJWT = Cookies.get("token");

    const fetchUser = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3004/api/users/me",
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
