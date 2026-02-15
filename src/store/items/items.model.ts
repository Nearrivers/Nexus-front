import * as z from "zod";

import { FieldValidationType } from "@/lib/zod.config";

export const ZodRarity = z.enum([
  "basic",
  "common",
  "rare",
  "very_rare",
  "legendary",
  "quest_item",
]);

export type Rarity = z.infer<typeof ZodRarity>;

type RarityTextAndBgColors = {
  bgColor: string;
  textColor: string;
};

export const RarityColors: Record<Rarity, RarityTextAndBgColors> = {
  basic: {
    bgColor: "#1B1A1999",
    textColor: "#FFF",
  },
  common: {
    bgColor: "#00491599",
    textColor: "#01BD39",
  },
  rare: {
    bgColor: "#00374999",
    textColor: "#01BFFF",
  },
  very_rare: {
    bgColor: "#54003299",
    textColor: "#D1017B",
  },
  legendary: {
    bgColor: "#563E0D99",
    textColor: "#B7861D",
  },
  quest_item: {
    bgColor: "#561D0099",
    textColor: "#FF5901",
  },
};

export const ZodDamageType = z.enum([
  "slashing",
  "piercing",
  "bludgeoning",
  "fire",
  "cold",
  "lightning",
  "poison",
  "acid",
  "psychic",
  "necrotic",
  "radiant",
  "force",
  "healing",
  "thunder",
]);

export type DamageType = z.infer<typeof ZodDamageType>;

export const ZodAttributeType = z.enum([
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
]);

export type AttributeType = z.infer<typeof ZodAttributeType>;

export const ZodDiceSize = z.union([
  z.literal(4),
  z.literal(6),
  z.literal(8),
  z.literal(10),
  z.literal(12),
]);

export type DiceSize = z.infer<typeof ZodDiceSize>;

export type ItemDamage = {
  id: string;
  dice_count: number;
  dice_size: DiceSize;
  damage_type: DamageType;
  flat_bonus: number;
  attribute_bonus: AttributeType;
  proficiency_bonus: boolean;
  created_at: Date;
};

export type ItemAbility = {
  name: string;
  description: string;
  activation: string;
};

export type ItemOwner = {
  item_id: string;
  player_id: string;
  player_name: string;
  quantity: number;
};

export type ItemModel = {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  rarity: Rarity;
  description: string;
  weight: number;
  requires_attunement: boolean;
  isEquippable: boolean;
  isConsumable: boolean;
  damages?: ItemDamage[];
  abilities?: ItemAbility[];
  owners?: ItemOwner[];
};

const ItemDamageSchema = z.object({
  dice_count: FieldValidationType.REQUIRED_NUMBER,
  dice_size: ZodDiceSize,
  damage_type: ZodDamageType.optional(),
  flat_bonus: FieldValidationType.OPTIONAL_NUMBER,
  attribute_bonus: ZodAttributeType.optional(),
  proficiency_bonus: FieldValidationType.OPTIONAL_BOOLEAN,
});

const ItemDamageFormSchema = z.object({
  dice_count: FieldValidationType.OPTIONAL_NUMBER,
  dice_size: ZodDiceSize.optional(),
  damage_type: ZodDamageType.optional(),
  flat_bonus: FieldValidationType.OPTIONAL_NUMBER,
  attribute_bonus: ZodAttributeType.optional(),
  proficiency_bonus: FieldValidationType.OPTIONAL_BOOLEAN,
});

export type ItemDamageFormModel = z.infer<typeof ItemDamageFormSchema>;

const ItemAbilitySchema = z.object({
  name: FieldValidationType.REQUIRED_STRING,
  description: FieldValidationType.OPTIONAL_STRING,
  activation: FieldValidationType.OPTIONAL_STRING,
});

const ItemAbilityFormSchema = z.object({
  name: FieldValidationType.OPTIONAL_STRING,
  description: FieldValidationType.OPTIONAL_STRING,
  activation: FieldValidationType.OPTIONAL_STRING,
});

export type ItemAbilityFormModel = z.infer<typeof ItemAbilityFormSchema>;

