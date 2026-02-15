import { Toaster } from "sonner";

import { ThemeProvider } from "@/lib/theme.provider";

import Screens from "@/screens/index";

const App = () => {
  return (
    <ThemeProvider>
      <Screens />
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
