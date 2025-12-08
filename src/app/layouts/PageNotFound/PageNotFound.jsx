import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FuzzyText } from "../../components";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen gap-6 text-center px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <FuzzyText color="black" fontSize={80} baseIntensity={0.1}>
        404
      </FuzzyText>
      <FuzzyText color="black" fontSize={32} baseIntensity={0.1}>
        {t('pageNotFound')}
      </FuzzyText>
      <p className="text-gray-500">
        {t('pageNotFoundDescription')}
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary/80 transition"
      >
        {t('goToHomepage')}
      </Link>
    </motion.div>
  );
}
