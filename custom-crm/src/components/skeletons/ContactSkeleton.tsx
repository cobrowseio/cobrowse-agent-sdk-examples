const ContactSkeleton = () => {
    return (
      <div>
        <h1 className='text-lg text-gray-500 font-bold pb-2'>Contact details</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex items-center">
          <div className="h-10 w-10 bg-gray-200 rounded-full mr-4"></div>
          <div>
            <div className="h-4 mb-2">
            Frank Spencer
            </div>
            <div className="h-6">
            f.spencer@example.com
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ContactSkeleton