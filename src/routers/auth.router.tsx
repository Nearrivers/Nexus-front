import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import { AUTH_ROUTES, type AuthRouteObject } from "@/@types/route-path";

import RoleRedirect from "@/routers/role.redirect";
import DemoScreen from "@/screens/demo";

const AuthPagesLayout = lazy(() => import("@/components/AuthPage.layout"));
const HomeScreen = lazy(() => import("@/screens/auth/home/Home.screen"));
const AddPlayerScreen = lazy(
  () => import("@/screens/auth/players/AddPlayer.screen"),
);
const AddItemScreen = lazy(() => import("@/screens/auth/items/AddItem.screen"));

const authRouter = createBrowserRouter([
  {
    element: <AuthPagesLayout />,
    children: [
      { path: AUTH_ROUTES.home, element: <HomeScreen /> },
      {
        path: AUTH_ROUTES.players,
        children: [
          { path: AUTH_ROUTES.oneRoute, element: <></> },
          { path: AUTH_ROUTES.addRoute, element: <AddPlayerScreen /> },
          { path: AUTH_ROUTES.updateRoute, element: <></> },
        ],
      },
      {
        path: AUTH_ROUTES.items,
        children: [
          { path: AUTH_ROUTES.oneRoute, element: <></> },
          { path: AUTH_ROUTES.addRoute, element: <AddItemScreen /> },
          { path: AUTH_ROUTES.updateRoute, element: <></> },
        ],
      },
      {
        path: AUTH_ROUTES.demo,
        element: <DemoScreen />,
      },
      {
        path: "*",
        Component: RoleRedirect,
      },
    ] satisfies AuthRouteObject[],
  },
]);

export default authRouter;
