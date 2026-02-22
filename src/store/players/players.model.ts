import * as z from "zod";

import { FieldValidationType } from "@/lib/zod.config";

import type { ItemAbility, ItemDamage, ItemModel, Rarity } from "@/store/items";

export type PlayerModel = {
  id: string;
  name: string;
  total_experience: number;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
};

export type InventoryItem = {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  rarity: Rarity;
  description: string;
  weight: number;
  is_equipped: boolean;
  is_consumable: boolean;
  is_attuned: boolean;
  quantity: number;
  requires_attunement: boolean;
  damages?: ItemDamage[];
  abilities?: ItemAbility[];
};

export type UpdateInventoryItem = Partial<
  Pick<InventoryItem, "is_attuned" | "is_equipped" | "quantity">
>;

export type PlayerWithInventoryModel = {
  id: string;
  name: string;
  total_experience: number;
  items?: InventoryItem[];
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

export type PlayerXpModel = {
  xp: number;
  ids: string[];
};

export type AddItemToInventoriesModel = {
  item: ItemModel;
};

export type UpdatePlayerInventoryModel = {
  item_id: string;
  is_attuned: boolean;
  is_equipped: boolean;
  quantity: number;
};
