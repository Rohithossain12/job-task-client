const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="relative w-16 h-16">
        <div className="w-full h-full border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
