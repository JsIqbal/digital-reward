import { Label } from "@/components/ui/label";

const DynamicLabel = ({ htmlFor, className, content }) => {
    return (
        <Label
            className={className ? className : ""}
            htmlFor={htmlFor ? htmlFor : ""}
        >
            {content ? content : "Default Content"}
        </Label>
    );
};

export default DynamicLabel;
