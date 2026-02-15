import { from, map, tap } from "rxjs";
import { getRegistry } from "@ngneat/elf";

import { BuildRequest, httpRequest } from "@/api/httpRequest";

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
    return from(httpRequest("POST_SIGNUP", "POST", data));
  };

  login = (data: LoginModel) => {
    return from(httpRequest<SessionUser>("POST_LOGIN", "POST", data)).pipe(
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
    const req = BuildRequest("POST_REFRESH_TOKEN", "POST");
    return await fetch(req);
  };

  logout = async () => {
    const response = await httpRequest("POST_LOGOUT", "POST");

    if (response.ok) {
      this.store.reset();
      getRegistry().forEach((store) => store.reset());
    }
  };

  getMe = () => {
    return from(httpRequest<SessionUser>("GET_ME", "GET")).pipe(
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
