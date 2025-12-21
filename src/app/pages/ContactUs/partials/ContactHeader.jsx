import React from "react";
import { motion } from "framer-motion";

const ContactHeader = ({ title, subtitle, illustration }) => {
  return (
    <div className="bg-linear-to-br from-primary-900 via-primary-600 to-primary-900 text-white py-6 2xl:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="z-10">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-white mb-4"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-teal-100 max-w-md"
          >
            {subtitle}
          </motion.p>
        </div>

        {illustration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={illustration}
              alt="Contact illustration"
              className="max-w-xs w-full h-auto"
            />
          </motion.div>
        )}
      </div>

      {/* Decorative background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
      />
    </div>
  );
};

export default ContactHeader;
