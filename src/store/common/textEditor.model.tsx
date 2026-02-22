import type { JSX } from "react";

import i18n from "@/lib/i18n";
import { cn } from "@/lib/utils";

import {
  elementsColorVariant,
  AttributeImages,
  type DamageType,
  attributesType,
  type AttributeType,
  armourClassIconLink,
} from "@/store/items";

type FormattedMatch = JSX.Element;

export type TextEditorPatternConfigModel = {
  regex: () => RegExp;
  formatMatch: (match: RegExpMatchArray) => FormattedMatch;
};

export const PATTERNS_CONFIG: TextEditorPatternConfigModel[] = [
  {
    // Pattern pour détecter les dés de dégâts (ex: "2d6")
    regex: () => {
      const types = Object.keys(elementsColorVariant).join("|");
      return new RegExp(
        `\\[(\\d+)+d(4|6|8|10|12|20|100):(${types})(?:\\+)?(\\d?)\\]`,
        "gmi",
      );
    },
    formatMatch: ([, diceCount, diceSize, damageType, flatBonus]) => (
      <span
        className={cn(
          "inline-flex items-center font-bold",
          elementsColorVariant[damageType as DamageType],
        )}
      >
        {diceCount}d{diceSize}
        {flatBonus && <span>+{flatBonus}</span>}
        <span className="ml-1">
          {i18n.t(`damageTypes.${damageType}`, {
            ns: "items",
            defaultValue: "",
          })}
        </span>
        <img
          alt="damage-type"
          className="w-6"
          src={AttributeImages.get(damageType as DamageType) ?? ""}
        />
      </span>
    ),
  },
  {
    // Pattern pour détecter les classes d'armures (ex: "ac:12")
    regex: () => {
      const types = Object.keys(attributesType).join("|");
      return new RegExp(`\\[ac:(\\d+)(?:\\+)?(${types})?\\]`, "gmi");
    },
    formatMatch: ([, armorClass, bonusType]) => (
      <span className="inline-flex items-center font-bold">
        <span className="relative">
          <span className="absolute top-1/2 left-1/2 -translate-1/2 not-italic text-white text-shadow-lg  text-shadow-black">
            {armorClass}
          </span>
          <img
            className="w-10"
            alt="armour-class-icon"
            src={armourClassIconLink}
          />
        </span>
        {i18n.t("inventory.armourClass", { ns: "items" })}{" "}
        {bonusType &&
          i18n.t("form.modifier", {
            ns: "items",
            attribute: i18n.t(`attributeTypes.${bonusType as AttributeType}`, {
              ns: "items",
            }),
          })}
      </span>
    ),
  },
];
