import { SidebarProvider } from "@/components/ui/sidebar";

import Screens from "@/screens/index";

const App = () => {
  return (
    <SidebarProvider>
      <Screens />
    </SidebarProvider>
  );
};

export default App;
