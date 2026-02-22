import { Navigate } from "react-router";

import { AUTH_ROUTES } from "@/@types/route-path";

import { sessionQuery } from "@/store/session";

const RoleRedirect = () => {
  const player = sessionQuery.player;

  console.log(player, player?.is_admin);
  if (!player) {
    return <></>;
  }

  if (player.is_admin) {
    return <Navigate to={AUTH_ROUTES.home} replace />;
  }

  return <Navigate to={`${AUTH_ROUTES.players}/${player.id}`} replace />;
};

export default RoleRedirect;
