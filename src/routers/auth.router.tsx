import { createBrowserRouter } from "react-router";

import { AUTH_ROUTES, type AuthRouteObject } from "@/@types/route-path";

import RoleRedirect from "@/routers/role.redirect";

import AuthPagesLayout from "@/components/AuthPage.layout";

import HomeScreen from "@/screens/auth/home/Home.screen";
import AddPlayerScreen from "@/screens/auth/players/AddPlayer.screen";

const authRouter = createBrowserRouter([
  {
    element: <AuthPagesLayout />,
    children: [
      { path: AUTH_ROUTES.home, Component: HomeScreen },
      {
        path: AUTH_ROUTES.players,
        children: [
          { path: AUTH_ROUTES.oneRoute, element: <></> },
          { path: AUTH_ROUTES.addRoute, Component: AddPlayerScreen },
          { path: AUTH_ROUTES.updateRoute, element: <></> },
        ],
      },
      {
        path: "*",
        Component: RoleRedirect,
      },
    ] satisfies AuthRouteObject[],
  },
]);

export default authRouter;
