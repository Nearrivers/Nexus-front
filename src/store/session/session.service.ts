import { from, tap } from "rxjs";
import { getRegistry } from "@ngneat/elf";

import { API_ROUTES } from "@/api/api.routes";
import { BuildRequest } from "@/api/httpRequest";

import {
  sessionStore,
  type LoginModel,
  type SessionUser,
  type SignUpModel,
} from "@/store/session";

class SessionService {
  store = sessionStore;

  setUser = (user: SessionUser) => this.store.update(() => ({ user }));

  register = (data: SignUpModel) => {
    return from(API_ROUTES["POST_SIGNUP"](data));
  };

  login = (data: LoginModel) => {
    return from(API_ROUTES["POST_LOGIN"](data)).pipe(
      tap((response) => {
        if (!response.ok) {
          return;
        }

        this.store.update(() => ({
          user: response.data,
        }));
      }),
    );
  };

  refreshToken = async () => {
    const req = BuildRequest("/auth/refresh", "POST");
    return await fetch(req);
  };

  logout = async () => {
    const response = await API_ROUTES["POST_LOGOUT"]();

    if (response.ok) {
      this.store.reset();
      getRegistry().forEach((store) => store.reset());
    }
  };

  getMe = () => {
    return from(API_ROUTES["GET_ME"]()).pipe(
      tap((response) => {
        if (!response.ok) {
          return;
        }

        this.setUser(response.data);
      }),
    );
  };
}

export const sessionService = new SessionService();
