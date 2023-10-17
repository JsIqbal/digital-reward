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

    for (let i = 0; i < prefixes.length; i++) {
        if (number.startsWith(prefixes[i])) {
            return operators[i];
        }
    }

    // If the number doesn't match any of the prefixes, return a default value
    return "Unknown";
}

const number = "8801734567890"; // Sample number
const operator = setOperator(number); // Get the operator for the number
console.log(operator);
