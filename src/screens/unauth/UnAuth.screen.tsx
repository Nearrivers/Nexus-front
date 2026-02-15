import { RouterProvider } from "react-router";

import unauthRouter from "@/routers/unauth.router.tsx";

const UnauthScreens = () => {
  return <RouterProvider router={unauthRouter} />;
};

export default UnauthScreens;
