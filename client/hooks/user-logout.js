import axios from "axios";
import Cookies from "js-cookie";

const useLogout = () => {
    const logout = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
                {},
                {
                    withCredentials: true,
                }
            );

            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userType");
            Cookies.remove("token");
        } catch (error) {
            console.error("Error while logging out:", error);
        }
    };

    return logout;
};

export default useLogout;
