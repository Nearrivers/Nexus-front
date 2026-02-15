import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Pencil, Trash2, Users } from "lucide-react";

import useTypedNavigate from "@/hooks/useTypedNavigate.hook";

import { AUTH_ROUTES } from "@/@types/route-path";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { itemService, type ItemOwner } from "@/store/items";
import OwnersModal from "./modals/Owners.modal";

type ItemContextMenuComponentProps = {
  itemId: string;
  children: ReactNode;
};

const ItemContextMenuComponent = ({
  children,
  itemId,
}: ItemContextMenuComponentProps) => {
  const { t } = useTranslation("home");
  const navigate = useTypedNavigate();

  const [openOwnersModal, setOpenOwnersModal] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      itemService.setActiveItem(itemId);
      return;
    }

    itemService.resetActiveItem();
  };

  const handleCloseOwnersModal = (itemOwners?: ItemOwner[]) => {
    setOpenOwnersModal(false);
    if (!itemOwners) {
      return;
    }

    itemService
      .addItemToInventories(itemOwners.filter((i) => i.quantity > 0))
      .subscribe();
  };

  return (
    <ContextMenu onOpenChange={handleOpenChange}>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => {
            navigate(AUTH_ROUTES.updateItem, { id: itemId });
          }}
        >
          <Pencil />
          {t("itemMenu.update")}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => setOpenOwnersModal(true)}>
          <Users />
          {t("itemMenu.owners")}
        </ContextMenuItem>
        <ContextMenuItem variant="destructive">
          <Trash2 />
          {t("itemMenu.delete")}
        </ContextMenuItem>
      </ContextMenuContent>
      <OwnersModal
        itemId={itemId}
        open={openOwnersModal}
        handleClose={handleCloseOwnersModal}
      />
    </ContextMenu>
  );
};

export default ItemContextMenuComponent;
