const TabSkeleton = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <ul className="flex space-x-4">
                <li className="h-8 w-32 bg-gray-200 rounded"></li>
                <li className="h-8 w-32 bg-gray-200 rounded"></li>
                <li className="h-8 w-32 bg-gray-200 rounded"></li>
            </ul>
        </div>
    );
};

export default TabSkeleton