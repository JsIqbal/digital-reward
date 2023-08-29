import axios from "axios";
import Cookies from "js-cookie";

const useLogout = () => {
    const logout = async () => {
        try {
            await axios.post(
                "http://localhost:3004/api/users/logout",
                {},
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
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
