import { select } from "@ngneat/elf";

import { sessionStore } from "@/store/session";

class SessionQuery {
  store = sessionStore;

  player$ = this.store.pipe(select((state) => state.player));

  get player() {
    return this.store.getValue().player;
  }
}

export const sessionQuery = new SessionQuery();
