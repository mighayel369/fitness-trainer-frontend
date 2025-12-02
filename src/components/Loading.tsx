import React from "react";

const Loading: React.FC<{ message?: string }> = ({ message = "Loading..." }) => {
  return (
        <div className="flex justify-center items-center gap-2">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          <span className="text-gray-600 text-sm font-medium">{message}</span>
        </div>
  );
};

export default Loading;
