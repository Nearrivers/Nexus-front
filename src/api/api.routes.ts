import { httpRequest } from "@/api/httpRequest";
import { type PlayerModel, type PlayerFormModel } from "@/store/players";

import { type LoginModel } from "@/store/session";

export type ApiRoutes =
  | "/auth/login"
  | "/auth/logout"
  | "/auth/refresh"
  | "/auth/me"
  | "/players"
  | `/players/${string}`;

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
} as const;

export type ApiRoutesMethods = keyof typeof API_ROUTES;
