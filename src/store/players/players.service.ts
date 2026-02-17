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
import type { WebSocketMessage } from "@/contexts/wsProvider";

class PlayerService {
  store = playerStore;

  setActivePlayer = (playerId: string) =>
    this.store.update(setActiveId(playerId));

  updatePlayerInventory = ({
    player_id,
    data,
  }: WebSocketMessage<"inventory:update">) => {
    return this.store.update(
      updateEntities(player_id ?? "", (entity) => ({
        ...entity,
        items: entity.items?.map((i) =>
          i.id === data.item_id
            ? {
                ...i,
                is_equipped: data.is_equipped ?? false,
                is_attuned: data.is_attuned ?? false,
                quantity: data.quantity ?? 0,
              }
            : i,
        ),
      })),
    );
  };

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
    return from(API_ROUTES.PUT_UPDATE_INVENTORY_ITEM(playerId, itemId, data));
  };
}

export const playerService = new PlayerService();
