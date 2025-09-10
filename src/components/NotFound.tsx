import React from "react";

const NotFound: React.FC<{ message?: string }> = ({ message = "Not Found." }) => (
  <div className="text-red-500 text-center py-8">
    <p>{message}</p>
  </div>
);

export default NotFound;
