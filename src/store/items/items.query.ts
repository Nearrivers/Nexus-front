import { selectEntity } from "@ngneat/elf-entities";

import { itemsStore } from "@/store/items";

class ItemsQuery {
  store = itemsStore;

  activeItem$ = (id: string) => this.store.pipe(selectEntity(id));
}

export const itemsQuery = new ItemsQuery();
