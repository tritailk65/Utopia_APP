import React from 'react';
import success from '../../assets/image/success.png';
import fail from '../../assets/image/fail.png'

interface CustomModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

function CustomModal({ isOpen, message, onClose } : CustomModalProps) {
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 bg-gray-700 opacity-50">
      </div>
      <div className="modal-content relative bg-white p-4 rounded-lg shadow-lg z-50 w-[300px]">
        <div className="flex space-x-3 mt-2">
            <img src={success} className="w-[100px] h-[100px]"/>
            <div className="mt-[15px]">
              <p>{message}</p>
              <button onClick={onClose} className="mt-4 ml-[100px] bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Đóng</button>
            </div>
        </div>
      </div>
    </div>
  ) : null;
}

/* <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 bg-gray-700 opacity-50">
      </div>
      <div className="modal-content relative bg-white p-4 rounded-lg shadow-lg z-50 w-[300px]">
        <div className="flex space-x-3 mt-2">
            <img src={fail} className="w-[100px] h-[100px]"/>
            <div className="mt-[15px]">
              <p>{message}</p>
              <button onClick={onClose} className="mt-4 ml-[100px] bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Đóng</button>
            </div>
        </div>
      </div>
    </div> */

export default CustomModal;
