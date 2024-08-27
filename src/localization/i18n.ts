import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationUz from "../localization/translationUz.json";
import translationRu from "../localization/translationRu.json";

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: translationRu },
    uz: { translation: translationUz },
  },
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
  debug: true,
  react: {
    useSuspense: false,
  },
});

export const switchToRussian = () => {
  i18n.changeLanguage("ru");
};

export const switchToUzbek = () => {
  i18n.changeLanguage("uz");
};
i18n.on("languageChanged", (lng) => {
  console.log(`Language changed to ${lng}`);
});

export default i18n;
