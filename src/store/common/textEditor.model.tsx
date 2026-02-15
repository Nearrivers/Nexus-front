import type { JSX } from "react";

import {
  attributeColorVariant,
  AttributeImages,
  type DamageType,
} from "@/store/items";
import i18n from "@/lib/i18n";
import { cn } from "@/lib/utils";

type FormattedMatch = JSX.Element;

export type PatternName = "damage";

type TextEditorPatternConfigModel = {
  regex: () => RegExp;
  formatMatch: (match: RegExpMatchArray) => FormattedMatch;
};

export type TextEditorPatternConfigMapModel = Map<
  PatternName,
  TextEditorPatternConfigModel
>;

export const PATTERN_CONFIGS: TextEditorPatternConfigMapModel = new Map([
  [
    "damage",
    {
      // Pattern pour détecter les dés de dégâts (ex: "2d6")
      regex: () => {
        const types = Object.keys(attributeColorVariant).join("|");
        return new RegExp(
          `\\[(\\d)+d(4|6|8|10|12|20|100):(${types})(?:\\+)?(\\d?)\\]`,
          "gmi",
        );
      },
      formatMatch: ([_, diceCount, diceSize, damageType, flatBonus]) => (
        <span
          className={cn(
            "inline-flex items-center font-bold",
            attributeColorVariant[damageType as DamageType],
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
            src={AttributeImages.get(damageType as DamageType)}
          />
        </span>
      ),
    },
  ],
]) satisfies TextEditorPatternConfigMapModel;
