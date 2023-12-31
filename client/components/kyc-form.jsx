import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { profileSchema } from "@/validations/validations";
import KycHeader from "./kyc-header";
import DynamicLabel from "./label";
import { Button } from "./ui/button";
import { useAddProfile } from "@/hooks/create-profile";
import { profileValues } from "@/config/initial-values";

export default function CreateProfile() {
    const { addProfile, isLoading, error } = useAddProfile();

    return (
        <div className="fixed inset-0 flex items-center justify-center translate-x-[130px] translate-y-[10px]">
            <div className="relative bg-white border border-gray-300 shadow-lg rounded-lg">
                <KycHeader />
                <div className="p-4 mt-4">
                    <Formik
                        initialValues={profileValues}
                        validationSchema={profileSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            addProfile(values);
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
                                        <DynamicLabel
                                            required
                                            htmlFor="businessName"
                                            content={"Business Name"}
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        />
                                        <Field
                                            id="businessName"
                                            name="businessName"
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="businessName"
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <DynamicLabel
                                            required
                                            htmlFor="businessLead"
                                            content={"Business Lead"}
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        />
                                        <Field
                                            id="businessLead"
                                            name="businessLead"
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="businessLead"
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                    <div className="mb-3 col-span-2">
                                        <DynamicLabel
                                            required
                                            htmlFor="email"
                                            content={"Email"}
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        />
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
                                    <div className="mb-3 col-span-2">
                                        <DynamicLabel
                                            required
                                            htmlFor="nid"
                                            content={"NID"}
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        />
                                        <Field
                                            id="nid"
                                            name="nid"
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="nid"
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <DynamicLabel
                                            required
                                            htmlFor="pocMobile"
                                            content={"POC Mobile"}
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        />
                                        <Field
                                            id="pocMobile"
                                            name="pocMobile"
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="pocMobile"
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <DynamicLabel
                                            htmlFor="kamName"
                                            content={"KAM Name"}
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        />
                                        <Field
                                            id="kamName"
                                            name="kamName"
                                            type="kamName"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="kamName"
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer col-span-2 text-right">
                                    <Button
                                        type="submit"
                                        className="btn btn-outline-primary  mt-2"
                                        disabled={formikProps.isSubmitting}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
