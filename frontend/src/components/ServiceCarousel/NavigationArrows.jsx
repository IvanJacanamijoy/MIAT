import { motion } from "framer-motion";
import { fadeIn, bounceIn } from "../../Animations/variants";

const NavigationArrows = ({ vistaAnterior, vistaSiguiente }) => {
  return (
    <>
      {/* Botón de flecha anterior */}
      <motion.button
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        animate="show"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={vistaAnterior}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-black/70 shadow-md hover:bg-black transition-colors cursor-pointer"
      >
        <motion.svg
          variants={bounceIn(0.2)}
          initial="hidden"
          animate="show"
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </motion.svg>
      </motion.button>

      {/* Botón de flecha siguiente */}
      <motion.button
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={vistaSiguiente}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 rounded-full p-2 shadow-md hover:bg-black transition-colors cursor-pointer"
      >
        <motion.svg
          variants={bounceIn(0.2)}
          initial="hidden"
          animate="show"
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </motion.svg>
      </motion.button>
    </>
  );
};

export default NavigationArrows;

