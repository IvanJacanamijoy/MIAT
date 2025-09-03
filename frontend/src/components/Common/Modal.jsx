import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300">
      <div className="bg-white p-6 rounded-lg shadow-xl w-auto relative transform transition-all duration-300 scale-95 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold cursor-pointer"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