export const ItemSchema = z.object({
  name: FieldValidationType.REQUIRED_STRING,
  type: FieldValidationType.REQUIRED_STRING,
  imageUrl: z.string().optional(),
  rarity: ZodRarity,
  description: FieldValidationType.REQUIRED_STRING,
  weight: FieldValidationType.REQUIRED_NUMBER,
  isEquippable: FieldValidationType.REQUIRED_BOOLEAN,
  requires_attunement: FieldValidationType.REQUIRED_BOOLEAN,
  isConsumable: FieldValidationType.REQUIRED_BOOLEAN,
  damages: z.array(ItemDamageSchema).optional(),
  abilities: z.array(ItemAbilitySchema).optional(),
});

export const ItemFormSchema = z.object({
  name: FieldValidationType.OPTIONAL_STRING,
  type: FieldValidationType.OPTIONAL_STRING,
  imageUrl: FieldValidationType.OPTIONAL_STRING,
  rarity: ZodRarity.optional(),
  description: FieldValidationType.OPTIONAL_STRING,
  weight: FieldValidationType.OPTIONAL_NUMBER,
  isEquippable: FieldValidationType.OPTIONAL_BOOLEAN,
  requires_attunement: FieldValidationType.OPTIONAL_BOOLEAN,
  isConsumable: FieldValidationType.OPTIONAL_BOOLEAN,
  damages: z.array(ItemDamageFormSchema).optional(),
  abilities: z.array(ItemAbilityFormSchema).optional(),
});

export type ItemFormModel = z.infer<typeof ItemFormSchema>;

export function hashDiceDamageKey(
  diceSize: DiceSize,
  damageType: DamageType,
): string {
  return JSON.stringify([diceSize, damageType]);
}

export const attributeColorVariant = {
  acid: "text-[#80b000]",
  slashing: "text-[#8c8c8c]",
  bludgeoning: "text-[#8c8c8c]",
  piercing: "text-[#8c8c8c]",
  force: "text-[cc3333]",
  fire: "text-[#ee5500]",
  radiant: "text-[#ccaa00]",
  poison: "text-[#44bb00]",
  necrotic: "text-[#40b050]",
  healing: "text-[#30bbbb]",
  cold: "text-[#3399cc]",
  lightning: "text-[#3366cc]",
  thunder: "text-[#8844bb]",
  psychic: "text-[#cc77aa]",
} satisfies {
  [K in DamageType]: string;
};

export const DiceImages = new Map<string, string>();
DiceImages.set(
  hashDiceDamageKey(4, "slashing"),
  "https://bg3.wiki/w/images/3/31/D4_Physical.png?20230130170927",
);

