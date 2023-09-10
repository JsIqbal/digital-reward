import axios from "axios";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

// export const prepareDataForBackend = (formValues, setInvalid, resetForm) => {
//     // Extract numberList, endTime, and startTime
//     const { numberList, endTime, startTime, ...otherFormValues } = formValues;
//     const excelDataArray = [];
//     const invalidNumbers = []; // Array to store invalid numbers

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

//             // Filter and push only valid rows
//             for (const row of excelData) {
//                 if (isValidNumber(row.number)) {
//                     excelDataArray.push({
//                         startTime,
//                         endTime,
//                         ...otherFormValues,
//                         ...row,
//                     });
//                 } else {
//                     // Store invalid numbers in the array
//                     invalidNumbers.push(row.number);
//                 }
//             }

//             setInvalid(invalidNumbers);

//             // POST the data to the backend
//             try {
//                 console.log(
//                     "----------------------------------------------------",
//                     excelDataArray
//                 );
//                 const response = await axios.post(
//                     "http://localhost:3004/api/users/campaign",
//                     excelDataArray,
//                     {
//                         withCredentials: true,
//                     }
//                 );
//                 toast.success(response.data.message);
//                 resetForm();
//                 console.log("Campaign data sent successfully.", response);
//             } catch (error) {
//                 resetForm();
//                 toast.error(error.response.data.error);
//                 console.error("Error sending campaign data:", error);
//             }
//         };

//         reader.readAsArrayBuffer(numberList);
//     }
// };

export const prepareDataForBackend = (formValues, setInvalid, resetForm) => {
    // Extract numberList, endTime, and startTime
    const { numberList, endTime, startTime, ...otherFormValues } = formValues;
    const excelDataArray = [];
    const invalidNumbers = []; // Array to store invalid numbers
    const uniqueNumbers = new Set(); // Set to store unique numbers

    // Check if the formValues.numberList is a File
    if (numberList instanceof File) {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            // Assuming the first sheet in the Excel file
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert the Excel sheet to an array of objects
            const excelData = XLSX.utils.sheet_to_json(worksheet);

            // Filter and push only valid and unique rows
            for (const row of excelData) {
                if (
                    isValidNumber(row.number) &&
                    !uniqueNumbers.has(row.number)
                ) {
                    excelDataArray.push({
                        startTime,
                        endTime,
                        ...otherFormValues,
                        ...row,
                    });
                    uniqueNumbers.add(row.number); // Add the number to the set
                } else {
                    // Store invalid numbers in the array
                    invalidNumbers.push(row.number);
                }
            }

            setInvalid(invalidNumbers);

            // POST the data to the backend
            try {
                const response = await axios.post(
                    "http://localhost:3004/api/users/campaign",
                    excelDataArray,
                    {
                        withCredentials: true,
                    }
                );
                toast.success(response.data.message);
                resetForm();
                console.log("Campaign data sent successfully.", response);
            } catch (error) {
                resetForm();
                toast.error(error.response.data.error);
                console.error("Error sending campaign data:", error);
            }
        };

        reader.readAsArrayBuffer(numberList);
    }
};

// Helper function to check if a number is valid
function isValidNumber(number) {
    const numberString = String(number); // Convert to string
    // Check if it starts with "880" and has a length of 13
    return (
        typeof numberString === "string" &&
        numberString.startsWith("880") &&
        numberString.length === 13
    );
}
