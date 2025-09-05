// src/animations/variants.js

export const fadeIn = (direction = "up", delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay: Number(delay) || 0,
        ease: "easeOut",
      },
    },
  };
};

export const zoomIn = (delay = 0) => {
  return {
    hidden: { scale: 0.8, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: Number(delay) || 0,
        ease: "easeOut",
      },
    },
  };
};

export const rotateIn = (delay = 0) => {
  return {
    hidden: { rotate: -10, opacity: 0 },
    show: {
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: Number(delay) || 0,
        ease: "easeOut",
      },
    },
  };
};

export const staggerContainer = (staggerChildren = 0.15, delayChildren = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: Number(staggerChildren) || 0.15,
        delayChildren: Number(delayChildren) || 0,
      },
    },
  };
};

export const slideIn = (direction = "left", delay = 0) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay: Number(delay) || 0,
      },
    },
  };
};

export const bounceIn = (delay = 0) => {
  return {
    hidden: { scale: 0.3, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
        delay: Number(delay) || 0,
      },
    },
  };
};

export const pulse = (duration = 1.5) => ({
  hidden: { scale: 1 },
  show: {
    scale: [1, 1.05, 1],
    transition: {
      duration: Number(duration) || 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});

export const flipIn = (delay = 0) => {
  return {
    hidden: { rotateY: 90, opacity: 0 },
    show: {
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: Number(delay) || 0,
        ease: "easeOut",
      },
    },
  };
};

