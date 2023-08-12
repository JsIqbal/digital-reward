import React from "react";

const LandingLayout = ({ children }) => {
    return (
        <main className=" bg-[#111827] p-0 m-0 h-full w-full">
            <div className="mx-auto max-w-screen-xl h-full w-full">
                {children}
            </div>
        </main>
    );
};

export default LandingLayout;
