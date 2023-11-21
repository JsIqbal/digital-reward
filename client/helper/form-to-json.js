// import axios from "axios";
// import toast from "react-hot-toast";
// import * as XLSX from "xlsx";

// export const prepareDataForBackend = async (
//     formValues,
//     setInvalid,
//     resetForm,
//     setDuplicate
// ) => {
//     const { numberList, endTime, startTime, operatorName, ...otherFormValues } =
//         formValues;
//     const excelDataArray = [];
//     const invalidNumbers = []; // Array to store invalid numbers
//     const duplicateNumbers = []; // Array to store duplicate numbers
//     const uniqueNumbers = new Set(); // Set to store unique numbers

//     // Check if the formValues.numberList is a File
//     if (numberList instanceof File) {
//         const reader = new FileReader();

//         reader.onload = async (e) => {
//             const data = new Uint8Array(e.target.result);
//             const workbook = XLSX.read(data, { type: "array" });

//             // Assuming the first sheet in the Excel file
//             const sheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[sheetName];

//             // Convert the Excel sheet to an array of objects
//             const excelData = XLSX.utils.sheet_to_json(worksheet);
//             for (const row of excelData) {
//                 if (isValidNumber(row.number)) {
//                     if (uniqueNumbers.has(row.number)) {
//                         duplicateNumbers.push(row.number);
//                     } else {
//                         excelDataArray.push({
//                             startTime,
//                             endTime,
//                             operatorName: setOperator(row.number),
//                             ...otherFormValues,
//                             ...row,
//                         });
//                     }
//                 } else {
//                     // Store invalid numbers in the array
//                     invalidNumbers.push(row.number);
//                 }
//             }

//             setInvalid(invalidNumbers);
//             setDuplicate(duplicateNumbers);

//             try {
//                 const requestData = {
//                     masking: formValues.masking,
//                     arra: excelDataArray, // Assuming excelDataArray contains your data
//                 };
//                 console.log("--------fokin Data--------", requestData);
//                 const response = await axios.post(
//                     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/campaign`,
//                     requestData,
//                     {
//                         withCredentials: true,
//                     }
//                 );

//                 toast.success(response.data.message);
//                 resetForm();
//                 console.log("Campaign data sent successfully.", response);
//             } catch (error) {
//                 // resetForm();
//                 toast.error(error.response.data.error);
//                 console.error("Error sending campaign data:", error);
//             }
//         };

//         reader.readAsArrayBuffer(numberList);
//     }
// };

// function isValidNumber(number) {
//     const numberString = String(number);
//     return (
//         typeof numberString === "string" &&
//         numberString.startsWith("880") &&
//         numberString.length === 13
//     );
// }

// function setOperator(number) {
//     const prefixes = [
//         "88019",
//         "88018",
//         "88017",
//         "88014",
//         "88016",
//         "88013",
//         "88015",
//     ];
//     const operators = [
//         "Banglalink",
//         "Airtel/Robi",
//         "Grameenphone",
//         "Banglalink",
//         "Airtel/Robi",
//         "Grameenphone",
//         "Teletalk",
//     ];

//     const numberString = String(number);
//     for (let i = 0; i < prefixes.length; i++) {
//         if (numberString.startsWith(prefixes[i])) {
//             return operators[i];
//         }
//     }

//     return "Unknown";
// }
import axios from "axios";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

export const prepareDataForBackend = async (
    formValues,
    setInvalid,
    resetForm,
    setDuplicate
) => {
    const { numberList, endTime, startTime, operatorName, ...otherFormValues } =
        formValues;
    const excelDataArray = [];
    const invalidNumbers = [];
    const uniqueNumbers = new Set();
    const duplicateNumbers = new Set(); // Track duplicates

    // Check if the formValues.numberList is a File
    if (numberList instanceof File) {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const excelData = XLSX.utils.sheet_to_json(worksheet);

            for (const row of excelData) {
                if (isValidNumber(row.number)) {
                    if (uniqueNumbers.has(row.number)) {
                        duplicateNumbers.add(row.number); // Track duplicates
                    } else {
                        uniqueNumbers.add(row.number);
                        excelDataArray.push({
                            startTime,
                            endTime,
                            operatorName: setOperator(row.number),
                            ...otherFormValues,
                            ...row,
                        });
                    }
                } else {
                    invalidNumbers.push(row.number);
                }
            }

            setInvalid(invalidNumbers);
            setDuplicate(Array.from(duplicateNumbers)); // Convert Set to Array

            try {
                const requestData = {
                    masking: formValues.masking,
                    arra: excelDataArray,
                };
                console.log(
                    "___________________ data for backend: ",
                    requestData
                );
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/campaign`,
                    requestData,
                    {
                        withCredentials: true,
                    }
                );

                toast.success(response.data.message);
                resetForm();
                console.log("Campaign data sent successfully.", response);
            } catch (error) {
                toast.error(
                    error.response?.data?.error || "Error sending campaign data"
                );
                console.error("Error sending campaign data:", error);
            }
        };

        reader.readAsArrayBuffer(numberList);
    }
};

function isValidNumber(number) {
    const numberString = String(number);
    return (
        typeof numberString === "string" &&
        numberString.startsWith("880") &&
        numberString.length === 13
    );
}

function setOperator(number) {
    const prefixes = [
        "88019",
        "88018",
        "88017",
        "88014",
        "88016",
        "88013",
        "88015",
    ];
    const operators = [
        "Banglalink",
        "Airtel/Robi",
        "Grameenphone",
        "Banglalink",
        "Airtel/Robi",
        "Grameenphone",
        "Teletalk",
    ];

    const numberString = String(number);
    for (let i = 0; i < prefixes.length; i++) {
        if (numberString.startsWith(prefixes[i])) {
            return operators[i];
        }
    }

    return "Unknown";
}
