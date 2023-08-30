export const DashHeader = ({ desc }) => {
    return (
        <div className="mb-8 space-y-3 flex flex-col justify-center items-center">
            <h1 className="text-center text-2xl md:text-3xl lg:4xl font-bold">
                {desc}
            </h1>
        </div>
    );
};
