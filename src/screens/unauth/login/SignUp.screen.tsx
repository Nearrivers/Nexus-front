import { SignUpForm } from "@/screens/unauth/login/components/signUp.form";

const SignUpScreen = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpScreen;
