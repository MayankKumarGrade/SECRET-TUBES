import { motion } from "framer-motion";
import { useState } from "react";

const ImageAnimation = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((prev) => (prev + 1) % 4);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.img
        src="/rr.png"
        alt="Rotating Image"
        className="w-100% h-100% object-cover mb-8"
        initial={{ y: 0, rotate: 0 }}
        animate={{
          y: -clickCount * 10,
          rotate: clickCount * 10,
        }}
        transition={{ type: "tween", duration: 0.5 }}
      />

      <button
        onClick={handleClick}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {clickCount === 3 ? "Reset (4/4)" : `Animate (${clickCount + 1}/4)`}
      </button>
    </div>
  );
};

export default ImageAnimation;