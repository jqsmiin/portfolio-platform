import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center mt-16">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
