import * as z from "zod";

import { FieldValidationType } from "@/lib/zod.config";

export type TagModel = {
  id: string;
  name: string;
  color: string;
};

export const TagSchema = z.object({
  name: z.string(),
  color: FieldValidationType.REQUIRED_COLOR,
});

export type TagFormModel = z.infer<typeof TagSchema>;
