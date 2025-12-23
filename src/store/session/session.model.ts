import * as z from "zod";

import i18n from "@/lib/i18n";
import { FieldValidationType } from "@/lib/zod.config";

export type SessionUser = {
  id: string;
  avatar_url: string;
  created_at: Date;
  username: string;
  email: string;
};

export type SessionModel = {
  user: SessionUser | null;
};

export const LoginSchema = z.object({
  email: FieldValidationType.REQUIRED_EMAIL,
  password: FieldValidationType.REQUIRED_STRING,
});

export type LoginModel = z.infer<typeof LoginSchema>;

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
