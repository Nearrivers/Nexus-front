import { selectActiveEntity, selectAllEntities } from "@ngneat/elf-entities";

import { playerStore } from "@/store/players";

class PlayersQuery {
  store = playerStore;

  activePlayer$ = this.store.pipe(selectActiveEntity());

  players$ = this.store.pipe(selectAllEntities());
}

export const playersQuery = new PlayersQuery();
