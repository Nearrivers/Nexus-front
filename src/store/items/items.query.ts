import { selectAllEntities, selectEntity } from "@ngneat/elf-entities";

import { itemsStore } from "@/store/items";

class ItemsQuery {
  store = itemsStore;

  items$ = this.store.pipe(selectAllEntities());

  activeItem$ = (id: string) => this.store.pipe(selectEntity(id));
}

export const itemsQuery = new ItemsQuery();
