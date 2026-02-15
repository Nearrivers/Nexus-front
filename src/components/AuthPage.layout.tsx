import { Outlet } from "react-router";

const AuthPagesLayout = () => {
  return (
    <main className="w-full p-2">
      <Outlet />
    </main>
  );
};

export default AuthPagesLayout;
