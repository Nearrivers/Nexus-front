import { Outlet } from "react-router";

import { SidebarProvider } from "@/components/ui/sidebar";

import AppSidebarComponent from "@/components/AppSidebar.component";

const AuthPagesLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebarComponent />
      <main className="w-full p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AuthPagesLayout;
