const DashboardSkeleton = () => {
    return (
        <div>
            <h1 className='text-lg text-gray-500 font-bold pb-2'>Case #123</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="h-64 bg-gray-200 rounded mb-6"></div>
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <div className="h-32 bg-gray-200 rounded mb-6"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-1/2">
                        <div className="h-32 bg-gray-200 rounded mb-6"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton