import { from, map, tap } from "rxjs";
import { getRegistry } from "@ngneat/elf";

import { httpRequest } from "@/api/httpRequest";

import {
  sessionStore,
  type LoginModel,
  type SessionUser,
  type SignUpModel,
} from "@/store/session";

class SessionService {
  store = sessionStore;

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
    return await httpRequest("POST_REFRESH_TOKEN", "POST");
  };

  logout = async () => {
    const response = await httpRequest("POST_LOGOUT", "POST");

    if (response.ok) {
      this.store.reset();
      getRegistry().forEach((store) => store.reset());
    }
  };

  getMe = () => {
    return from(httpRequest("GET_ME", "GET")).pipe(
      map((response) => {
        if (!response.ok) {
          return;
        }

        return response.data;
      }),
    );
  };
}

export const sessionService = new SessionService();
