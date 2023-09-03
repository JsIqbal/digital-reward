import { ErrorMessage, Field } from "formik";
import DynamicLabel from "./label";

const FieldCompnent = () => {
    return (
        <div className="mb-3">
            <DynamicLabel
                htmlFor="password"
                content={"Password"}
                className="block text-gray-700 text-sm font-bold mb-2"
            />
            <Field
                id="password"
                name="password"
                type="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
            />
        </div>
    );
};

export default FieldCompnent;
