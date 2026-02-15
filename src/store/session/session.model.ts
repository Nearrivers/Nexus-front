import * as z from "zod";

import i18n from "@/lib/i18n";
import { FieldValidationType } from "@/lib/zod.config";

export type SessionUser = {
  id: string;
  pseudonym: string;
};

export type SessionModel = {
  accessToken: string;
  user: SessionUser | null;
};

export const SignUpSchema = z
  .object({
    confirmPassword: FieldValidationType.REQUIRED_STRING,
    password: FieldValidationType.REQUIRED_PASSWORD,
    email: FieldValidationType.REQUIRED_EMAIL,
    username: FieldValidationType.REQUIRED_STRING,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n.t("fields.passwordMatch", { ns: "errors" }),
    path: ["confirmPassword"], // path of error
  });

export type SignUpModel = z.infer<typeof SignUpSchema>;
