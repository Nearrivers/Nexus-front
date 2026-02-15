import type { TagModel } from "@/store/tags";

import { Badge } from "@/components/ui/badge";
import { Pen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

type TagBadgeComponentProps = {
  tag: TagModel;
  onClick?: () => void;
  onUpdateClick?: () => void;
  onDeleteClick?: () => void;
};

const TagBadgeComponent = ({
  tag,
  onClick,
  onDeleteClick,
  onUpdateClick,
}: TagBadgeComponentProps) => {
  return (
    <Badge
      variant="secondary"
      className="p-2 px-4 flex gap-2"
      key={tag.id}
      onClick={() => onClick?.()}
    >
      {tag.name}
      <span
        className="w-2 h-2 rounded-full"
        style={{
          backgroundColor: tag.color,
        }}
      />
      <div className="flex">
        {onUpdateClick && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onUpdateClick()}
          >
            <Pen />
          </Button>
        )}
        {onDeleteClick && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDeleteClick()}
          >
            <Trash />
          </Button>
        )}
      </div>
    </Badge>
  );
};

export default TagBadgeComponent;
