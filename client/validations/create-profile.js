import * as Yup from "yup";

export const profileSchema = Yup.object({
    businessName: Yup.string().required("Business name is required"),
    businessLead: Yup.string().required("Business lead name is required"),
    pocMobile: Yup.string()
        .required("POC mobile number is required")
        .matches(/^[0-9]{13}$/, "POC mobile number must be 13 digits"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Business email is required"),
    nid: Yup.string()
        .required("NID is required")
        .matches(/^[0-9]{10,16}$/, "NID must be between 10 and 16 digits"),
    kamName: Yup.string(),
});
