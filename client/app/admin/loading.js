const DashboardLoading = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <span
                style={{ animationDuration: "3s" }}
                className="w-16 h-16 border-[6px] border-dashed border-blue-700 rounded-full animate-spin"
            ></span>
        </div>
    );
};

export default DashboardLoading;
