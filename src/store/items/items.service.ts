import { from, map } from "rxjs";

import { API_ROUTES } from "@/api/api.routes";

import type { ItemFormModel } from "@/store/items";

class ItemService {
  createItem = (data: ItemFormModel) => {
    return from(API_ROUTES.POST_CREATE_ITEM(data)).pipe(
      map((response) => {
        return response.data;
      }),
    );
  };

  getItems = () => {
    return from(API_ROUTES.GET_ITEMS()).pipe(
      map((response) => {
        return response.data;
      }),
    );
  };
}

export const itemService = new ItemService();
