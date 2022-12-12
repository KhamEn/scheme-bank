import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../database/Firebase";

const SignInDialog = ({ isOpen, setIsOpen }) => {
  const [username, setUsername] = useState("test@test.com");
  const [password, setPassword] = useState("test1234");

  function signIn() {
    setIsOpen(false);

    signInWithEmailAndPassword(auth, username, password);
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
        <Dialog.Panel className="rounded-md border bg-gray-100 p-5">
          <Dialog.Title className=" text-xl font-bold  text-gray-900 ">
            Sign in to Scheme Bank
          </Dialog.Title>
          <div>
            <label htmlFor="username" className="mr-3">
              Email
            </label>
            <input
              autoFocus
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength="25"
              className="mt-4 p-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="mr-3">
              Password
            </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength="25"
              className="mt-4 p-2"
            />
          </div>

          <div className="mt-4 flex justify-evenly gap-2">
            <button onClick={signIn} className="btn btn-create w-full p-[2px]">
              Login
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

const SignInForm = () => {
  const [showSignInDialog, setShowSignInDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowSignInDialog(true)}
        className="btn btn-neutral p-1"
      >
        Login
      </button>
      {showSignInDialog && (
        <SignInDialog
          isOpen={showSignInDialog}
          setIsOpen={setShowSignInDialog}
        />
      )}
    </>
  );
};

export default SignInForm;
