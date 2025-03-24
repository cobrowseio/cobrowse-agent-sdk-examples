const ListSkeleton = () => {
    return (
      <div className="w-[300px] bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-28"></div>
      </div>
    );
  };

export default ListSkeleton