"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

const initialDateRange = {
    from: null,
    to: null,
};

export function DatePickerWithRange({ className }) {
    const [date, setDate] = useState(initialDateRange);
    // Replace 'your_backend_url' with your actual backend URL

    async function sendDateRangeToBackend() {
        if (!date) {
            console.error("Date is undefined.");
            return;
        }

        // Format the date object to match your backend's expected format
        const formattedDate = {
            from: date.from.toISOString(),
            to: date.to.toISOString(),
        };
        const backendUrl = `http://localhost:3004/api/campaign/report?from=${formattedDate.from}&to=${formattedDate.to}`;

        try {
            // Send a GET request to your backend to retrieve the base64-encoded zip data
            const response = await axios.get(backendUrl, {
                responseType: "json", // Ensure that the response is treated as JSON
                withCredentials: true,
            });

            // Handle the response from your backend
            const base64Data = response.data.campaignData;

            // Decode the base64 data into binary data
            const binaryData = atob(base64Data);

            // Convert the binary data into a Blob
            const blob = new Blob(
                [
                    new Uint8Array(
                        [...binaryData].map((char) => char.charCodeAt(0))
                    ),
                ],
                { type: "application/zip" }
            );

            // Create a download link for the Blob
            const objectURL = URL.createObjectURL(blob);

            // Create an anchor element (<a>) for the download link
            const downloadLink = document.createElement("a");
            downloadLink.href = objectURL;
            downloadLink.download = "campaign_report.zip"; // Set the desired file name

            // Trigger a click event to simulate download link click
            downloadLink.click();

            // Clean up the object URL when done
            URL.revokeObjectURL(objectURL);
        } catch (error) {
            // Handle errors, e.g., network issues or backend errors
            console.error("Error sending data to backend:", error);
        }
    }

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant="outline"
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="left">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    <div className="text-right m-0 mr-3 mb-3">
                        <Button
                            onClick={() => {
                                sendDateRangeToBackend();
                            }}
                        >
                            Download
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
