import React from "react";
// import axios from "axios";
import { Formik, Form, Field, ErrorMessage, setIn } from "formik";

// import { API_URL } from "@/config";
import { profileSchema } from "@/validations/create-profile";
import KycHeader from "./kyc-header";

export default function CreateProfile() {
    const initialValues = {
        email: "",
        username: "",
        fullname: "",
        phone: "",
        role: "",
        status: "",
        password: "",
        confirm_password: "",
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative bg-white border border-gray-300 shadow-lg">
                <KycHeader />
                <div className="p-4 mt-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={profileSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(
                                "Setting----------------------",
                                values
                            );
                            // axios
                            //     .post(`${API_URL}/api/users`, values, {
                            //         withCredentials: true,
                            //     })
                            //     .then((res) => {
                            //         toast.success("User Added Successfully", {
                            //             position: "top-right",
                            //             autoClose: 500,
                            //         });

                            //         setInfo({});
                            //         setToggle(!toggle);
                            //     })
                            //     .catch((error) => {
                            //         console.log(error);

                            //         toast.error("Failed to add user", {
                            //             position: "top-right",
                            //             autoClose: 500,
                            //         });
                            //     });
                            setSubmitting(false);
                        }}
                    >
                        {(formikProps) => (
                            <Form
                                style={{
                                    width: " 800px",
                                    padding: "10px 20px",
                                }}
                                onSubmit={formikProps.handleSubmit}
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="username"
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            Username
                                        </label>
                                        <Field
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="username"
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="email"
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            Email
                                        </label>
                                        <Field
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                    {/* Additional fields for the first column */}
                                    <div className="mb-3 col-span-2">
                                        <label
                                            htmlFor="fullname"
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            Fullname
                                        </label>
                                        <Field
                                            id="fullname"
                                            name="fullname"
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="fullname"
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                    <div className="mb-3 col-span-2">
                                        <label
                                            htmlFor="phone"
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            Phone
                                        </label>
                                        <Field
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="phone"
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                    {/* Additional fields for the second column */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="password"
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            Password
                                        </label>
                                        <Field
                                            id="password"
                                            name="password"
                                            type="password"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="confirm_password"
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            Confirm Password
                                        </label>
                                        <Field
                                            id="password"
                                            name="confirm_password"
                                            type="password"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="role"
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            Role
                                        </label>
                                        <Field
                                            id="role"
                                            name="role"
                                            as="select"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="">
                                                Select Role
                                            </option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                            <option value="reporter">
                                                Reporter
                                            </option>
                                        </Field>
                                        <ErrorMessage
                                            name="role"
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="status"
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            Status
                                        </label>
                                        <Field
                                            id="status"
                                            name="status"
                                            as="select"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="">
                                                Select Status
                                            </option>
                                            <option value="pending">
                                                Inactive
                                            </option>
                                            <option value="approved">
                                                Active
                                            </option>
                                        </Field>
                                        <ErrorMessage
                                            name="status"
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer col-span-2">
                                    <button
                                        type="button"
                                        className="btn border border-gray-300 text-gray-700 mx-4 mt-2"
                                    >
                                        Cancel
                                    </button>
                                    <span className="mx-2"></span>
                                    <button
                                        type="submit"
                                        className="btn btn-outline-primary mx-5 mt-2"
                                        disabled={formikProps.isSubmitting}
                                    >
                                        Add
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
