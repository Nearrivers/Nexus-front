import { createStore } from "@ngneat/elf";
import { withEntities } from "@ngneat/elf-entities";

import type { TagModel } from "@/store/tags";

export const tagsStore = createStore(
  { name: "tags" },
  withEntities<TagModel>(),
);
