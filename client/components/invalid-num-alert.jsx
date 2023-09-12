import React from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function AlertDestructive({ invalid, duplicate }) {
    return (
        <>
            <Alert className="mb-2" variant="destructive">
                <AlertCircle className="h-4 w-4 bm-0" />
                <AlertTitle>invalid : {invalid.length}</AlertTitle>
            </Alert>
            <Alert className="mb-2" variant="destructive">
                <AlertCircle className="h-4 w-4 bm-0" />
                <AlertTitle>duplicate : {duplicate.length}</AlertTitle>
            </Alert>
        </>
    );
}