DiceImages.set(
  hashDiceDamageKey(4, "piercing"),
  "https://bg3.wiki/w/images/3/31/D4_Physical.png?20230130170927",
);
DiceImages.set(
  hashDiceDamageKey(4, "bludgeoning"),
  "https://bg3.wiki/w/images/3/31/D4_Physical.png?20230130170927",
);
DiceImages.set(
  hashDiceDamageKey(4, "acid"),
  "https://bg3.wiki/w/images/d/db/D4_Acid.png?20230130175903",
);
DiceImages.set(
  hashDiceDamageKey(4, "cold"),
  "https://bg3.wiki/w/images/c/ce/D4_Cold.png?20230130175913",
);
DiceImages.set(
  hashDiceDamageKey(4, "fire"),
  "https://bg3.wiki/w/images/f/ff/D4_Fire.png?20250919082359",
);
DiceImages.set(
  hashDiceDamageKey(4, "force"),
  "https://bg3.wiki/w/images/8/86/D4_Force.png",
);
DiceImages.set(
  hashDiceDamageKey(4, "healing"),
  "https://bg3.wiki/w/images/8/87/D4_Healing.png?20230130180220",
);
DiceImages.set(
  hashDiceDamageKey(4, "lightning"),
  "https://bg3.wiki/w/images/c/c8/D4_Lightning.png?20230130180231",
);
DiceImages.set(
  hashDiceDamageKey(4, "necrotic"),
  "https://bg3.wiki/w/images/5/5c/D4_Necrotic.png?20230130180247",
);
DiceImages.set(
  hashDiceDamageKey(4, "poison"),
  "https://bg3.wiki/w/images/5/5c/D4_Necrotic.png?20230130180247",
);
DiceImages.set(
  hashDiceDamageKey(4, "psychic"),
  "https://bg3.wiki/w/images/8/86/D4_Psychic.png?20230130180329",
);
DiceImages.set(
  hashDiceDamageKey(4, "radiant"),
  "https://bg3.wiki/w/images/a/a9/D4_Radiant.png?20230130180339",
);
DiceImages.set(
  hashDiceDamageKey(4, "thunder"),
  "https://bg3.wiki/w/images/3/3e/D4_Thunder.png?20230130180206",
);
DiceImages.set(
  hashDiceDamageKey(6, "acid"),
  "https://bg3.wiki/w/images/9/92/D6_Acid.png?20230130183432",
);
DiceImages.set(
  hashDiceDamageKey(6, "slashing"),
  "https://bg3.wiki/w/images/2/2b/D6_Physical.png?20230130174423",
);
DiceImages.set(
  hashDiceDamageKey(6, "piercing"),
  "https://bg3.wiki/w/images/2/2b/D6_Physical.png?20230130174423",
);
DiceImages.set(
  hashDiceDamageKey(6, "bludgeoning"),
  "https://bg3.wiki/w/images/2/2b/D6_Physical.png?20230130174423",
);
DiceImages.set(
  hashDiceDamageKey(6, "cold"),
  "https://bg3.wiki/w/images/6/67/D6_Cold.png?20230130183128",
);
DiceImages.set(
  hashDiceDamageKey(6, "fire"),
  "https://bg3.wiki/w/images/9/96/D6_Fire.png?20230130184539",
);
DiceImages.set(
  hashDiceDamageKey(6, "force"),
  "https://bg3.wiki/w/images/7/7f/D6_Force.png?20230130183209",
);

DiceImages.set(
  hashDiceDamageKey(6, "healing"),
  "https://bg3.wiki/w/images/7/74/D6_Healing.png?20230130183231",
);
DiceImages.set(
  hashDiceDamageKey(6, "lightning"),
  "https://bg3.wiki/w/images/6/6f/D6_Lightning.png?20230130183250",
);
DiceImages.set(
  hashDiceDamageKey(6, "necrotic"),
  "https://bg3.wiki/w/images/f/fe/D6_Necrotic.png?20230130183341",
);
DiceImages.set(
  hashDiceDamageKey(6, "poison"),
  "https://bg3.wiki/w/images/f/f5/D6_Poison.png?20230130183308",
);
DiceImages.set(
  hashDiceDamageKey(6, "psychic"),
  "https://bg3.wiki/w/images/e/ea/D6_Psychic.png?20230130183408",
);
DiceImages.set(
  hashDiceDamageKey(6, "radiant"),
  "https://bg3.wiki/w/images/a/a5/D6_Radiant.png?20230130183419",
);
DiceImages.set(
  hashDiceDamageKey(6, "thunder"),
  "https://bg3.wiki/w/images/5/52/D6_Thunder.png?20230130183329",
);
DiceImages.set(
  hashDiceDamageKey(8, "acid"),
  "https://bg3.wiki/w/images/e/ee/D8_Acid.png?20230131154216",
);

DiceImages.set(
  hashDiceDamageKey(8, "slashing"),
  "https://bg3.wiki/w/images/8/8a/D8_Physical.png?20230130174507",
);
DiceImages.set(
  hashDiceDamageKey(8, "piercing"),
  "https://bg3.wiki/w/images/8/8a/D8_Physical.png?20230130174507",
);
DiceImages.set(
  hashDiceDamageKey(8, "bludgeoning"),
  "https://bg3.wiki/w/images/8/8a/D8_Physical.png?20230130174507",
);
DiceImages.set(
  hashDiceDamageKey(8, "cold"),
  "https://bg3.wiki/w/images/9/90/D8_Cold.png?20230131154231",
);
DiceImages.set(
  hashDiceDamageKey(8, "fire"),
  "https://bg3.wiki/w/images/d/d8/D8_Fire.png?20230131154243",
);
DiceImages.set(
  hashDiceDamageKey(8, "force"),
  "https://bg3.wiki/w/images/9/96/D8_Force.png?20230131154005",
);

