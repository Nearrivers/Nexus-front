import { useTranslation } from "react-i18next";

import { getLevel, getNextLevelNeededXp } from "@/lib/level";

import type { PlayerModel } from "@/store/players";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

type PlayerCardComponentProps = {
  player: PlayerModel;
};

const PlayerCardComponent = ({ player }: PlayerCardComponentProps) => {
  const { t } = useTranslation("players");

  return (
    <Item variant="outline" className="bg-secondary cursor-pointer">
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
