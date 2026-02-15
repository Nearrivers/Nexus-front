import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useObservable } from "@ngneat/react-rxjs";
import { Plus } from "lucide-react";

import { tagsQuery, tagsService, type TagModel } from "@/store/tags";

import { Button } from "@/components/ui/button";
import H1Typo from "@/components/ui/typographies/h1";
import { SidebarTrigger } from "@/components/ui/sidebar";

import DeleteTagDialog from "@/screens/auth/tags/components/DeleteTag.dialog";
import TagBadgeComponent from "@/screens/auth/tags/components/TagBadge.component";
import CreateOrUpdateTagDialog from "@/screens/auth/tags/components/CreateOrUpdateTag.dialog";

const TagsScreen = () => {
  const { t } = useTranslation("tags");

  const [tags] = useObservable(tagsQuery.tags$);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [tag, setTag] = useState<TagModel | null>(null);

  useEffect(() => {
    tagsService.getAllTags().subscribe();
  }, []);

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <hgroup>
          <div className="flex gap-2 items-center">
            <SidebarTrigger />
            <H1Typo>{t("title")}</H1Typo>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">{t("lead")}</p>
        </hgroup>
        <Button
          className="self-end"
          onClick={() => {
            setTag({
              id: "",
              color: "",
              name: "",
            });
            setOpen(true);
          }}
        >
          <Plus />
          {t("addTag")}
        </Button>
      </div>
      <main className="mt-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagBadgeComponent
              key={tag.id}
              tag={tag}
              onUpdateClick={() => {
                setTag(tag);
                setOpen(true);
              }}
              onDeleteClick={() => {
                setTag(tag);
                setOpenDelete(true);
              }}
            />
          ))}
        </div>
      </main>
      {tag && (
        <CreateOrUpdateTagDialog
          tag={tag}
          open={open}
          handleClose={() => {
            setOpen(false);
            setTag(null);
          }}
        />
      )}
      {tag && (
        <DeleteTagDialog
          tag={tag}
          open={openDelete}
          handleClose={() => {
            setOpenDelete(false);
            setTag(null);
          }}
        />
      )}
    </div>
  );
};

export default TagsScreen;
