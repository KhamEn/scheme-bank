import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../database/Firebase";
import useCreateUserWithStarterSchemeMutation from "../../../database/hooks/users/useCreateUserWithStarterSchemeMutation";
import { useEffect } from "react";

const SignUpDialog = ({ isOpen, setIsOpen }) => {
  const createUserWithStarterSchemeMutation =
    useCreateUserWithStarterSchemeMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

  useEffect(() => {
    setEmailErrorMessage(null);
  }, [email]);

  useEffect(() => {
    setPasswordErrorMessage(null);
  }, [password]);

  function signUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        createUserWithStarterSchemeMutation.mutate({
          uid: userCredentials.user.uid,
        });
        setIsOpen(false);
        setEmailErrorMessage(null);
        setPasswordErrorMessage(null);
      })
      .catch((error) => {
        switch (error.code) {
          case AuthErrorCodes.EMAIL_EXISTS:
            setEmailErrorMessage("Email already used.");
            break;
          case AuthErrorCodes.INVALID_EMAIL:
            setEmailErrorMessage("Not a proper email address.");
            break;
          case AuthErrorCodes.WEAK_PASSWORD:
            setPasswordErrorMessage(
              "Password must have at least 6 characters."
            );
            break;
          default:
        }
      });
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <Dialog.Backdrop
        className={"fixed inset-0 bg-gray-900/70"}
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="rounded-md border bg-gray-100 p-8">
          <Dialog.Title className=" text-center text-xl  font-bold text-gray-900">
            <div className="font-light text-brand-400 ">Join Scheme Bank</div>
            <div>Create User Account</div>
          </Dialog.Title>
          <div className="mt-8 mb-6">
            <div>
              <label
                htmlFor="username"
                className="mr-3 cursor-pointer font-semibold"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                autoFocus
                type="email"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength="50"
                className="w-full rounded-md border border-gray-300 p-2 "
                required
              />
              {emailErrorMessage && (
                <div className="mt-1 w-fit rounded-md border border-red-500 p-1 text-red-500">
                  {emailErrorMessage}
                </div>
              )}
            </div>
            <div className="mt-3">
              <label
                htmlFor="password"
                className="mr-3  cursor-pointer font-semibold"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength="50"
                minLength="6"
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                required
              />
              <div className="text-sm font-light">Minimum 6 characters.</div>
              {passwordErrorMessage && (
                <div className="mt-1 w-fit rounded-md border border-red-500 p-1 text-red-500">
                  {passwordErrorMessage}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-evenly gap-2">
            <button
              onClick={signUp}
              className="btn btn-create w-full border-green-600 p-[2px] text-green-600"
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-neutral w-full p-[2px]"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

const SignUpForm = () => {
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowSignUpDialog(true)}
        className="btn btn-create p-1"
      >
        Sign Up
      </button>
      {showSignUpDialog && (
        <SignUpDialog
          isOpen={showSignUpDialog}
          setIsOpen={setShowSignUpDialog}
        />
      )}
    </>
  );
};

export default SignUpForm;
