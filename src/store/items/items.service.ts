import { from, map, tap } from "rxjs";
import {
  addEntities,
  deleteEntities,
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
      tap((item) => this.store.update(addEntities(item))),
    );
  };

  getItems = () => {
    return from(API_ROUTES.GET_ITEMS()).pipe(
      map((response) => {
        return response.data;
      }),
      tap((items) => this.store.update(setEntities(items))),
    );
  };

  addItemToInventories = (itemWithOwners: ItemOwner[]) => {
    return from(
      API_ROUTES.POST_ADD_ITEM_TO_INVENTORIES({ owners: itemWithOwners }),
    ).pipe(
      map((response) => {
        return response.data;
      }),
      tap((item) => this.store.update(upsertEntities(item))),
    );
  };

  deleteItem = (itemId: string) => {
    return from(API_ROUTES.DELETE_ITEM(itemId)).pipe(
      tap(() => this.store.update(deleteEntities(itemId))),
    );
  };
}

export const itemService = new ItemService();
