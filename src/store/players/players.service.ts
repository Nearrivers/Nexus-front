import { from, map, tap } from "rxjs";
import {
  setActiveId,
  setEntities,
  updateEntities,
  upsertEntities,
} from "@ngneat/elf-entities";

import { API_ROUTES } from "@/api/api.routes";

import {
  playerStore,
  type PlayerFormModel,
  type UpdateInventoryItem,
} from "@/store/players";

class PlayerService {
  store = playerStore;

  setActivePlayer = (playerId: string) =>
    this.store.update(setActiveId(playerId));

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
      tap((player) => {
        console.log(player);
        this.store.update(upsertEntities(player), setActiveId(player.id));
      }),
    );
  };

  updatePlayersXp = (ids: string[], xp: number) => {
    return from(API_ROUTES.PUT_UPDATE_PLAYERS_XP({ xp, ids }));
  };

  updateInventoryItem = (
    playerId: string,
    itemId: string,
    data: UpdateInventoryItem,
  ) => {
    return from(
      API_ROUTES.PUT_UPDATE_INVENTORY_ITEM(playerId, itemId, data),
    ).pipe(
      map((response) => {
        return response.data;
      }),
      tap((item: UpdateInventoryItem) =>
        this.store.update(
          updateEntities(playerId, (entity) => ({
            ...entity,
            items: entity.items?.map((i) =>
              i.id === itemId
                ? {
                    ...i,
                    is_equipped: item.is_equipped ?? false,
                    is_attuned: item.is_attuned ?? false,
                    quantity: item.quantity ?? 0,
                  }
                : i,
            ),
          })),
        ),
      ),
    );
  };
}

export const playerService = new PlayerService();
