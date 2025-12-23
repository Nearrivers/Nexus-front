import { select } from "@ngneat/elf";

import { sessionStore } from "@/store/session";

class SessionQuery {
  store = sessionStore;

  user$ = this.store.pipe(select((state) => state.user));
}

export const sessionQuery = new SessionQuery();
