import { useParams } from "react-router";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DragDropProvider } from "@dnd-kit/react";
import { useObservable } from "@ngneat/react-rxjs";

import {
  playerService,
  playersQuery,
  type UpdateInventoryItem,
} from "@/store/players";

import { Item } from "@/components/ui/item";
import H1Typo from "@/components/ui/typographies/h1";
import H2Typo from "@/components/ui/typographies/h2";
import Draggable from "@/components/Draggable";
import Droppable from "@/components/Droppable";
import ItemBoxComponent from "@/components/items/ItemBox.component";

const EQUIPPED_ITEMS_DROP_ZONE_ID = "equippedItems";
const ATTUNED_ITEMS_DROP_ZONE_ID = "attunedItems";
const OTHER_ITEMS_DROP_ZONE_ID = "otherItems";

const PlayerInventoryScreen = () => {
  const { id } = useParams();

  const { t } = useTranslation("items");

  const [dragSource, setDragSource] = useState<string | null>(null);

  const [player] = useObservable(playersQuery.activePlayer$);

  const equippedItems = player?.items?.filter((i) => i.is_equipped) ?? [];
  const attunedItems = player?.items?.filter((i) => i.is_attuned) ?? [];
  const othersItems =
    player?.items?.filter((i) => !i.is_attuned && !i.is_equipped) ?? [];

  useEffect(() => {
    if (!id) {
      return;
    }

    playerService.getOnePlayer(id).subscribe();
  }, [id]);

  const updateInventoryItem = (itemId: string, data: UpdateInventoryItem) => {
    if (!player) {
      return;
    }

    playerService.updateInventoryItem(player.id, itemId, data).subscribe();
  };

  if (!player) {
    return <p>{t("inventory.playerNotFound")}</p>;
  }

  return (
    <DragDropProvider
      onDragStart={(evt) => {
        const { target, canceled } = evt.operation;
        if (canceled || !target) {
          return;
        }

        setDragSource(target.id as string);
      }}
      onDragEnd={(evt) => {
        const { target, source, canceled } = evt.operation;
        if (canceled || !target || !source) {
          return;
        }

        const itemId = source.id as string;
        const dropId = target.id as string;

        if (dragSource === dropId) {
          return;
        }

        const update: UpdateInventoryItem = {};

        switch (dropId) {
          case EQUIPPED_ITEMS_DROP_ZONE_ID:
            update.is_equipped = true;
            update.is_attuned = false;
            break;
          case ATTUNED_ITEMS_DROP_ZONE_ID:
            update.is_attuned = true;
            update.is_equipped = false;
            break;
          case OTHER_ITEMS_DROP_ZONE_ID:
            update.is_equipped = false;
            update.is_attuned = false;
            break;
        }

        updateInventoryItem(itemId, update);
      }}
    >
      <main className="flex flex-col items-center gap-4 text-muted-foreground lg:px-28">
        <header className="w-full">
          <H1Typo className="pb-2">
            {t("inventory.title", { name: player.name })}
          </H1Typo>
          <hr />
        </header>
        <section className="py-2 w-full text-muted-foreground">
          <H2Typo>{t("inventory.equippedItems")}</H2Typo>
          <Droppable
            id={EQUIPPED_ITEMS_DROP_ZONE_ID}
            className="flex flex-wrap gap-2 pt-2"
          >
            {equippedItems.map((i) => (
              <Draggable key={i.id} id={i.id}>
                <ItemBoxComponent item={i} />
              </Draggable>
            ))}
            <Item
              variant="outline"
              className="w-24 h-24 flex justify-center items-center"
            >
              <CirclePlus />
            </Item>
          </Droppable>
        </section>
        <section className="py-2 w-full text-muted-foreground">
          <H2Typo>{t("inventory.attunedItems")}</H2Typo>
          <Droppable
            id={ATTUNED_ITEMS_DROP_ZONE_ID}
            disabled={attunedItems.length === 3}
            className="flex flex-wrap gap-2 pt-2"
          >
            {attunedItems.map((i) => (
              <Draggable key={i.id} id={i.id}>
                <ItemBoxComponent key={i.id} item={i} />
              </Draggable>
            ))}
            {attunedItems.length === 3 ? (
              <Item>{t("inventory.max3")}</Item>
            ) : (
              <Item
                variant="outline"
                className="w-24 h-24 flex justify-center items-center"
              >
                <CirclePlus />
              </Item>
            )}
          </Droppable>
        </section>
        <section className="py-2 w-full text-muted-foreground">
          <H2Typo>{t("inventory.attunedItems")}</H2Typo>
          <Droppable
            id={OTHER_ITEMS_DROP_ZONE_ID}
            className="flex flex-wrap gap-2 pt-2"
          >
            {othersItems.map((i) => (
              <Draggable key={i.id} id={i.id}>
                <ItemBoxComponent item={i} />
              </Draggable>
            ))}
            <Item
              variant="outline"
              className="w-24 h-24 flex justify-center items-center"
            >
              <CirclePlus />
            </Item>
          </Droppable>
        </section>
      </main>
    </DragDropProvider>
  );
};

export default PlayerInventoryScreen;
