import { from, map, tap } from "rxjs";
import {
  addEntities,
  resetActiveId,
  setActiveId,
  setEntities,
  upsertEntities,
} from "@ngneat/elf-entities";

import { API_ROUTES } from "@/api/api.routes";

import { itemsStore, type ItemFormModel, type ItemOwner } from "@/store/items";

class ItemService {
  store = itemsStore;

  setActiveItem = (id: string) => this.store.update(setActiveId(id));

  resetActiveItem = () => this.store.update(resetActiveId());

  createItem = (data: ItemFormModel) => {
    return from(API_ROUTES.POST_CREATE_ITEM(data)).pipe(
      map((response) => {
        return response.data;
      }),
      tap((item) => itemsStore.update(addEntities(item))),
    );
  };

  getItems = () => {
    return from(API_ROUTES.GET_ITEMS()).pipe(
      map((response) => {
        return response.data;
      }),
      tap((items) => itemsStore.update(setEntities(items))),
    );
  };

  addItemToInventories = (itemWithOwners: ItemOwner[]) => {
    return from(
      API_ROUTES.POST_ADD_ITEM_TO_INVENTORIES({ owners: itemWithOwners }),
    ).pipe(
      map((response) => {
        return response.data;
      }),
      tap((item) => itemsStore.update(upsertEntities(item))),
    );
  };
}

export const itemService = new ItemService();
