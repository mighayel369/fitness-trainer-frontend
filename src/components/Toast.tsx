import React from 'react'
import { useEffect } from 'react'
interface ToastProps{
    message:String;
    type?:"success"|"error";
    onClose:()=>void;
}

const Toast:React.FC<ToastProps>=({message, type = "success", onClose})=>{
    useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000);
    return () => clearTimeout(timer)
  }, [onClose])
   const bgColor = type === "success" ? "bg-green-500" : "bg-red-500"
    return (
    <div className={`fixed top-5 right-5 z-50 px-4 py-2 z-50 text-white rounded shadow-lg transition-all ${bgColor}`}>
      {message}
    </div>
  );
}

export default Toast