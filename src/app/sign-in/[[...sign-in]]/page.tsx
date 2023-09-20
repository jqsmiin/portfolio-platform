import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center mt-16">
      <SignIn />
    </div>
  );
};

export default SignInPage;
