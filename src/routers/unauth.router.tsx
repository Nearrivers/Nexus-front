import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { UNAUTH_ROUTES, type UnAuthRouteObject } from "@/@types/route-path";

const LoginScreen = lazy(() => import("@/screens/unauth/login/Login.screen"));

const unauthRouter = createBrowserRouter([
  {
    children: [
      { path: UNAUTH_ROUTES.login, element: <LoginScreen /> },
      {
        path: "*",
        element: <Navigate to={UNAUTH_ROUTES.login} replace />,
      },
    ] satisfies UnAuthRouteObject[],
  },
]);

export default unauthRouter;
