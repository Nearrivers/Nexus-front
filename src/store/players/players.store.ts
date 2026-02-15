import { createStore } from "@ngneat/elf";
import { withEntities } from "@ngneat/elf-entities";

import type { PlayerModel } from "@/store/players";

export const playerStore = createStore(
  { name: "players" },
  withEntities<PlayerModel>(),
);
