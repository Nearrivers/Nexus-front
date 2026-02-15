import { tagsStore } from "@/store/tags";
import { selectAllEntities } from "@ngneat/elf-entities";

class TagsQuery {
  store = tagsStore;

  tags$ = this.store.pipe(selectAllEntities());
}

export const tagsQuery = new TagsQuery();
