import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const GuestUserbar = () => {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <span className="rounded-full border border-gray-700 bg-gray-700 p-2 text-gray-200">
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
