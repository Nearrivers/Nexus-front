import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import globalTransFR from "@/assets/locales/fr/global.translations.json";
import loginTransFR from "@/assets/locales/fr/login.translations.json";
import errorsTransFR from "@/assets/locales/fr/errors.translations.json";
import homeTransFR from "@/assets/locales/fr/home.translations.json";
import playersTransFR from "@/assets/locales/fr/players.translations.json";
import itemsTransFR from "@/assets/locales/fr/items.translations.json";

export type LocaleEnum = "FR";

export const Translations = {
  ["FR"]: {
    global: globalTransFR,
    login: loginTransFR,
    errors: errorsTransFR,
    home: homeTransFR,
    players: playersTransFR,
    items: itemsTransFR,
  },
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
