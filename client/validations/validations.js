import * as Yup from "yup";

export const profileSchema = Yup.object({
    businessName: Yup.string().required("Business name is required"),
    businessLead: Yup.string().required("Business lead name is required"),
    pocMobile: Yup.string()
        .required("POC mobile number is required")
        .min(13, "POC mobile number must be 13 digits")
        .max(13, "POC mobile number must be 13 digits"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Business email is required"),
    nid: Yup.string()
        .required("NID is required")
        .matches(/^[0-9]{10,16}$/, "NID must be between 10 and 16 digits"),
    kamName: Yup.string(),
});

export const campaignSchema = Yup.object({
    campaignName: Yup.string().required("Campaign name is required"),
    // masking: Yup.string()
    //     .matches(
    //         /^[A-Za-z0-9]{11}$/,
    //         "masking name must be 11 alphanumeric digits"
    //     )
    //     .required("masking name is required"),
    masking: Yup.string().required("Masking name is required"),
    startTime: Yup.date().required("Start time is required"),
    endTime: Yup.date().required("End time is required"),
    // operatorName: Yup.string().required("Operator name is required"),
    rewardName: Yup.string().required("Reward name is required"),
    numberList: Yup.mixed().required("Number list is required"),
    campaignDescription: Yup.mixed().required("Text is required"),
});
