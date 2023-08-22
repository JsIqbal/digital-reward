import { useState, useEffect } from "react";

const useAuth = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isCompany, setIsCompany] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const userType = localStorage.getItem("userType");

        if (user && userType) {
            setIsSignedIn(true);
            setIsAdmin(userType === "admin");
            setIsCompany(userType === "company");
        } else {
            setIsSignedIn(false);
            setIsAdmin(false);
            setIsCompany(false);
        }
    }, []);

    return { isSignedIn, isAdmin, isCompany };
};

export default useAuth;
