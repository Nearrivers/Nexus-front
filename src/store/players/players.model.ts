import * as z from "zod";

import { FieldValidationType } from "@/lib/zod.config";

export type PlayerModel = {
  id: string;
  name: string;
  total_experience: number;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
};

export const PlayerSchema = z.object({
  name: FieldValidationType.REQUIRED_STRING,
  pinCode: FieldValidationType.REQUIRED_LENGTH_STRING(9),
  total_experience: FieldValidationType.REQUIRED_NUMBER,
  is_admin: FieldValidationType.REQUIRED_BOOLEAN,
});

export const PlayerFormModel = z.object({
  name: FieldValidationType.REQUIRED_STRING,
  pinCode: FieldValidationType.REQUIRED_LENGTH_STRING(9),
  total_experience: FieldValidationType.REQUIRED_NUMBER,
  is_admin: FieldValidationType.REQUIRED_BOOLEAN,
});

export type PlayerFormModel = z.infer<typeof PlayerSchema>;
