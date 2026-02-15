import { API_ROUTES } from "@/api/api.routes";
import { playerStore, type PlayerFormModel } from "@/store/players";
import { from, map } from "rxjs";

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
    );
  };

  getOnePlayer = (id: string) => {
    return from(API_ROUTES.GET_ONE_PLAYER(id)).pipe(
      map((response) => {
        return response.data;
      }),
    );
  };
}

export const playerService = new PlayerService();