DiceImages.set(
  hashDiceDamageKey(8, "healing"),
  "https://bg3.wiki/w/images/c/ce/D8_Healing.png?20230131154255",
);
DiceImages.set(
  hashDiceDamageKey(8, "lightning"),
  "https://bg3.wiki/w/images/0/0e/D8_Lightning.png?20230131154311",
);
DiceImages.set(
  hashDiceDamageKey(8, "necrotic"),
  "https://bg3.wiki/w/images/7/73/D8_Necrotic.png?20230131154323",
);
DiceImages.set(
  hashDiceDamageKey(8, "poison"),
  "https://bg3.wiki/w/images/9/97/D8_Poison.png?20230131154033",
);
DiceImages.set(
  hashDiceDamageKey(8, "psychic"),
  "https://bg3.wiki/w/images/9/92/D8_Psychic.png?20230131154044",
);
DiceImages.set(
  hashDiceDamageKey(8, "radiant"),
  "https://bg3.wiki/w/images/0/0c/D8_Radiant.png?20230131154340",
);
DiceImages.set(
  hashDiceDamageKey(8, "thunder"),
  "https://bg3.wiki/w/images/3/37/D8_Thunder.png?20230131154203",
);
DiceImages.set(
  hashDiceDamageKey(10, "acid"),
  "https://bg3.wiki/w/images/f/ff/D10_Acid.png?20230131162257",
);
DiceImages.set(
  hashDiceDamageKey(10, "slashing"),
  "https://bg3.wiki/w/images/0/0d/D10_Physical.png?20230130174528",
);
DiceImages.set(
  hashDiceDamageKey(10, "piercing"),
  "https://bg3.wiki/w/images/0/0d/D10_Physical.png?20230130174528",
);
DiceImages.set(
  hashDiceDamageKey(10, "bludgeoning"),
  "https://bg3.wiki/w/images/0/0d/D10_Physical.png?20230130174528",
);
DiceImages.set(
  hashDiceDamageKey(10, "cold"),
  "https://bg3.wiki/w/images/b/b0/D10_Cold.png?20230131162333",
);
DiceImages.set(
  hashDiceDamageKey(10, "fire"),
  "https://bg3.wiki/w/images/e/ea/D10_Fire.png?20230131162541",
);
DiceImages.set(
  hashDiceDamageKey(10, "force"),
  "https://bg3.wiki/w/images/8/80/D10_Force.png?20230131162557",
);
DiceImages.set(
  hashDiceDamageKey(10, "healing"),
  "https://bg3.wiki/w/images/1/19/D10_Healing.png?20220523075938",
);
DiceImages.set(
  hashDiceDamageKey(10, "lightning"),
  "https://bg3.wiki/w/images/6/68/D10_Lightning.png?20230131162425",
);
DiceImages.set(
  hashDiceDamageKey(10, "necrotic"),
  "https://bg3.wiki/w/images/d/da/D10_Necrotic.png?20230131162623",
);
DiceImages.set(
  hashDiceDamageKey(10, "poison"),
  "https://bg3.wiki/w/images/4/45/D10_Poison.png?20230131162447",
);
DiceImages.set(
  hashDiceDamageKey(10, "psychic"),
  "https://bg3.wiki/w/images/2/2b/D10_Psychic.png?20230131162502",
);
DiceImages.set(
  hashDiceDamageKey(10, "radiant"),
  "https://bg3.wiki/w/images/1/17/D10_Radiant.png?20230131162652",
);
DiceImages.set(
  hashDiceDamageKey(10, "thunder"),
  "https://bg3.wiki/w/images/8/8b/D10_Thunder.png?20230131162527",
);
DiceImages.set(
  hashDiceDamageKey(12, "acid"),
  "https://bg3.wiki/w/images/2/23/D12_Acid.png?20230131163718",
);

