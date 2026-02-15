import { useState, type FormEvent } from "react";
import { Calculator } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useObservable } from "@ngneat/react-rxjs";

import { playerService, playersQuery } from "@/store/players";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import TextFieldComponent from "@/components/inputs/TextField.component";
import BoxedCheckboxComponent from "@/components/inputs/BoxedCheckbox.component";

type AddXpModalProps = {};

const AddXpModal = ({}: AddXpModalProps) => {
  const { t } = useTranslation("home");

  const [open, setOpen] = useState(false);
  const [xpTotal, setXpTotal] = useState(0);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const [players] = useObservable(playersQuery.players$);

  const splittedXp = xpTotal / selectedPlayers.length;

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    playerService
      .updatePlayersXp(selectedPlayers, +splittedXp.toFixed(0))
      .subscribe({
        next: () => setOpen(false),
      });
  };

  return (
    <Dialog open={open}>
      <Button size="sm" onClick={() => setOpen(true)}>
        <Calculator />
        <p className="text-xs">{t("admin.xp")}</p>
      </Button>
      <DialogContent>
        <DialogTitle>{t("xpModal.title")}</DialogTitle>
        <DialogDescription>{t("xpModal.lead")}</DialogDescription>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          id="xp-form"
        >
          <TextFieldComponent
            type="number"
            id="xp-amount"
            value={xpTotal}
            label={t("xpModal.xpAmount")}
            handleChange={(xp) => setXpTotal(+xp)}
          />
          {players.map((p) => (
            <BoxedCheckboxComponent
              id={`xp-${p.id}`}
              label={p.name}
              checked={selectedPlayers.includes(p.id)}
              onCheckedChange={(checked) => {
                if (checked === "indeterminate") {
                  return;
                }

                if (!checked) {
                  setSelectedPlayers((state) =>
                    state.filter((s) => s !== p.id),
                  );
                  return;
                }

                setSelectedPlayers((state) => state.concat(p.id));
              }}
            />
          ))}
        </form>
        <p>{t("xpModal.xpPerPlayer", { xp: splittedXp.toFixed(0) })}</p>
        <DialogFooter className="pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            {t("buttons.close", { ns: "global" })}
          </Button>
          <Button
            type="submit"
            form="xp-form"
            disabled={isNaN(splittedXp) || xpTotal === 0}
          >
            {t("buttons.save", { ns: "global" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddXpModal;
