import { toast } from "sonner";
import { catchError, from, map, tap } from "rxjs";
import { getRegistry } from "@ngneat/elf";

import i18n from "@/lib/i18n";

import { API_ROUTES } from "@/api/api.routes";
import { BuildRequest, FetchError } from "@/api/httpRequest";

import type { PlayerModel } from "@/store/players";
import { sessionStore, type LoginModel } from "@/store/session";

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
    await API_ROUTES.POST_LOGOUT();
    this.store.reset();
    getRegistry().forEach((store) => store.reset());
    toast.error(i18n.t("loggedOut", { ns: "login" }));
  };

  getMe = () => {
    return from(API_ROUTES.GET_ME()).pipe(
      catchError((err: Error | FetchError) => {
        throw err;
      }),
      map((response) => {
        console.log(response);
        return response.data;
      }),
      tap((player) => {
        this.setUser(player);
      }),
    );
  };
}

export const sessionService = new SessionService();
