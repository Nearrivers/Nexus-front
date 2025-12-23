import { RouterProvider } from "react-router";

import authRouter from "@/routers/auth.router";

const AuthScreen = () => {
  return <RouterProvider router={authRouter} />;
};

export default AuthScreen;
