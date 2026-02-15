import AuthScreen from "@/screens/auth/Auth.screen";
import UnauthScreens from "@/screens/unauth/UnAuth.screen";

const Screens = () => {
  const isAuthenticated = false;

  return (
    <div className="w-full h-full">
      {isAuthenticated && <AuthScreen />}
      {!isAuthenticated && <UnauthScreens />}
    </div>
  );
};

export default Screens;
