import { createBrowserRouter, Navigate } from "react-router";

import type { UnAuthRouteObject } from "@/@types/route-path";

import LoginScreen from "@/screens/unauth/login/Login.screen";
import SignUpScreen from "@/screens/unauth/login/SignUp.screen";

const unauthRouter = createBrowserRouter([
  {
    children: [
      { path: "login", Component: LoginScreen },
      { path: "signup", Component: SignUpScreen },
      { path: "*", element: <Navigate to="login" replace /> },
    ] satisfies UnAuthRouteObject[],
  },
]);

export default unauthRouter;
