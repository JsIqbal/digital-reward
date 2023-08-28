import React from "react";
import { PulseLoader } from "react-spinners";

const Loader = () => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        }}
    >
        <PulseLoader color="#0f172a" />
    </div>
);

export default Loader;
