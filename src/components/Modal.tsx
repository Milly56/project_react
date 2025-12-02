    export default function Modal({
    isOpen,
    onClose,
    children,
    }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center z-50">
        <div
            className="bg-white dark:bg-[#1A1A1A] p-6 rounded-xl shadow-xl relative 
            w-[90%] max-w-md transition-colors"
        >
            <button
            onClick={onClose}
            className="absolute top-2 right-3 text-xl 
                text-gray-500 hover:text-black 
                dark:text-red-400 dark:hover:text-red-500 
                transition-colors"
            >
            ×
            </button>

            {children}
        </div>
        </div>
    );
    }
