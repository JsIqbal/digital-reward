import axios from "axios";
import Cookies from "js-cookie";

const useLogout = () => {
    const logout = async () => {
        axios
            .post(
                `http://localhost:3004/api/users/logout`,
                {},
                { withCredentials: true }
            )
            .then((res) => {
                console.log(
                    "--------------------------user logged out------------------------",
                    res
                );
                Cookies.remove("token");
                delete axios.defaults.headers.common["token"]; // Remove token header
                toast.success("Logout Successful", {
                    position: "top-right",
                    autoClose: 500,
                    onClose: () => {
                        router.push("/admin/login");
                    },
                });

                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userType");
                Cookies.remove("token");
            })
            .catch((error) => console.log(error));
    };

    return logout;
};

export default useLogout;
