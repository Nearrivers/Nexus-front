import { createBrowserRouter, Navigate } from "react-router";

import { AUTH_ROUTES, type AuthRouteObject } from "@/@types/route-path";

const authRouter = createBrowserRouter([
  {
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
