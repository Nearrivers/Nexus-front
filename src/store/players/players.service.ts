import { from, map, tap } from "rxjs";
import { setEntities } from "@ngneat/elf-entities";

import { API_ROUTES } from "@/api/api.routes";
import { playerStore, type PlayerFormModel } from "@/store/players";

class PlayerService {
  store = playerStore;

  createPlayer = (data: Partial<PlayerFormModel>) => {
    return from(API_ROUTES.POST_CREATE_PLAYER(data)).pipe(
      map((response) => {
        return response.data;
      }),
    );
  };

  getPlayers = () => {
    return from(API_ROUTES.GET_PLAYERS()).pipe(
      map((response) => {
        return response.data;
      }),
      tap((players) => this.store.update(setEntities(players))),
    );
  };

  getOnePlayer = (id: string) => {
    return from(API_ROUTES.GET_ONE_PLAYER(id)).pipe(
      map((response) => {
        return response.data;
      }),
    );
  };

  updatePlayersXp = (ids: string[], xp: number) => {
    return from(API_ROUTES.PUT_UPDATE_PLAYERS_XP({ xp, ids }));
  };
}

export const playerService = new PlayerService();
