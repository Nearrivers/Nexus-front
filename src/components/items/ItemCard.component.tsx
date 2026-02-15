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
  attributeColorVariant,
} from "@/store/items/items.model";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageOff, Sparkles } from "lucide-react";
import RichTextComponent from "../RichText.component";

type ItemCardComponentProps = {
  item: ItemModel | ItemFormModel;
  className?: string;
  onClick?: () => void;
};

type DamageDice = {
  diceSize: DiceSize;
  damageType: DamageType;
};

const ItemCardComponent = ({
  item,
  className,
  onClick,
}: ItemCardComponentProps) => {
  const { t } = useTranslation("items");
  const backgroundColor = RarityColors[item.rarity ?? "basic"];

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
    <div className="w-full rounded-xl dark bg-background bg-clip-content border border-[#78500099]">
      <Card
        style={
          {
            "--gradient-color": backgroundColor.bgColor,
          } as CSSProperties
        }
        onClick={onClick}
        className={cn(
          "font-serif bg-[linear-gradient(to_bottom,var(--gradient-color),#1B1A1999,#1B1A1999,#40295199)] border-none w-full h-full flex justify-between",
          className,
        )}
      >
        <div className="h-full flex-1 flex flex-col gap-2 justify-between">
          <CardHeader className="flex justify-between">
            <div>
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
              <CardDescription className="flex flex-col gap-6">
                <p className="italic text-sm">
                  {item.rarity && t(`rarities.${item.rarity}`)}
                </p>
                {item.damages && item.damages?.length > 0 && (
                  <>
                    <section className="flex gap-8">
                      <div className="relative h-12 ml-4 w-12">
                        {damageDices?.map((d, i) => (
                          <img
                            key={i}
                            src={
                              DiceImages.get(
                                hashDiceDamageKey(d.diceSize, d.damageType),
                              ) ?? undefined
                            }
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
                              src={AttributeImages.get(
                                d.damage_type ?? "slashing",
                              )}
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
                        {t("form.enchanted", {
                          bonus: item.damages?.[0].flat_bonus,
                        })}
                      </p>
                    )}
                  </>
                )}
              </CardDescription>
            </div>
            {item.imageUrl?.length ? (
              <img className="w-24" alt="preview" src={item.imageUrl} />
            ) : (
              <ImageOff color="#fff" className="w-6" />
            )}
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {item.abilities && (
              <section className="flex flex-col gap-4">
                {item.abilities?.map((ability, index) => (
                  <>
                    <article key={index} className="whitespace-pre-line">
                      <span className="text-[#e2e4ba]">{ability.name}:</span>{" "}
                      <RichTextComponent
                        patternName="damage"
                        text={ability.description ?? ""}
                        className="inline text-muted-foreground opacity-90"
                      />
                    </article>
                    <hr />
                  </>
                ))}
              </section>
            )}
            <RichTextComponent
              className="opacity-60 italic whitespace-pre-line"
              text={item.description ?? ""}
              patternName="damage"
            />
            {item.requires_attunement && (
              <div className="opacity-60 items-center flex gap-2">
                <Sparkles className="w-4" />
                <p className="italic whitespace-pre-line">
                  {t("form.attunement")}
                </p>
              </div>
            )}
          </CardContent>
        </div>
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
    </div>
  );
};

export default ItemCardComponent;
