import { useCallback, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

import useForm from "@/hooks/useForm.hook";

import { TagSchema, tagsService, type TagModel } from "@/store/tags";

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

type CreateOrUpdateTagDialogProps = {
  open: boolean;
  tag: TagModel;
  handleClose: () => void;
};

const CreateOrUpdateTagDialog = (props: CreateOrUpdateTagDialogProps) => {
  const { open, tag, handleClose } = props;

  const { t } = useTranslation("tags");

  const isUpdateFlow = tag.name.length > 0;

  const { data, errors, setData, displayErrors } = useForm(TagSchema, tag);

  const handleSubmit = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();

      const err = displayErrors();
      if (err) {
        return;
      }

      const observable = isUpdateFlow
        ? tagsService.updateTag(tag.id, data)
        : tagsService.createTag(data);

      observable.subscribe();
      handleClose();
    },
    [data, tag, handleClose],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) return;
        handleClose();
      }}
    >
      <form id="tag-form" onSubmit={handleSubmit} noValidate>
        <DialogContent className="sm:max-w-106">
          {isUpdateFlow ? (
            <DialogHeader>
              <DialogTitle>{t("dialog.updateTitle")}</DialogTitle>
              <DialogDescription>{t("dialog.updateLead")}</DialogDescription>
            </DialogHeader>
          ) : (
            <DialogHeader>
              <DialogTitle>{t("dialog.createTitle")}</DialogTitle>
              <DialogDescription>{t("dialog.createLead")}</DialogDescription>
            </DialogHeader>
          )}
          <div className="grid gap-4">
            <div className="grid gap-3">
              <TextFieldComponent
                id="name"
                value={data.name}
                errors={errors?.name}
                label={t("dialog.name")}
                placeholder={t("dialog.name")}
                handleChange={(value) =>
                  setData((state) => ({
                    ...state,
                    name: value,
                  }))
                }
              />
            </div>
            <div className="grid gap-3">
              <TextFieldComponent
                id="color"
                type="color"
                value={data.color}
                errors={errors?.color}
                label={t("dialog.color")}
                placeholder={t("dialog.color")}
                handleChange={(value) =>
                  setData((state) => ({
                    ...state,
                    color: value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                {t("buttons.cancel", { ns: "global" })}
              </Button>
            </DialogClose>
            <Button type="submit" form="tag-form">
              {t("buttons.save", { ns: "global" })}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateOrUpdateTagDialog;
