import { httpRequest } from "@/api/httpRequest";
import type { ImageResponseModel } from "@/store/images";
import type { ItemFormModel, ItemModel } from "@/store/items/items.model";
import { type PlayerModel, type PlayerFormModel } from "@/store/players";

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
    httpRequest<PlayerModel[]>(`/players/${id}`, "GET"),
  /* ------------- */

  /* -- PLAYERS -- */
  POST_CREATE_ITEM: (data: Partial<ItemFormModel>) =>
    httpRequest<ItemModel>("/items", "POST", data),
  GET_ITEMS: () => httpRequest<ItemModel[]>("/items", "GET"),
  GET_ONE_ITEM: (id: string) =>
    httpRequest<PlayerModel[]>(`/items/${id}`, "GET"),
  /* ------------- */

  /* -- IMAGES -- */
  POST_UPLOAD_IMAGE: (data: FormData) =>
    httpRequest<ImageResponseModel>("/upload/image", "POST", data),
  /* ------------ */
} as const;
