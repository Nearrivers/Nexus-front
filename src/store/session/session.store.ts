import { createStore, withProps } from "@ngneat/elf";

import type { SessionModel } from "@/store/session";

export const sessionStore = createStore(
  {
    name: "session",
  },
  withProps<SessionModel>({
    player: null,
  }),
);
