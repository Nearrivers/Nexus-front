import * as z from "zod";

import i18n from "./i18n";

export const FieldValidationType = {
  REQUIRED_STRING: z.string(i18n.t("fields.required", { ns: "errors" })),
  REQUIRED_EMAIL: z.email(i18n.t("fields.email", { ns: "errors" })),
  REQUIRED_PASSWORD: z
    .string(i18n.t("fields.required", { ns: "errors" }))
    .min(8, i18n.t("fields.min", { ns: "errors" }))
    .max(100, i18n.t("fields.max", { ns: "errors" }))
    .regex(/[A-Z]/, i18n.t("fields.uppercase", { ns: "errors" }))
    .regex(/[a-z]/, i18n.t("fields.lowercase", { ns: "errors" }))
    .regex(/\d/, i18n.t("fields.number", { ns: "errors" }))
    .regex(
      /[-#!$@£%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/,
      i18n.t("fields.special", { ns: "errors" }),
    ),
  REQUIRED_COLOR: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
};
