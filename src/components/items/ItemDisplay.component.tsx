import { useTranslation } from "react-i18next";
import { Blocks, Plus, RectangleVertical } from "lucide-react";

import useTypedNavigate from "@/hooks/useTypedNavigate.hook";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export type ItemDisplay = "card" | "box";

type ItemDisplayProps = {
  handleDisplayChange: (value: ItemDisplay) => void;
};

const ItemDisplayComponent = ({ handleDisplayChange }: ItemDisplayProps) => {
  const navigate = useTypedNavigate();

  const { t } = useTranslation("global");

  const changeDisplay = (display: ItemDisplay) => {
    localStorage.setItem("itemDisplay", display);
    handleDisplayChange(display);
  };

  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            onClick={() => navigate("/items/add")}
          >
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("buttons.createItem")}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            onClick={() => changeDisplay("box")}
          >
            <Blocks />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("buttons.boxDisplay")}</p>
        </TooltipContent>
      </Tooltip>{" "}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            onClick={() => changeDisplay("card")}
          >
            <RectangleVertical />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("buttons.cardDisplay")}</p>
        </TooltipContent>
      </Tooltip>
    </ButtonGroup>
  );
};

export default ItemDisplayComponent;
