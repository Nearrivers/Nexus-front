import { createStore } from "@ngneat/elf";
import { withActiveId, withEntities } from "@ngneat/elf-entities";

import type { PlayerWithInventoryModel } from "@/store/players";

export const playerStore = createStore(
  { name: "players" },
  withEntities<PlayerWithInventoryModel>(),
  withActiveId(),
);
