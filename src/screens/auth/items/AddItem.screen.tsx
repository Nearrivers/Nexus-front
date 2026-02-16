import { finalize } from "rxjs";
import { Eye, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, type ChangeEvent, type FormEvent } from "react";

import useForm from "@/hooks/useForm.hook";
import useTypedNavigate from "@/hooks/useTypedNavigate.hook";

import { AUTH_ROUTES } from "@/@types/route-path";

import {
  ItemFormSchema,
  ItemSchema,
  ZodAttributeType,
  ZodDamageType,
  ZodDiceSize,
  ZodRarity,
  type DiceSize,
  type ItemAbilityFormModel,
  type ItemDamageFormModel,
  type ItemFormModel,
  type ItemOwner,
} from "@/store/items/items.model";
import { itemService } from "@/store/items";
import { imagesService } from "@/store/images";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Item } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import OwnersModal from "@/components/items/Owners.modal";
import SelectComponent from "@/components/inputs/Select.component";
import ItemCardComponent from "@/components/items/ItemCard.component";
import CheckboxComponent from "@/components/inputs/Checkbox.component";
import TextFieldComponent from "@/components/inputs/TextField.component";
import FileFieldComponent from "@/components/inputs/FileField.component";
import TextAreaFieldComponent from "@/components/inputs/TextAreaField.component";

