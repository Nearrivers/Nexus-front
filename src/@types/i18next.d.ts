import "i18next";

import { Translations } from "@/lib/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: (typeof Translations)["FR"];
  }
}
