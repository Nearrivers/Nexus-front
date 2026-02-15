import i18n, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";

export type LocaleEnum = "FR";

export const Translations: Record<LocaleEnum, Resource> = {
  ["FR"]: {},
} as const;

void i18n.use(initReactI18next).init(
  {
    resources: Translations,
    fallbackLng: ["FR"],
    lng: "FR",
    interpolation: {
      escapeValue: false,
    },
  },
  (err: unknown) => {
    if (err) throw new Error("Couldn't load translations, exploding");
  },
);

export default i18n;