const AddItemScreen = () => {
  const { t } = useTranslation("items");
  const navigate = useTypedNavigate();

  const [loading, setLoading] = useState(false);
  const [itemId, setItemId] = useState<string>("");
  const [hasDamage, setHasDamage] = useState(false);
  const [hasAbilities, setHasAbilities] = useState(false);

  const { data, setData, errors, displayErrors } = useForm(
    ItemFormSchema,
    ItemSchema,
    {
      name: undefined,
      type: undefined,
      description: undefined,
      imageUrl: undefined,
      isConsumable: false,
      isEquippable: false,
      requires_attunement: false,
      rarity: "basic",
      weight: 0,
      damages: undefined,
    } as ItemFormModel,
  );

  const emptyDamage = {
    dice_count: undefined,
    dice_size: undefined,
    attribute_bonus: undefined,
    damage_type: undefined,
    flat_bonus: undefined,
    proficiency_bonus: undefined,
  };

  const emptyAbility = {
    name: undefined,
    description: undefined,
    activation: undefined,
  };

  const [damagesBuffer, setDamageBuffer] = useState<ItemDamageFormModel[]>([
    emptyDamage,
  ]);

  const [abilitiesBuffer, setAbilitiesBuffer] = useState<
    ItemAbilityFormModel[]
  >([emptyAbility]);

  const diceCountValues = Array.from({ length: 10 }, (_, i) => i + 1);
  const diceSizeValues = Array.from(
    ZodDiceSize.options.map((zds) => zds.value),
  );
  const damageTypeValues = Array.from(ZodDamageType.options.map((zdt) => zdt));
  const attributeTypeValues = Array.from(
    ZodAttributeType.options.map((zat) => zat),
  );

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const err = displayErrors();
    if (err) {
      return;
    }

    setLoading(true);
    itemService
      .createItem(data)
      .pipe(finalize(() => setLoading(false)))
      .subscribe({
        next: (item) => {
          setItemId(item.id);
        },
      });
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    imagesService.uploadImage(file).subscribe({
      next: (img) => {
        e.target.value = "";
        setData((state) => ({
          ...state,
          imageUrl: img.url,
        }));
      },
    });
  };

  const handleCloseOwnersModal = (itemOwners?: ItemOwner[]) => {
    if (!itemOwners) {
      setItemId("");
      navigate(AUTH_ROUTES.home);
      return;
    }

    itemService
      .addItemToInventories(itemOwners.filter((i) => i.quantity > 0))
      .subscribe({
        next: () => {
          navigate(AUTH_ROUTES.home);
          setItemId("");
        },
      });
  };

  return (
    <section className="flex justify-center w-full">
      <OwnersModal
        open={!!itemId}
        itemId={itemId}
        handleClose={handleCloseOwnersModal}
      />
      <form
        noValidate
        id="item-form"
        onSubmit={handleSubmit}
        className="w-full lg:min-w-4xl gap-2 flex"
      >
        <section className="flex-1 flex items-center justify-center p-2">
          <Card className="w-full h-full">
            <CardHeader className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <CardTitle>{t("form.title")}</CardTitle>
                <CardDescription>{t("form.lead")}</CardDescription>
              </div>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button size="icon-sm" type="button" className="md:hidden">
                    <Eye />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerTitle className="sr-only">
                    {t("form.drawerTitle")}
                  </DrawerTitle>
                  <section className="p-4">
                    <ItemCardComponent item={data} />
                  </section>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">
                        {t("buttons.close", { ns: "global" })}
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <TextFieldComponent
                  id="name"
                  required
                  disabled={loading}
                  label={t("form.name")}
                  value={data.name}
                  handleChange={(name) =>
                    setData((state) => ({
                      ...state,
                      name,
                    }))
                  }
                  errors={errors?.name}
                />
                <FieldGroup className="border p-4 rounded-xl">
                  <TextFieldComponent
                    id="imageUrl"
                    required
                    disabled={loading}
                    label={t("form.imageUrl")}
                    value={data.imageUrl}
                    handleChange={(imageUrl) =>
                      setData((state) => ({
                        ...state,
                        imageUrl,
                      }))
                    }
                    errors={errors?.imageUrl}
                  />
                  <FileFieldComponent
                    required
                    accept="image/*"
                    id="imageUrlFile"
                    disabled={loading}
                    errors={errors?.imageUrl}
                    onChange={handleFileUpload}
                    label={t("form.uploadImage")}
                  />
                </FieldGroup>
                <TextFieldComponent
                  id="type"
                  required
                  disabled={loading}
                  label={t("form.type")}
                  value={data.type}
                  handleChange={(type) =>
                    setData((state) => ({
                      ...state,
                      type,
                    }))
                  }
                  errors={errors?.type}
                />
                <FieldGroup className="flex-row">
                  <SelectComponent
                    id="rarity"
                    value={data.rarity}
                    label={t("form.rarity")}
                    handleChange={(rarity) =>
                      setData((state) => ({
                        ...state,
                        rarity,
                      }))
                    }
                    errors={errors?.rarity}
                    placeholder={t("form.rarityPlaceholder")}
                    selectItems={ZodRarity.options.map((r) => ({
                      label: t(`rarities.${r}`),
                      value: r,
                    }))}
                  />
                  <TextFieldComponent
                    required
                    id="weight"
                    type="number"
                    step={0.1}
                    disabled={loading}
                    value={data.weight}
                    errors={errors?.weight}
                    label={t("form.weight")}
                    handleChange={(weight) =>
                      setData((state) => ({
                        ...state,
                        weight: +weight,
                      }))
                    }
                  />
                </FieldGroup>
                <TextAreaFieldComponent
                  required
                  id="description"
                  rows={6}
                  value={data.description}
                  errors={errors?.description}
                  label={t("form.description")}
                  handleChange={(description) =>
                    setData((state) => ({ ...state, description }))
                  }
                />
                <FieldGroup className="flex flex-row">
                  <CheckboxComponent
                    id="isEquipable"
                    label={t("form.isEquipable")}
                    disabled={loading}
                    checked={data.isEquippable}
                    handleChange={(checked) =>
                      setData((state) => ({
                        ...state,
                        isEquippable: !!checked,
                      }))
                    }
                  />
                  <CheckboxComponent
                    id="isConsumable"
                    label={t("form.isConsumable")}
                    disabled={loading}
                    checked={data.isConsumable}
                    handleChange={(checked) =>
                      setData((state) => ({
                        ...state,
                        isConsumable: !!checked,
                      }))
                    }
                  />
                </FieldGroup>
                <FieldGroup className="flex flex-row">
                  <CheckboxComponent
                    id="hasDamage"
                    label={t("form.hasDamage")}
                    disabled={loading}
                    checked={hasDamage}
                    handleChange={(checked) => {
                      setHasDamage(!!checked);
                      if (checked) {
                        setData((state) => ({
                          ...state,
                          damages: damagesBuffer,
                        }));
                        return;
                      }

                      setDamageBuffer(data.damages ?? []);
                      setData((state) => ({
                        ...state,
                        damages: undefined,
                      }));
                    }}
                  />
                  <CheckboxComponent
                    id="requiresAttunement"
                    label={t("form.requiresAttunement")}
                    disabled={loading}
                    checked={data.requires_attunement}
                    handleChange={(checked) =>
                      setData((state) => ({
                        ...state,
                        requires_attunement: !!checked,
                      }))
                    }
                  />
                </FieldGroup>
                <CheckboxComponent
                  id="hasAbilities"
                  label={t("form.hasAbilities")}
                  disabled={loading}
                  checked={hasAbilities}
                  handleChange={(checked) => {
                    setHasAbilities(!!checked);
                    if (checked) {
                      setData((state) => ({
                        ...state,
                        abilities: abilitiesBuffer,
                      }));
                      return;
                    }

                    setAbilitiesBuffer(data.abilities ?? []);
                    setData((state) => ({
                      ...state,
                      abilities: undefined,
                    }));
                  }}
                />
                {hasAbilities && data.abilities && data.abilities.length && (
                  <section className="flex flex-col gap-4 relative">
                    <hr />
                    <p className="leading-none font-semibold">
                      {t("form.itemAbilities")}
                    </p>
                    {data.abilities.map((a, index) => (
                      <Item variant="outline" key={index}>
                        {data.abilities && data.abilities.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="text-destructive absolute top-1 right-1"
                            onClick={() =>
                              setData((state) => ({
                                ...state,
                                abilities: state.abilities?.filter(
                                  (_, i) => i !== index,
                                ),
                              }))
                            }
                          >
                            <Trash2 />
                          </Button>
                        )}
                        <TextFieldComponent
                          id={`ability-${index}-name`}
                          required
                          disabled={loading}
                          label={t("form.name")}
                          value={a.name}
                          handleChange={(name) =>
                            setData((state) => ({
                              ...state,
                              abilities: state.abilities?.map((a, ai) =>
                                ai === index
                                  ? {
                                      ...a,
                                      name: name,
                                    }
                                  : a,
                              ),
                            }))
                          }
                          errors={errors?.abilities}
                        />
                        <TextAreaFieldComponent
                          required
                          id={`ability-${index}-description`}
                          rows={6}
                          value={a.description}
                          label={t("form.description")}
                          handleChange={(description) =>
                            setData((state) => ({
                              ...state,
                              abilities: state.abilities?.map((a, ai) =>
                                ai === index
                                  ? {
                                      ...a,
                                      description,
                                    }
                                  : a,
                              ),
                            }))
                          }
                          errors={errors?.abilities}
                        />
                      </Item>
                    ))}
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() =>
                        setData((state) => ({
                          ...state,
                          abilities: (state.abilities ?? []).concat(
                            emptyAbility,
                          ),
                        }))
                      }
                    >
                      {t("buttons.addDice", { ns: "global" })}
                    </Button>
                  </section>
                )}
                {hasDamage && data.damages && data.damages.length && (
                  <section className="flex flex-col gap-4">
                    <p className="leading-none font-semibold">
                      {t("form.itemDamages")}
                    </p>
                    {data.damages.map((d, index) => (
                      <Item variant="outline" key={index} className="relative">
                        {data.damages && data.damages.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="text-destructive absolute top-1 right-1"
                            onClick={() =>
                              setData((state) => ({
                                ...state,
                                damages: state.damages?.filter(
                                  (_, i) => i !== index,
                                ),
                              }))
                            }
                          >
                            <Trash2 />
                          </Button>
                        )}
                        <FieldGroup className="flex-row">
                          <SelectComponent
                            id={`dice_count_${index}`}
                            value={d.dice_count?.toString() ?? ""}
                            label={t("form.diceCount")}
                            handleChange={(dice_count) =>
                              setData((state) => ({
                                ...state,
                                damages: state.damages?.map((d, di) =>
                                  di === index
                                    ? {
                                        ...d,
                                        dice_count: +dice_count,
                                      }
                                    : d,
                                ),
                              }))
                            }
                            placeholder={t("form.diceCountPlaceholder")}
                            selectItems={diceCountValues.map((d) => ({
                              label: t("form.dice", { count: d }),
                              value: d.toString(),
                            }))}
                          />
                          <SelectComponent
                            id={`dice_size_${index}`}
                            value={d.dice_size?.toString() ?? ""}
                            label={t("form.rarity")}
                            handleChange={(dice_size) =>
                              setData((state) => ({
                                ...state,
                                damages: state.damages?.map((d, di) =>
                                  di === index
                                    ? {
                                        ...d,
                                        dice_size: +dice_size as DiceSize,
                                      }
                                    : d,
                                ),
                              }))
                            }
                            placeholder={t("form.diceSizePlaceholder")}
                            selectItems={diceSizeValues.map((d) => ({
                              label: t(`form.selectedDice`, { dice: d }),
                              value: d.toString(),
                            }))}
                          />
                        </FieldGroup>
                        <SelectComponent
                          id={`damage_type_${index}`}
                          value={d.damage_type}
                          label={t("form.damageType")}
                          handleChange={(damageType) =>
                            setData((state) => ({
                              ...state,
                              damages: state.damages?.map((d, di) =>
                                di === index
                                  ? {
                                      ...d,
                                      damage_type: damageType,
                                    }
                                  : d,
                              ),
                            }))
                          }
                          placeholder={t("form.damageTypePlaceholder")}
                          selectItems={damageTypeValues.map((d) => ({
                            label: t(`damageTypes.${d}`),
                            value: d,
                          }))}
                        />
                        {index === 0 && (
                          <>
                            <SelectComponent
                              id={`attribute_bonus_${index}`}
                              value={d.attribute_bonus}
                              label={t("form.attributeBonus")}
                              handleChange={(attributeBonus) =>
                                setData((state) => ({
                                  ...state,
                                  damages: state.damages?.map((d, di) =>
                                    di === index
                                      ? {
                                          ...d,
                                          attribute_bonus: attributeBonus,
                                        }
                                      : d,
                                  ),
                                }))
                              }
                              placeholder={t("form.attributeBonusPlaceholder")}
                              selectItems={attributeTypeValues.map((d) => ({
                                label: t(`attributeTypes.${d}`),
                                value: d,
                              }))}
                            />
                            <FieldGroup className="flex-row items-end">
                              <TextFieldComponent
                                type="number"
                                min={0}
                                id={`flat_bonus_${index}`}
                                value={d.flat_bonus}
                                label={t("form.flat_bonus")}
                                handleChange={(flat_bonus) =>
                                  setData((state) => ({
                                    ...state,
                                    damages: state.damages?.map((d, di) =>
                                      di === index
                                        ? {
                                            ...d,
                                            flat_bonus: +flat_bonus,
                                          }
                                        : d,
                                    ),
                                  }))
                                }
                              />
                              <CheckboxComponent
                                className="pb-2.5"
                                disabled={loading}
                                id={`prof_bonus_${index}`}
                                label={t("form.proficiencyBonus")}
                                checked={d.proficiency_bonus}
                                handleChange={(checked) =>
                                  setData((state) => ({
                                    ...state,
                                    damages: state.damages?.map((d, di) =>
                                      di === index
                                        ? {
                                            ...d,
                                            proficiency_bonus: !!checked,
                                          }
                                        : d,
                                    ),
                                  }))
                                }
                              />
                            </FieldGroup>
                          </>
                        )}
                      </Item>
                    ))}
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() =>
                        setData((state) => ({
                          ...state,
                          damages: (state.damages ?? []).concat(emptyDamage),
                        }))
                      }
                    >
                      {t("buttons.addDice", { ns: "global" })}
                    </Button>
                  </section>
                )}
                <hr />
                <Field>
                  <Button form="item-form" type="submit" disabled={loading}>
                    {t("buttons.createItem", { ns: "global" })}
                  </Button>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </section>
        <section className="hidden relative top-0 border-l border-l-border flex-1 w-full justify-center items-center p-4 min-h-screen bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] md:flex">
          <div className="fixed w-1/2 top-1/2 right-0.5 p-4 -translate-y-1/2">
            <ItemCardComponent item={data} />
          </div>
        </section>
      </form>
    </section>
  );
};

export default AddItemScreen;
