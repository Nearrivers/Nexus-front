import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { ADMIN_ROUTES, type AuthRouteObject } from "@/@types/route-path";

import RoleRedirect from "@/routers/role.redirect";

const DemoScreen = lazy(() => import("@/screens/demo"));
const AuthPagesLayout = lazy(() => import("@/components/AuthPage.layout"));
const HomeScreen = lazy(() => import("@/screens/auth/home/Home.screen"));
const AddPlayerScreen = lazy(
  () => import("@/screens/auth/players/AddPlayer.screen"),
);
const PlayerInventoryScreen = lazy(
  () => import("@/screens/auth/players/PlayerInventory.screen"),
);
const AddItemScreen = lazy(() => import("@/screens/auth/items/AddItem.screen"));

const adminRouter = createBrowserRouter([
  {
    element: <AuthPagesLayout />,
    children: [
      { path: ADMIN_ROUTES.home, element: <HomeScreen /> },
      {
        path: ADMIN_ROUTES.players,
        children: [
          { path: ADMIN_ROUTES.oneRoute, element: <PlayerInventoryScreen /> },
          { path: ADMIN_ROUTES.addRoute, element: <AddPlayerScreen /> },
          { path: ADMIN_ROUTES.updateRoute, element: <></> },
        ],
      },
      {
        path: ADMIN_ROUTES.items,
        children: [
          { path: ADMIN_ROUTES.oneRoute, element: <></> },
          { path: ADMIN_ROUTES.addRoute, element: <AddItemScreen /> },
          { path: ADMIN_ROUTES.updateRoute, element: <></> },
        ],
      },
      {
        path: ADMIN_ROUTES.demo,
        element: <DemoScreen />,
      },
      {
        path: "*",
        element: <Navigate to={ADMIN_ROUTES.home} replace />,
      },
    ] satisfies AuthRouteObject[],
  },
]);

export default adminRouter;
