import { finalize } from "rxjs";
import { useEffect, useState } from "react";
import { useObservable } from "@ngneat/react-rxjs";

import { sessionQuery, sessionService } from "@/store/session";

import AuthScreen from "@/screens/auth/Auth.screen";
import UnauthScreens from "@/screens/unauth/UnAuth.screen";
import WebSocketProvider from "@/contexts/wsProvider";

const Screens = () => {
  const [loading, setLoading] = useState(true);

  const [player] = useObservable(sessionQuery.player$);

  useEffect(() => {
    const subscription$ = sessionService
      .getMe()
      .pipe(finalize(() => setLoading(false)))
      .subscribe();

    return () => {
      subscription$.unsubscribe();
    };
  }, []);

  const isAuthenticated = !!player;

  if (isAuthenticated) {
    return (
      <div className="w-full h-full">
        <WebSocketProvider playerId={player.id}>
          <AuthScreen />
        </WebSocketProvider>
      </div>
    );
  }

  return <div className="w-full h-full">{!loading && <UnauthScreens />}</div>;
};

export default Screens;
