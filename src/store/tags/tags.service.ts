import { from, map, tap } from "rxjs";
import {
  addEntities,
  deleteEntities,
  setEntities,
  upsertEntities,
} from "@ngneat/elf-entities";

import { API_ROUTES } from "@/api/api.routes";

import { tagsStore, type TagFormModel, type TagModel } from "@/store/tags";

class TagsService {
  store = tagsStore;

  getAllTags = () => {
    return from(API_ROUTES["GET_TAGS"]()).pipe(
      map((response) => {
        if (!response.ok) {
          return [];
        }

        return response.data;
      }),
      tap((tags) => this.store.update(setEntities(tags))),
    );
  };

  createTag = (data: TagFormModel) => {
    return from(API_ROUTES["POST_CREATE_TAG"](data)).pipe(
      map((response) => {
        if (!response.ok) {
          return {} as TagModel;
        }

        return response.data;
      }),
      tap((tag) => this.store.update(addEntities(tag))),
    );
  };

  updateTag = (id: string, data: TagFormModel) => {
    return from(API_ROUTES["PUT_UPDATE_TAG"](id, data)).pipe(
      map((response) => {
        if (!response.ok) {
          return {} as TagModel;
        }

        return response.data;
      }),
      tap((tag) => this.store.update(upsertEntities(tag))),
    );
  };

  deleteTag = (id: string) => {
    return from(API_ROUTES["DELETE_REMOVE_TAG"](id)).pipe(
      tap(() => this.store.update(deleteEntities(id))),
    );
  };
}

export const tagsService = new TagsService();
