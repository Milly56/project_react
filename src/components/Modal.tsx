    export default function Modal({ isOpen, onClose, children }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-xl relative w-[90%] max-w-md">

            <button
            onClick={onClose}
            className="absolute top-2 right-3 text-xl text-gray-500 hover:text-black"
            >
            ×
            </button>

            {children}
        </div>
        </div>
    );
    }
