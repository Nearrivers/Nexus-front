import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useObservable } from "@ngneat/react-rxjs";

import { itemsQuery, type ItemOwner } from "@/store/items";
import { playerService, playersQuery } from "@/store/players";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Item, ItemTitle } from "@/components/ui/item";
import TextFieldComponent from "@/components/inputs/TextField.component";

type OwnersModalProps = {
  itemId: string;
  open: boolean;
  handleClose: (itemOwners?: ItemOwner[]) => void;
};

// TODO: Incohérence entre le modal et le fonctionnement du back. Le modal pense donner
// le chiffre exact des quantités alors que le back incrémente. Afficher la quantité
// possédée par chaque joueur, reset le compte à 0 quand on ouvre le modal
// et le préciser dans le t('owners.lead')
const OwnersModal = ({ itemId, open, handleClose }: OwnersModalProps) => {
  const { t } = useTranslation("home");

  const [players] = useObservable(playersQuery.players$);
  const [item] = useObservable(itemsQuery.activeItem$(itemId));

  const [itemsWithQuantities, setItemsWithQuantities] = useState<ItemOwner[]>(
    players.map((p) => ({
      item_id: itemId,
      player_id: p.id,
      player_name: p.name,
      quantity: item?.owners?.find((o) => o.player_id === p.id)?.quantity ?? 0,
    })),
  );

  useEffect(() => {
    if (!players.length) {
      playerService.getPlayers().subscribe();
    }
  }, []);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    handleClose(itemsWithQuantities);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (isOpen) return;
        handleClose();
      }}
    >
      <DialogContent>
        <form noValidate onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t("owners.title")}</DialogTitle>
            <DialogDescription>{t("owners.lead")}</DialogDescription>
          </DialogHeader>
          <p className="pt-4 pb-2">
            {t("owners.ownersOf", { name: item?.name })}
          </p>
          <section className="flex flex-col gap-2">
            {itemsWithQuantities.map((itemWithOwners, index) => (
              <Item variant="outline" key={itemWithOwners.player_id}>
                <ItemTitle>{itemWithOwners.player_name}</ItemTitle>
                <TextFieldComponent
                  min={0}
                  step={1}
                  label=""
                  type="number"
                  value={itemWithOwners.quantity}
                  id={`${itemWithOwners.player_id}-quantity`}
                  handleChange={(value) =>
                    setItemsWithQuantities((state) =>
                      state.map((si, sIndex) =>
                        sIndex === index ? { ...si, quantity: +value } : si,
                      ),
                    )
                  }
                />
              </Item>
            ))}
          </section>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                {t("buttons.close", { ns: "global" })}
              </Button>
            </DialogClose>
            <Button variant="default" type="submit">
              {t("buttons.save", { ns: "global" })}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OwnersModal;
