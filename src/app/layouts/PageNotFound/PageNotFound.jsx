import React from "react";
import { useTranslation } from "react-i18next";

export default function PageNotFound() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('pageNotFound')}</h1>
      <button onClick={() => window.history.back()}>
        {t('goBack')}
      </button>
    </div>
  );
}
