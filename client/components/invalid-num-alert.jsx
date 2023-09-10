import React from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function AlertDestructive({ invalid }) {
    console.log("Invalid Alert", invalid);

    const alertComponents = invalid.map((item, index) => (
        <Alert className="mb-2" key={index} variant="destructive">
            <AlertCircle className="h-4 w-4 bm-0" />
            <AlertTitle>invalid : {item}</AlertTitle>
        </Alert>
    ));

    return <div>{alertComponents}</div>;
}
