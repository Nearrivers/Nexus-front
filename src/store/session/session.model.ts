import * as z from "zod";

import type { PlayerModel } from "@/store/players";

import { FieldValidationType } from "@/lib/zod.config";

export type SessionModel = {
  player: PlayerModel | null;
};

export const LoginSchema = z.object({
  password: FieldValidationType.REQUIRED_STRING,
});

export type LoginModel = z.infer<typeof LoginSchema>;
