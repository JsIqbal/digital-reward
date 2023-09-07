import * as XLSX from "xlsx";

export const prepareDataForBackend = (formValues, setInvalid) => {
    // Extract numberList, endTime, and startTime
    const { numberList, endTime, startTime, ...otherFormValues } = formValues;
    const excelDataArray = [];
    const invalidNumbers = []; // Array to store invalid numbers

    // Check if the formValues.numberList is a File
    if (numberList instanceof File) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            // Assuming the first sheet in the Excel file
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert the Excel sheet to an array of objects
            const excelData = XLSX.utils.sheet_to_json(worksheet);

            // Filter and push only valid rows
            for (const row of excelData) {
                if (isValidNumber(row.number)) {
                    excelDataArray.push({
                        startTime,
                        endTime,
                        ...otherFormValues,
                        ...row,
                    });
                } else {
                    // Store invalid numbers in the array
                    invalidNumbers.push(row.number);
                }
            }

            setInvalid(invalidNumbers);
        };

        reader.readAsArrayBuffer(numberList);
    }

    const dataToSend = {
        files: excelDataArray,
    };

    console.log(
        "------------------------------dataToSend----------------",
        dataToSend
    );

    return dataToSend;
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
