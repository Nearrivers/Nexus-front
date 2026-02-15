import { Home, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";

import useTypedNavigate from "@/hooks/useTypedNavigate.hook";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ui/mode-toggle";

const AppSidebarComponent = () => {
  const { t } = useTranslation("global");
  const navigate = useTypedNavigate();

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.href.includes("/home")}
                  className="text-muted-foreground"
                  onClick={() => navigate("/home")}
                >
                  <Home />
                  {t("sidebar.home")}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.href.includes("/tags")}
                  className="text-muted-foreground"
                  onClick={() => navigate("/tags")}
                >
                  <Tag />
                  {t("sidebar.tags")}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebarComponent;
