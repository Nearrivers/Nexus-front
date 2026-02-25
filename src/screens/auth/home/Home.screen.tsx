import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useObservable } from "@ngneat/react-rxjs";
import { LayoutList, Plus, UsersRound } from "lucide-react";

import useTypedNavigate from "@/hooks/useTypedNavigate.hook";

import { ADMIN_ROUTES } from "@/@types/route-path";

import { cn } from "@/lib/utils";

import { itemService, itemsQuery } from "@/store/items";
import { playerService, playersQuery } from "@/store/players";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import H1Typo from "@/components/ui/typographies/h1";
import H2Typo from "@/components/ui/typographies/h2";
import { ButtonGroup } from "@/components/ui/button-group";
import ItemDisplayComponent, {
  type ItemDisplay,
} from "@/components/items/ItemDisplay.component";
import ItemCardComponent from "@/components/items/ItemCard.component";
import PlayerCardComponent from "@/components/players/PlayerCard.component";
import ItemBoxComponent from "@/components/items/ItemBox.component";
import AddXpModal from "@/screens/auth/home/components/modals/AddXp.modal";
import ItemContextMenuComponent from "./components/ItemContextMenu.component";

const HomeScreen = () => {
  const { t } = useTranslation("home");
  const navigate = useTypedNavigate();

  const [items] = useObservable(itemsQuery.items$);
  const [players] = useObservable(playersQuery.players$);

  const [itemDisplay, setItemDisplay] = useState(
    (localStorage.getItem("itemDisplay") ?? "box") as ItemDisplay,
  );

  useEffect(() => {
    playerService.getPlayers().subscribe();
    itemService.getItems().subscribe();
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
            <ButtonGroup>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon-sm"
                    variant="outline"
                    onClick={() => navigate(ADMIN_ROUTES.addPlayer)}
                  >
                    <Plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("buttons.createPlayer", { ns: "global" })}</p>
                </TooltipContent>
              </Tooltip>
              <AddXpModal />
            </ButtonGroup>
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
            items.map((item) => (
              <ItemContextMenuComponent itemId={item.id} key={item.id}>
                {itemDisplay === "box" ? (
                  <ItemBoxComponent className="cursor-pointer" item={item} />
                ) : (
                  <ItemCardComponent className="cursor-pointer" item={item} />
                )}
              </ItemContextMenuComponent>
            ))
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
