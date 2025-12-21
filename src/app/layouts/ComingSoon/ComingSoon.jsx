import { useTranslation } from "react-i18next";

export default function ComingSoon() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="text-center bg-linear-to-r from-primary via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
        <h1 className="text-4xl font-bold mb-4 text-transparent">{t("comingSoon")}</h1>
        <p className="text-lg text-gray-600">{t("comingSoonDescription")}</p>
      </div>
    </div>
  );
}