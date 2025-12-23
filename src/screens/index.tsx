import { useEffect, useState } from "react";
import { useObservable } from "@ngneat/react-rxjs";

import { sessionQuery, sessionService } from "@/store/session";

import AuthScreen from "@/screens/auth/Auth.screen";
import UnauthScreens from "@/screens/unauth/UnAuth.screen";
import { finalize } from "rxjs";

const Screens = () => {
  const [loading, setLoading] = useState(false);

  const [user] = useObservable(sessionQuery.user$);

  useEffect(() => {
    setLoading(true);
    const subscription$ = sessionService
      .getMe()
      .pipe(finalize(() => setLoading(false)))
      .subscribe();

    return () => {
      subscription$.unsubscribe();
    };
  }, []);

  const isAuthenticated = !!user;

  return (
    <div className="w-full h-full">
      {!loading && isAuthenticated && <AuthScreen />}
      {!loading && !isAuthenticated && <UnauthScreens />}
    </div>
  );
};

export default Screens;
