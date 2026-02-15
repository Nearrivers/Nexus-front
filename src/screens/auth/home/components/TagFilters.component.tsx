import { useEffect } from "react";
import { ListFilter } from "lucide-react";
import { useTranslation } from "react-i18next";

import { tagsService } from "@/store/tags";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const TagFilterComponents = () => {
  const { t } = useTranslation("home");

  useEffect(() => {
    tagsService.getAllTags().subscribe();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="flex rounded-2xl items-center px-2 py-1 gap-2 text-muted-foreground bg-input w-min"
          >
            <ListFilter width="1rem" height="1rem" />
            {t("search.sort")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-input">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="w-px border-r border-input rounded-xl" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="flex rounded-2xl items-center px-2 py-1 gap-2 text-muted-foreground bg-input w-min"
          >
            <ListFilter width="1rem" height="1rem" />
            {t("search.all")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-input p-4 rounded-2xl">
          <DropdownMenuLabel className="text-muted-foreground font-medium">
            {t("search.selectTags")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TagFilterComponents;
