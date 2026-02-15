import { ImageOff } from "lucide-react";
import { type CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { getUploadedImageURL } from "@/lib/uploadImage";

import { RarityColors, type ItemModel } from "@/store/items/items.model";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Item, ItemContent } from "@/components/ui/item";
import ItemCardComponent from "@/components/items/ItemCard.component";

type ItemBoxComponentProps = {
  item: ItemModel;
  className?: string;
  onClick?: () => void;
};

const ItemBoxComponent = ({
  item,
  className,
  onClick,
}: ItemBoxComponentProps) => {
  const backgroundColor = RarityColors[item.rarity ?? "basic"];

  return (
    <HoverCard openDelay={200} closeDelay={10}>
      <HoverCardTrigger asChild>
        <Item
          variant="outline"
          onClick={onClick}
          className={cn("p-0 overflow-hidden dark bg-background", className)}
        >
          <ItemContent
            style={
              {
                "--gradient-color": backgroundColor.bgColor,
              } as CSSProperties
            }
            className="font-serif flex justify-center items-center w-24 h-24 bg-[linear-gradient(to_bottom,var(--gradient-color),#1B1A1999,#1B1A1999,#40295199)] border border-[#78500066]"
          >
            {item.imageUrl ? (
              <img alt="preview" src={getUploadedImageURL(item.imageUrl)} />
            ) : (
              <ImageOff color="#fff" />
            )}
          </ItemContent>
        </Item>
      </HoverCardTrigger>
      <HoverCardContent className="max-w-xl w-svw p-0 bg-transparent border-none">
        <ItemCardComponent item={item} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default ItemBoxComponent;
