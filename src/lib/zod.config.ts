import * as z from "zod";

import i18n from "./i18n";

export const FieldValidationType = {
  REQUIRED_STRING: z
    .string(i18n.t("fields.required", { ns: "errors" }))
    .nonempty(i18n.t("fields.required", { ns: "errors" })),
  REQUIRED_NUMBER: z.number(i18n.t("fields.required", { ns: "errors" })),
  REQUIRED_BOOLEAN: z.boolean(i18n.t("fields.required", { ns: "errors" })),
  REQUIRED_COLOR: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
  REQUIRED_LENGTH_STRING: (length: number) =>
    z
      .string(i18n.t("fields.required", { ns: "errors" }))
      .length(length, i18n.t("fields.length", { ns: "errors", length })),
};
