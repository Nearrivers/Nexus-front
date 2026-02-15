import { createBrowserRouter, Navigate } from "react-router";

import { AUTH_ROUTES, type AuthRouteObject } from "@/@types/route-path";

import AuthPagesLayout from "@/components/AuthPage.layout";

import HomeScreen from "@/screens/auth/home/Home.screen";
import TagsScreen from "@/screens/auth/tags/Tags.screen";

const authRouter = createBrowserRouter([
  {
    element: <AuthPagesLayout />,
    children: [
      { path: AUTH_ROUTES.home, Component: HomeScreen },
      { path: AUTH_ROUTES.note, element: <></> },
      { path: AUTH_ROUTES.tags, Component: TagsScreen },
      {
        path: AUTH_ROUTES.joker,
        element: <Navigate to={AUTH_ROUTES.home} replace />,
      },
    ] satisfies AuthRouteObject[],
  },
]);

export default authRouter;
