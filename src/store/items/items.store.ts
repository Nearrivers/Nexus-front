import { createStore } from "@ngneat/elf";
import { withActiveId, withEntities } from "@ngneat/elf-entities";

import { type ItemModel } from "@/store/items";

export const itemsStore = createStore(
  { name: "items" },
  withEntities<ItemModel>(),
  withActiveId(),
);
