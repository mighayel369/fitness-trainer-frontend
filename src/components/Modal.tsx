import React, { useState } from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  actionType: string;
  userName: string;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onConfirm, actionType, userName }) => {
  const [reason, setReason] = useState("");

  if (!isVisible) return null;

  const Action = actionType.charAt(0).toUpperCase() + actionType.slice(1);

  const actionStyles: Record<string, string> = {
    accept: 'bg-green-500 hover:bg-green-600',
    unblock: 'bg-green-500 hover:bg-green-600',
    approve: 'bg-green-500 hover:bg-green-600',
    decline: 'bg-red-500 hover:bg-red-600',
    block: 'bg-red-500 hover:bg-red-600',
    reject: 'bg-red-500 hover:bg-red-600',
    delete: 'bg-red-500 hover:bg-red-600',
    default: 'bg-blue-500 hover:bg-blue-600',
  };

  const buttonStyle = actionStyles[actionType.toLowerCase()] || actionStyles.default;
  console.log(actionType)

  const handleConfirm = () => {
    if (actionType.toLowerCase() === "decline") {
      onConfirm(reason);
    } else {
      onConfirm();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {Action} Trainer
        </h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to {actionType} <strong>{userName}</strong>?
        </p>

        {(actionType.toLowerCase() === "decline") && (
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for rejection"
            className="w-full border rounded-md p-3 mb-4 text-gray-700 focus:ring-2 focus:ring-red-400"
            rows={3}
          />
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded text-white ${buttonStyle}`}
          >
            {Action}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
