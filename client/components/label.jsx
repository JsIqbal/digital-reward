import React from "react";
import { Label } from "@/components/ui/label";

const DynamicLabel = ({ htmlFor, className, content, required }) => {
    return (
        <Label
            className={className ? className : ""}
            htmlFor={htmlFor ? htmlFor : ""}
        >
            {content ? content : "Default Content"}
            {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
    );
};

export default DynamicLabel;
