"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";

const validationSchema = Yup.object({
    campaignName: Yup.string().required("Campaign name is required"),
    maskedName: Yup.string()
        .matches(
            /^[A-Za-z0-9]{11}$/,
            "Masked name must be 11 alphanumeric digits"
        )
        .required("Masked name is required"),
    startTime: Yup.date().required("Start time is required"),
    endTime: Yup.date().required("End time is required"),
    operatorName: Yup.string().required("Operator name is required"),
    rewardName: Yup.string().required("Reward name is required"),
    numberList: Yup.mixed().required("Number list is required"),
    campaignDescription: Yup.mixed().required("Text is required"),
});

const operators = ["Operator 1", "Operator 2", "Operator 3", "Operator 4"];
const rewardNames = ["Reward 1", "Reward 2", "Reward 3"];

const FileInput = ({ field, form: { setFieldValue } }) => (
    <input
        type="file"
        onChange={(e) => {
            setFieldValue(field.name, e.currentTarget.files[0]);
        }}
    />
);

export const CampaignForm = () => {
    const initialValues = {
        campaignName: "",
        maskedName: "",
        startTime: "",
        endTime: "",
        operatorName: "",
        rewardName: "",
        numberList: null,
        campaignDescription: "",
    };

    const handleSubmit = (values, { setSubmitting }) => {
        // Handle form submission here
        console.log(values);
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="p-8 border-black/5 shadow-md hover:shadow-lg hover:bg-white/30 hover:scale-[101%] transition duration-150 cursor-pointer space-y-4 md:flex md:space-x-4 mt-12">
                    {/* Left Column */}
                    <div className="md:w-1/2 flex flex-col space-y-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="campaignName"
                                className="text-gray-600 font-medium"
                            >
                                Campaign Name:
                            </label>
                            <Field
                                type="text"
                                name="campaignName"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                                name="campaignName"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="maskedName"
                                className="text-gray-600 font-medium"
                            >
                                Masking Name:
                            </label>
                            <Field
                                type="text"
                                name="maskedName"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                                name="maskedName"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="startTime"
                                className="text-gray-600 font-medium"
                            >
                                Start Time:
                            </label>
                            <Field
                                type="datetime-local"
                                name="startTime"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                                name="startTime"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="endTime"
                                className="text-gray-600 font-medium"
                            >
                                End Time:
                            </label>
                            <Field
                                type="datetime-local"
                                name="endTime"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                                name="endTime"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        {/* Add other fields for the left column */}
                    </div>

                    {/* Right Column */}
                    <div
                        className="md:w-1/2 flex flex-col space-y-4"
                        style={{ marginTop: 0 }}
                    >
                        <div className="flex flex-col">
                            <label
                                htmlFor="operatorName"
                                className="text-gray-600 font-medium"
                            >
                                Operator Name:
                            </label>
                            <Field
                                as="select"
                                name="operatorName"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select an operator</option>
                                {operators.map((operator, index) => (
                                    <option key={index} value={operator}>
                                        {operator}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage
                                name="operatorName"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="rewardName"
                                className="text-gray-600 font-medium"
                            >
                                Reward Name:
                            </label>
                            <Field
                                as="select"
                                name="rewardName"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select a reward</option>
                                {rewardNames.map((reward, index) => (
                                    <option key={index} value={reward}>
                                        {reward}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage
                                name="rewardName"
                                component="div"
                                className="text-red-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="numberList"
                                className="text-gray-600 font-medium"
                            >
                                Upload Number List (CSV/XLSX):
                            </label>
                            {/* <Input name="numberList" id="picture" type="file" /> */}
                            <Field
                                name="numberList"
                                component={FileInput}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                                name="numberList"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="campaignDescription"
                                className="text-gray-600 font-medium"
                            >
                                Customized Reward Text (CRT):
                            </label>
                            <Field
                                id="campaignDescription"
                                name="campaignDescription"
                                rows="4" // Set the number of rows you want
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                                name="campaignDescription"
                                component="div"
                                className="text-red-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gray-600 text-white rounded-md px-4 py-2 hover:bg-gray-600 focus:outline-none mt-11"
                            >
                                Submit
                            </button>
                        </div>
                        {/* Add other fields for the right column */}
                    </div>
                </Form>
            )}
        </Formik>
    );
};
