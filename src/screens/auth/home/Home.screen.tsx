import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { LayoutList, Plus, UsersRound } from "lucide-react";

import useTypedNavigate from "@/hooks/useTypedNavigate.hook";

import { AUTH_ROUTES } from "@/@types/route-path";

import { cn } from "@/lib/utils";

import { playerService, type PlayerModel } from "@/store/players";

import { Button } from "@/components/ui/button";
import ItemDisplayComponent, {
  type ItemDisplay,
} from "@/components/items/ItemDisplay.component";
import H1Typo from "@/components/ui/typographies/h1";
import H2Typo from "@/components/ui/typographies/h2";
import { itemService, type ItemModel } from "@/store/items";
import ItemCardComponent from "@/components/items/ItemCard.component";
import PlayerCardComponent from "@/components/players/PlayerCard.component";
import ItemBoxComponent from "@/components/items/ItemBox.component";
import AddXpModal from "@/screens/auth/home/components/modals/AddXp.modal";

const HomeScreen = () => {
  const { t } = useTranslation("home");
  const navigate = useTypedNavigate();

  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [items, setItems] = useState<ItemModel[]>([]);

  const [itemDisplay, setItemDisplay] = useState(
    (localStorage.getItem("itemDisplay") ?? "box") as ItemDisplay,
  );

  const loadPlayers = useCallback(() => {
    playerService.getPlayers().subscribe({
      next: setPlayers,
      error: (err) => {
        console.log(err);
      },
    });
  }, []);

  const loadItems = useCallback(() => {
    itemService.getItems().subscribe({
      next: setItems,
      error: (err) => {
        console.log(err);
      },
    });
  }, []);

  useEffect(() => {
    loadPlayers();
    loadItems();
  }, []);

  return (
    <div className="flex flex-col items-center py-12 gap-8 lg:px-28">
      <H1Typo>{t("admin.adminView")}</H1Typo>
      <section className="w-full">
        <header className="flex justify-between items-center text-muted-foreground">
          <div className="flex  items-center gap-4">
            <UsersRound width="1rem" />
            <H2Typo>{t("admin.players")}</H2Typo>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon-sm"
              onClick={() => navigate(AUTH_ROUTES.addPlayer)}
            >
              <Plus />
            </Button>
            <AddXpModal />
          </div>
        </header>
        <article className="py-2 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 lg:py-4">
          {players.length ? (
            players.map((p) => <PlayerCardComponent player={p} key={p.id} />)
          ) : (
            <p className="text-muted-foreground italic font-medium p-4 text-sm">
              {t("admin.noPlayers")}
            </p>
          )}
        </article>
      </section>
      <section className="w-full">
        <header className="flex justify-between items-center text-muted-foreground">
          <div className="flex items-center gap-4">
            <LayoutList width="1rem" />
            <H2Typo>{t("admin.items")}</H2Typo>
          </div>
          <div className="flex gap-2">
            <ItemDisplayComponent handleDisplayChange={setItemDisplay} />
          </div>
        </header>
        <article
          className={cn(
            "gap-4 py-4",
            itemDisplay === "box"
              ? "justify-center flex-wrap flex"
              : "grid grid-cols-1 md:grid-cols-2",
          )}
        >
          {items?.length ? (
            items.map((item) =>
              itemDisplay === "box" ? (
                <ItemBoxComponent item={item} key={item.id} />
              ) : (
                <ItemCardComponent item={item} key={item.id} />
              ),
            )
          ) : (
            <p className="text-muted-foreground italic font-medium p-4 text-sm">
              {t("admin.noItem")}
            </p>
          )}
        </article>
      </section>
    </div>
  );
};

export default HomeScreen;
