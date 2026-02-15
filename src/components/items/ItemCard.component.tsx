import { type CSSProperties } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

import {
  RarityColors,
  type ItemModel,
  type ItemFormModel,
  type DamageType,
  DiceImages,
  type DiceSize,
  hashDiceDamageKey,
  AttributeImages,
} from "@/store/items/items.model";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ItemCardComponentProps = {
  item: ItemModel | ItemFormModel;
};

type DamageDice = {
  diceSize: DiceSize;
  damageType: DamageType;
};

const ItemCardComponent = ({ item }: ItemCardComponentProps) => {
  const { t } = useTranslation("items");
  const backgroundColor = RarityColors[item.rarity ?? "basic"];

  const attributeColorVariant = {
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
  };

  const damageDices = item.damages?.reduce((prev, curr) => {
    return prev.concat(
      Array(
        curr.dice_count && curr.dice_count > 4 ? 4 : (curr.dice_count ?? 0),
      ).fill({
        diceSize: curr.dice_size,
        damageType: curr.damage_type,
      }),
    );
  }, [] as DamageDice[]);

  const diceClasses = (index: number) => {
    switch (index) {
      case 0:
        return "z-4";
      case 1:
        return "z-3 -top-3 -left-6 -rotate-25";
      case 2:
        return "z-2 -top-3 -right-6 rotate-25";
      case 3:
        return "z-1 -top-6";
    }
  };

  return (
    <Card
      style={
        {
          "--gradient-color": backgroundColor.bgColor,
        } as CSSProperties
      }
      className="font-serif bg-[linear-gradient(to_bottom,var(--gradient-color),#1B1A1999,#1B1A1999,#40295199)] w-full h-full border border-[#78500066]"
    >
      <CardHeader className="relative">
        <CardTitle
          style={
            {
              "--text-color": backgroundColor.textColor,
            } as CSSProperties
          }
          className={cn(
            item.rarity !== "basic"
              ? "text-(--text-color)"
              : "text-muted-foreground",
            "font-medium text-xl",
          )}
        >
          {item.name}
        </CardTitle>
        <CardDescription className="italic text-sm">
          {item.rarity && t(`rarities.${item.rarity}`)}
        </CardDescription>
        <img
          className="w-24 absolute top-0 right-6"
          alt="preview"
          src={item.imageUrl}
        />
      </CardHeader>
      <CardContent>
        {item.damages && item.damages?.length > 0 && (
          <>
            <section className="flex gap-8">
              <div className="relative h-12 ml-4 w-12">
                {damageDices?.map((d, i) => (
                  <img
                    key={i}
                    src={DiceImages.get(
                      hashDiceDamageKey(d.diceSize, d.damageType),
                    )}
                    className={cn("absolute w-12", diceClasses(i))}
                  />
                ))}
              </div>
              <div>
                {item.damages?.map((d, i) => (
                  <p
                    key={i}
                    className={
                      attributeColorVariant[d.damage_type ?? "slashing"]
                    }
                  >
                    {i > 0 && <span>+</span>}
                    {d.dice_count}d{d.dice_size}
                    <img
                      className="w-6 inline"
                      src={AttributeImages.get(d.damage_type ?? "slashing")}
                    />
                    {t(`damageTypes.${d.damage_type ?? "slashing"}`)}
                  </p>
                ))}
                {item.damages[0]?.attribute_bonus && (
                  <p>
                    {t("form.modifier", {
                      attribute: t(
                        `attributeTypes.${item.damages[0]?.attribute_bonus}`,
                      ),
                    })}
                  </p>
                )}
                {item.damages?.[0].proficiency_bonus && (
                  <p>{t("form.proficiency")}</p>
                )}
              </div>
            </section>
            {!!item.damages?.[0].flat_bonus && (
              <p className="py-4 opacity-80">
                <img
                  className="w-6 inline"
                  src="https://bg3.wiki/w/images/0/0a/Dippable_Icon.png"
                />
                {t("form.enchanted", { bonus: item.damages?.[0].flat_bonus })}
              </p>
            )}
          </>
        )}
        <p className="opacity-60 italic">{item.description}</p>
      </CardContent>
      <CardFooter className="text-sm justify-between">
        <p className="opacity-40 italic">{item.type}</p>
        <div className="flex items-center">
          <img
            className="w-6"
            src="https://bg3.wiki/w/images/e/ea/Weight_Icon.png"
          />
          <p>{item.weight}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemCardComponent;
