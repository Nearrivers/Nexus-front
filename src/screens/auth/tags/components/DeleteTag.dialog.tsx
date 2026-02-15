import { useTranslation } from "react-i18next";
import { useCallback, type FormEvent } from "react";

import { tagsService, type TagModel } from "@/store/tags";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TextFieldComponent from "@/components/inputs/TextField.component";

type DeleteTagDialogProps = {
  open: boolean;
  tag: TagModel;
  handleClose: () => void;
};

const DeleteTagDialog = (props: DeleteTagDialogProps) => {
  const { open, tag, handleClose } = props;

  const { t } = useTranslation("tags");

  const handleSubmit = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();

      console.log("hein ? ");
      tagsService.deleteTag(tag.id).subscribe();
      handleClose();
    },
    [tag, handleClose],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) return;
        handleClose();
      }}
    >
      <form id="tag-form-delete" onSubmit={handleSubmit} noValidate>
        <DialogContent className="sm:max-w-106">
          <DialogHeader>
            <DialogTitle>{t("dialog.deleteTitle")}</DialogTitle>
            <DialogDescription>{t("dialog.deleteLead")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <TextFieldComponent
                id="name"
                disabled
                value={tag.name}
                label={t("dialog.name")}
                placeholder={t("dialog.name")}
                handleChange={() => {}}
              />
            </div>
            <div className="grid gap-3">
              <TextFieldComponent
                disabled
                autoFocus={false}
                id="color"
                type="color"
                value={tag.color}
                label={t("dialog.color")}
                placeholder={t("dialog.color")}
                handleChange={() => {}}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                {t("buttons.cancel", { ns: "global" })}
              </Button>
            </DialogClose>
            <Button type="submit" form="tag-form-delete" variant="destructive">
              {t("buttons.delete", { ns: "global" })}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DeleteTagDialog;
