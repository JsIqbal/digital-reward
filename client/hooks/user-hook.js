import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useUser = () => {
    // initialize the states
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // get the userJWT token from localStorage
    // const userJWT = localStorage.getItem("userJWT");
    const userJWT = Cookies.get("token");

    // define a function to fetch the user data from the server
    const fetchUser = async () => {
        try {
            // send a request to the server with the userJWT token
            const response = await axios.get("/api/user", {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            // if the response is successful, set the states accordingly
            const userData = response.data;
            setIsSignedIn(true);
            setUser(userData.user);
            setIsAdmin(userData.isAdmin);
            setIsLoading(false);
        } catch (error) {
            // if the response is not successful, set the states accordingly
            setIsSignedIn(false);
            setUser(null);
            setIsAdmin(false);
            setIsLoading(false);
        }
    };

    // use useEffect to call the fetchUser function when the component mounts or the userJWT changes
    useEffect(() => {
        fetchUser();
    }, [userJWT]);

    // return the states as an object
    return { isSignedIn, user, isAdmin, isLoading };
};

export default useUser;
