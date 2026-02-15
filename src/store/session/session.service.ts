import { from, map } from "rxjs";

import { httpRequest } from "@/api/httpRequest";

import { sessionStore, type SignUpModel } from "@/store/session";

class SessionService {
  store = sessionStore;

  login = () => {};

  register = (data: SignUpModel) => {
    return from(httpRequest("POST_SIGNUP", "POST", data)).pipe(
      map((response) => {
        console.log(response);
      }),
    );
  };
}

export const sessionService = new SessionService();
