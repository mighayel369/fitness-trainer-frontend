import React, { useState, useEffect } from "react";

interface ModalProps {
  isVisible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  showReasonInput?: boolean;  
  onConfirm: (reason?: string) => void;
  onCancel: () => void;
  children?: React.ReactNode; 
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  showReasonInput = false,  
  onConfirm,
  onCancel,
  children
}) => {
  const [reason, setReason] = useState("");

  useEffect(() => {
    setReason(""); 
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6">
      
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          {title}
        </h2>

        <p className="text-gray-600 mb-5">{message}</p>
    {children && <div className="mb-4">{children}</div>}
        {showReasonInput && (
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for decline"
            className="w-full p-3 border rounded-lg text-gray-700 mb-5 focus:ring-2 focus:ring-red-400"
            rows={3}
          />
        )}

       <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            onClick={() => onConfirm(reason)}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
