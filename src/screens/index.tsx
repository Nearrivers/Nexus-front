import { finalize } from "rxjs";
import { useEffect, useState } from "react";
import { useObservable } from "@ngneat/react-rxjs";

import { sessionQuery, sessionService } from "@/store/session";

import AdminScreen from "@/screens/auth/Admin.screen";
import UnauthScreens from "@/screens/unauth/UnAuth.screen";
import WebSocketProvider from "@/contexts/wsProvider";

const Screens = () => {
  const [loading, setLoading] = useState(false);

  const [player] = useObservable(
    sessionQuery.player$.pipe(finalize(() => setLoading(false))),
  );

  useEffect(() => {
    const subscription$ = sessionService.getMe().subscribe();

    return () => {
      subscription$.unsubscribe();
    };
  }, []);

  const isAuthenticated = !!player;

  if (loading) {
    return <></>;
  }

  return (
    <div className="w-full h-full">
      {!loading && isAuthenticated && player.is_admin && (
        <WebSocketProvider playerId={player.id}>
          <AdminScreen />
        </WebSocketProvider>
      )}
      {!loading && !isAuthenticated && <UnauthScreens />}
    </div>
  );
};

export default Screens;
