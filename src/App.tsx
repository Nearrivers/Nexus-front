import { Toaster } from "sonner";

import { ThemeProvider } from "@/lib/theme.provider";

import { SidebarProvider } from "@/components/ui/sidebar";

import Screens from "@/screens/index";

const App = () => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Screens />
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default App;
