import { createBrowserRouter, Navigate } from "react-router";

import { AUTH_ROUTES, type AuthRouteObject } from "@/@types/route-path";

import AuthPagesLayout from "@/components/AuthPage.layout";

const authRouter = createBrowserRouter([
  {
    element: <AuthPagesLayout />,
    children: [
      { path: AUTH_ROUTES.home, element: <></> },
      { path: AUTH_ROUTES.note, element: <></> },
      {
        path: AUTH_ROUTES.joker,
        element: <Navigate to={AUTH_ROUTES.home} replace />,
      },
    ] satisfies AuthRouteObject[],
  },
]);

export default authRouter;
