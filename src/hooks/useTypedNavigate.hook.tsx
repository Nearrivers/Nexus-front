import { useNavigate } from "react-router";

import type { AuthRoutes, UnAuthRoutes } from "@/@types/route-path";

const useTypedNavigate = () => {
  const naviagte = useNavigate();

  return (to: AuthRoutes | UnAuthRoutes) => {
    naviagte(to);
  };
};

export default useTypedNavigate;
