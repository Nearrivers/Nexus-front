import { httpRequest } from "@/api/httpRequest";

import {
  type SessionUser,
  type LoginModel,
  type SignUpModel,
} from "@/store/session";
import type { TagFormModel, TagModel } from "@/store/tags";

export type ApiRoutes =
  | "/auth/register"
  | "/auth/login"
  | "/auth/logout"
  | "/auth/refresh"
  | "/auth/me"
  | "/tags"
  | `/tags/${string}`
  | `/tags?${string}`
  | `tags/notes`;

export const API_ROUTES = {
  /* -- SESSION -- */
  POST_SIGNUP: (data: SignUpModel) =>
    httpRequest("/auth/register", "POST", data),
  POST_LOGIN: (data: LoginModel) =>
    httpRequest<SessionUser>("/auth/login", "POST", data),
  POST_LOGOUT: () => httpRequest("/auth/logout", "POST"),
  POST_REFRESH_TOKEN: () => httpRequest("/auth/refresh", "POST"),
  GET_ME: () => httpRequest<SessionUser>("/auth/me", "GET"),
  /* ------------- */

  /* -- TAGS -- */
  GET_TAGS: () => httpRequest<TagModel[]>("/tags", "GET"),
  GET_NOTES_BY_TAG: (params?: URLSearchParams) =>
    params
      ? httpRequest<TagModel[]>(`/tags/notes?${params.toString()}`, "GET")
      : httpRequest<TagModel[]>(`/tags/notes`, "GET"),
  POST_CREATE_TAG: (data: TagFormModel) =>
    httpRequest<TagModel>("/tags", "POST", data),
  PUT_UPDATE_TAG: (id: string, data: TagFormModel) =>
    httpRequest<TagModel>(`/tags/${id}`, "PUT", data),
  DELETE_REMOVE_TAG: (id: string) =>
    httpRequest<undefined>(`/tags/${id}`, "DELETE"),
  /* ---------- */
} as const;

export type ApiRoutesMethods = keyof typeof API_ROUTES;
