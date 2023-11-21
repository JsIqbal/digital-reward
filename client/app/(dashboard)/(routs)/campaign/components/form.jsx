"use client";

import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { prepareDataForBackend } from "@/helper/form-to-json";
import { campaignSchema } from "@/validations/validations";
import { campaignValues } from "@/config/initial-values";

import InvalidShet from "@/components/invalid-sheet";

const rewardNames = ["1GB_OKB_EB_7D", "Reward 2", "Reward 3"];

const FileInput = ({ field, form: { setFieldValue } }) => {
    return (
        <input
            type="file"
            onChange={(e) => {
                setFieldValue(field.name, e.currentTarget.files[0]);
            }}
        />
    );
};

export const CampaignForm = () => {
    const [invalid, setInvalid] = useState([]);
    const [duplicate, setDuplicate] = useState([]);
    const [fileInputKey, setFileInputKey] = useState(0);
    const fileInputRef = useRef(null);

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        prepareDataForBackend(values, setInvalid, resetForm, setDuplicate);
        setSubmitting(false);
        setFileInputKey(fileInputKey + 1);
    };

    const [isSheetOpen, setIsSheetOpen] = useState(false);

    function closeSheet() {
        setIsSheetOpen(false);
    }

    useEffect(() => {
        console.log(
            "Came inside handle submit:  invalid.length",
            invalid.length
        );
        setIsSheetOpen(invalid.length > 0);
    }, [invalid]);

    return (
        <>
            <InvalidShet
                closeSheet={closeSheet}
                isSheetOpen={isSheetOpen}
                invalid={invalid}
                duplicate={duplicate}
            />
            <Formik
                initialValues={campaignValues}
                validationSchema={campaignSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="p-8 rounded-lg border border-black/5 shadow-md hover:shadow-lg hover:bg-white/30 hover:scale-[101%] transition duration-150 cursor-pointer space-y-4 md:flex md:space-x-4 mt-12">
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
                                    htmlFor="masking"
                                    className="text-gray-600 font-medium"
                                >
                                    Masking Name:
                                </label>
                                <Field
                                    type="text"
                                    name="masking"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage
                                    name="masking"
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
                        </div>

                        <div
                            className="md:w-1/2 flex flex-col space-y-4"
                            style={{ marginTop: 0 }}
                        >
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
                                <Field
                                    name="numberList"
                                    key={fileInputKey}
                                    component={FileInput}
                                    innerRef={fileInputRef}
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
                                    rows="4"
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
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};
