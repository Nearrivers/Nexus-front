import { httpRequest } from "@/api/httpRequest";
import type { ImageResponseModel } from "@/store/images";
import type {
  ItemFormModel,
  ItemModel,
  ItemOwner,
} from "@/store/items/items.model";
import {
  type PlayerModel,
  type PlayerFormModel,
  type PlayerXpModel,
  type PlayerWithInventoryModel,
  type InventoryItem,
} from "@/store/players";

import { type LoginModel } from "@/store/session";

export const API_ROUTES = {
  /* -- SESSION -- */
  POST_LOGIN: (data: LoginModel) =>
    httpRequest<PlayerModel>("/auth/login", "POST", data),
  POST_LOGOUT: () => httpRequest("/auth/logout", "POST"),
  POST_REFRESH_TOKEN: () => httpRequest("/auth/refresh", "POST"),
  GET_ME: () => httpRequest<PlayerModel>("/auth/me", "GET"),
  /* ------------- */

  /* -- PLAYERS -- */
  POST_CREATE_PLAYER: (data: Partial<PlayerFormModel>) =>
    httpRequest<PlayerModel>("/players", "POST", data),
  GET_PLAYERS: () => httpRequest<PlayerModel[]>("/players", "GET"),
  GET_ONE_PLAYER: (id: string) =>
    httpRequest<PlayerWithInventoryModel>(`/players/one/${id}`, "GET"),
  PUT_UPDATE_PLAYERS_XP: (data: Partial<PlayerXpModel>) =>
    httpRequest("/players/xp", "PUT", data),
  /* ------------- */

  /* -- ITEM -- */
  POST_CREATE_ITEM: (data: Partial<ItemFormModel>) =>
    httpRequest<ItemModel>("/items", "POST", data),
  GET_ITEMS: () => httpRequest<ItemModel[]>("/items", "GET"),
  GET_ONE_ITEM: (id: string) => httpRequest<ItemModel>(`/items/${id}`, "GET"),
  POST_ADD_ITEM_TO_INVENTORIES: (data: { owners: ItemOwner[] }) =>
    httpRequest<ItemModel>("/inventories", "POST", data),
  PUT_UPDATE_INVENTORY_ITEM: (
    playerId: string,
    itemId: string,
    data: Partial<
      Pick<InventoryItem, "is_attuned" | "is_equipped" | "quantity">
    >,
  ) =>
    httpRequest<InventoryItem>(
      `/inventories/${playerId}/${itemId}`,
      "PUT",
      data,
    ),
  PUT_UPDATE_ITEM_ATTUNE_STATE: (
    playerId: string,
    itemId: string,
    data: { isAttuned: boolean },
  ) =>
    httpRequest<InventoryItem>(
      `/inventories/${playerId}/${itemId}/attuned`,
      "PUT",
      data,
    ),
  DELETE_ITEM: (id: string) => httpRequest(`/items/${id}`, "DELETE"),
  /* ---------- */

  /* -- IMAGES -- */
  POST_UPLOAD_IMAGE: (data: FormData) =>
    httpRequest<ImageResponseModel>("/upload/image", "POST", data),
  /* ------------ */
} as const;
