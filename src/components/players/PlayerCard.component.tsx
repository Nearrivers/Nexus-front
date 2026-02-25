import { useTranslation } from "react-i18next";

import { getLevel, getNextLevelNeededXp } from "@/lib/level";

import useTypedNavigate from "@/hooks/useTypedNavigate.hook";

import type { PlayerWithInventoryModel } from "@/store/players";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { ADMIN_ROUTES } from "@/@types/route-path";

type PlayerCardComponentProps = {
  player: PlayerWithInventoryModel;
};

const PlayerCardComponent = ({ player }: PlayerCardComponentProps) => {
  const { t } = useTranslation("players");
  const navigate = useTypedNavigate();

  return (
    <Item
      variant="outline"
      className="bg-secondary cursor-pointer"
      onClick={() => navigate(ADMIN_ROUTES.onePlayer, { id: player.id })}
    >
      <ItemContent>
        <ItemTitle className="text-lg">{player.name}</ItemTitle>
        <ItemDescription>
          {t("level", { level: getLevel(player.total_experience) })}
        </ItemDescription>
        <ItemDescription>
          {t("nextLevel", {
            xp: getNextLevelNeededXp(player.total_experience),
          })}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
};

export default PlayerCardComponent;
