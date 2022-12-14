import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const GuestUserbar = () => {
  return (
    <div className=" flex flex-wrap gap-1">
      <span className="h-fit rounded-full border border-brand-500 bg-brand-500 p-1 text-gray-50">
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
