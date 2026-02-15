import { catchError, from, map, tap } from "rxjs";
import { getRegistry } from "@ngneat/elf";

import { API_ROUTES } from "@/api/api.routes";
import { BuildRequest, FetchError } from "@/api/httpRequest";

import { sessionStore, type LoginModel } from "@/store/session";
import type { PlayerModel } from "../players";

class SessionService {
  store = sessionStore;

  setUser = (player: PlayerModel) => this.store.update(() => ({ player }));

  login = (data: LoginModel) => {
    return from(API_ROUTES.POST_LOGIN(data)).pipe(
      tap((response) => {
        this.store.update(() => ({
          player: response.data,
        }));
      }),
    );
  };

  refreshToken = async () => {
    const req = BuildRequest("/auth/refresh", "POST");
    return await fetch(req);
  };

  logout = async () => {
    try {
      await API_ROUTES.POST_LOGOUT();
      this.store.reset();
      getRegistry().forEach((store) => store.reset());
    } catch (error) {}
  };

  getMe = () => {
    return from(API_ROUTES.GET_ME()).pipe(
      catchError((err: Error | FetchError) => {
        throw err;
      }),
      map((response) => {
        return response.data;
      }),
      tap((player) => {
        this.setUser(player);
      }),
    );
  };
}

export const sessionService = new SessionService();
