import { RouterProvider } from "react-router";

import adminRouter from "@/routers/admin.router";

const AdminScreen = () => {
  return <RouterProvider router={adminRouter} />;
};

export default AdminScreen;
