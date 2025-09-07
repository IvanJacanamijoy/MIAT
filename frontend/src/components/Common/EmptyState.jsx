// src/components/common/EmptyState.jsx
import { motion } from "framer-motion";
import { Inbox, FileX, CalendarX, UserX, XIcon} from "lucide-react";
import { fadeIn, bounceIn, pulse } from "../../Animations/variants";

const EmptyState = ({
  title,
  description,
  icon = "inbox",
  actionLabel,
  onAction,
}) => {
  const icons = {
    quotes: <FileX size={56} />,
    visits: <CalendarX size={56} />,
    inbox: <Inbox size={56} />,
    user: <UserX size={56} />,
    notfound: <XIcon size={56} />,
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.2, 0.8)}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center text-center p-10 rounded-3xl shadow-lg 
                 bg-gradient-to-br from-white/70 to-blue-50/80 backdrop-blur-lg border border-gray-200"
    >
      {/* Icono con animación */}
      <motion.div
        variants={bounceIn(0.3)}
        initial="hidden"
        animate="show"
        className="p-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 mb-6 shadow-inner"
      >
        <motion.div
          variants={pulse(1.5)} // animación infinita y suave
          animate="show"
        >
          {icons[icon] || icons["inbox"]}
        </motion.div>
      </motion.div>

      {/* Mensaje principal */}
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>

      {/* Subtítulo */}
      {description && (
        <p className="text-gray-500 text-sm max-w-md">{description}</p>
      )}

      {/* Botón opcional */}
      {actionLabel && onAction && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-2xl shadow-md hover:bg-blue-700 transition"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;

