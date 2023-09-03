import * as Yup from "yup";

export const profileSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password should contain at least 6 characters")
        .max(20, "Password can be 20 characters long"),
    fullname: Yup.string().required("Fullname is required"),
    phone: Yup.string().required("phone number is requires"),
    role: Yup.string().required("Role is required"),
    status: Yup.string().required("Status is required"),
});
