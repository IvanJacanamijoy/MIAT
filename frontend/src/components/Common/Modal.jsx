const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold cursor-pointer"
        >
          &times;
        </button>
        {children} {/* Aquí se renderizará */}
      </div>
    </div>
  );
};

export default Modal;