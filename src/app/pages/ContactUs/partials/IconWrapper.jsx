import React from "react";
import { motion } from "framer-motion";

const IconWrapper = ({ icon: Icon, size = 48, color = "currentColor", bgColor = "transparent", rounded = true }) => {
  const IconComponent = Icon;
  
  return (
    <motion.div
      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center justify-center ${rounded ? "rounded-full" : ""}`}
      style={{
        backgroundColor: bgColor,
        width: size + 16,
        height: size + 16,
      }}
    >
      {typeof Icon === "function" || Icon?.$$typeof ? (
        <IconComponent size={size} color={color} strokeWidth={1.5} />
      ) : (
        Icon
      )}
    </motion.div>
  );
};

export default IconWrapper;