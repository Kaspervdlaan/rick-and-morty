import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <button
            onClick={onClose}
            className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold cursor-pointer"
            aria-label="Close"
          >
            &times;
          </button>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
export default Modal;