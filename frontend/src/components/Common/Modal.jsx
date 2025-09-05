import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 my-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold cursor-pointer"
        >
          &times;
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
