import { selectAllEntities } from "@ngneat/elf-entities";

import { playerStore } from "@/store/players";

class PlayersQuery {
  store = playerStore;

  players$ = this.store.pipe(selectAllEntities());
}

export const playersQuery = new PlayersQuery();
