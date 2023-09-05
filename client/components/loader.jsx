import React from "react";
import { PulseLoader } from "react-spinners";

const Loader = ({ height }) => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: height ? height : "100vh",
        }}
    >
        <PulseLoader color="#0f172a" />
    </div>
);

export default Loader;
