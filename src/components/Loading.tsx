import React from "react";

const Loading: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
  <div className="text-gray-600 text-center py-8">
    <p>{message}</p>
  </div>
);

export default Loading;