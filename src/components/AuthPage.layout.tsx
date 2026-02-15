import { Outlet } from "react-router";

import { SidebarProvider } from "@/components/ui/sidebar";

import AppSidebarComponent from "@/components/AppSidebar.component";

const AuthPagesLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebarComponent />
      <Outlet />
    </SidebarProvider>
  );
};

export default AuthPagesLayout;
