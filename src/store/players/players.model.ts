import * as z from "zod";

import { FieldValidationType } from "@/lib/zod.config";

export type PlayerModel = {
  id: string;
  name: string;
  class: string;
  total_experience: number;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
};

export const PlayerSchema = z.object({
  name: FieldValidationType.REQUIRED_STRING,
  pinCode: FieldValidationType.REQUIRED_LENGTH_STRING(9),
  class: FieldValidationType.REQUIRED_STRING,
  total_experience: FieldValidationType.REQUIRED_NUMBER,
  is_admin: FieldValidationType.REQUIRED_BOOLEAN,
});

export const PlayerFormModel = z.object({
  name: FieldValidationType.REQUIRED_STRING,
  pinCode: FieldValidationType.REQUIRED_LENGTH_STRING(9),
  class: FieldValidationType.REQUIRED_STRING,
  total_experience: FieldValidationType.REQUIRED_NUMBER,
  is_admin: FieldValidationType.REQUIRED_BOOLEAN,
});

export type PlayerFormModel = z.infer<typeof PlayerSchema>;
