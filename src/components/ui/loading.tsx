import React from 'react';

// Loader component using Tailwind CSS and Framer Motion for smooth animation
import { motion } from 'framer-motion';

const dotVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 0.6,
        ease: 'easeInOut',
      },
      delay: 0.2,
    },
  },
};

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-blue-500 rounded-full"
            variants={dotVariants}
            animate="animate"
            transition={{ delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