DiceImages.set(
  hashDiceDamageKey(12, "slashing"),
  "https://bg3.wiki/w/images/b/b2/D12_Physical.png?20230130174555",
);
DiceImages.set(
  hashDiceDamageKey(12, "piercing"),
  "https://bg3.wiki/w/images/b/b2/D12_Physical.png?20230130174555",
);
DiceImages.set(
  hashDiceDamageKey(12, "bludgeoning"),
  "https://bg3.wiki/w/images/b/b2/D12_Physical.png?20230130174555",
);
DiceImages.set(
  hashDiceDamageKey(12, "cold"),
  "https://bg3.wiki/w/images/c/c3/D12_Cold.png?20230131163739",
);
DiceImages.set(
  hashDiceDamageKey(12, "fire"),
  "https://bg3.wiki/w/images/9/94/D12_Fire.png?20230131163818",
);

DiceImages.set(
  hashDiceDamageKey(12, "force"),
  "https://bg3.wiki/w/images/1/11/D12_Force.png?20230131163847",
);

DiceImages.set(
  hashDiceDamageKey(12, "healing"),
  "https://bg3.wiki/w/images/a/a9/D12_Healing.png?20230131163653",
);

DiceImages.set(
  hashDiceDamageKey(12, "lightning"),
  "https://bg3.wiki/w/images/7/7f/D12_Lightning.png?20230131163923",
);

DiceImages.set(
  hashDiceDamageKey(12, "necrotic"),
  "https://bg3.wiki/w/images/3/39/D12_Necrotic.png?20230131163908",
);

DiceImages.set(
  hashDiceDamageKey(12, "poison"),
  "https://bg3.wiki/w/images/b/bd/D12_Poison.png?20230131164004",
);

DiceImages.set(
  hashDiceDamageKey(12, "psychic"),
  "https://bg3.wiki/w/images/a/a8/D12_Psychic.png?20230131163937",
);

DiceImages.set(
  hashDiceDamageKey(12, "radiant"),
  "https://bg3.wiki/w/images/0/02/D12_Radiant.png?20230131163956",
);

DiceImages.set(
  hashDiceDamageKey(12, "thunder"),
  "https://bg3.wiki/w/images/f/f9/D12_Thunder.png?20230131164023",
);

export const AttributeImages = new Map<DamageType, string>([
  [
    "slashing",
    "https://bg3.wiki/w/images/archive/f/f0/20230129173102%21Slashing_Damage_Icon.png",
  ],
  [
    "piercing",
    "https://bg3.wiki/w/images/archive/0/0b/20230129172607%21Piercing_Damage_Icon.png",
  ],
  [
    "bludgeoning",
    "https://bg3.wiki/w/images/archive/7/7d/20230129173824%21Bludgeoning_Damage_Icon.png",
  ],
  [
    "fire",
    "https://bg3.wiki/w/images/archive/8/84/20230129180911%21Fire_Damage_Icon.png",
  ],
  [
    "cold",
    "https://bg3.wiki/w/images/archive/0/05/20230129180855%21Cold_Damage_Icon.png",
  ],
  [
    "lightning",
    "https://bg3.wiki/w/images/archive/3/31/20230129181044%21Lightning_Damage_Icon.png",
  ],
  [
    "poison",
    "https://bg3.wiki/w/images/archive/5/55/20230129181146%21Poison_Damage_Icon.png",
  ],
  [
    "acid",
    "https://bg3.wiki/w/images/archive/5/5f/20230129181008%21Acid_Damage_Icon.png",
  ],
  [
    "psychic",
    "https://bg3.wiki/w/images/archive/0/04/20230129181256%21Psychic_Damage_Icon.png",
  ],
  [
    "necrotic",
    "https://bg3.wiki/w/images/archive/3/39/20230129181239%21Necrotic_Damage_Icon.png",
  ],
  [
    "radiant",
    "https://bg3.wiki/w/images/archive/7/78/20230129181221%21Radiant_Damage_Icon.png",
  ],
  [
    "force",
    "https://bg3.wiki/w/images/archive/d/d1/20230129181058%21Force_Damage_Icon.png",
  ],
  [
    "healing",
    "https://bg3.wiki/w/images/thumb/a/ac/Healing_Icon.png/50px-Healing_Icon.png",
  ],
  [
    "thunder",
    "https://bg3.wiki/w/images/archive/8/87/20230129181200%21Thunder_Damage_Icon.png",
  ],
]);
