import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const GuestUserbar = () => {
  return (
    <div className=" flex flex-wrap gap-1">
      <span className="h-fit rounded-full border border-gray-700 bg-gray-700 p-1 text-gray-200">
        Guest
      </span>
      <span className="ml-2">
        <SignUpForm />
      </span>
      <span className="ml-2">
        <SignInForm />
      </span>
    </div>
  );
};

export default GuestUserbar;
