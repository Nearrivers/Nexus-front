import { createBrowserRouter, Navigate } from "react-router";

import { UNAUTH_ROUTES, type UnAuthRouteObject } from "@/@types/route-path";

import LoginScreen from "@/screens/unauth/login/Login.screen";
import SignUpScreen from "@/screens/unauth/login/SignUp.screen";

const unauthRouter = createBrowserRouter([
  {
    children: [
      { path: UNAUTH_ROUTES.login, Component: LoginScreen },
      { path: UNAUTH_ROUTES.signup, Component: SignUpScreen },
      {
        path: UNAUTH_ROUTES.joker,
        element: <Navigate to={UNAUTH_ROUTES.login} replace />,
      },
    ] satisfies UnAuthRouteObject[],
  },
]);

export default unauthRouter;
