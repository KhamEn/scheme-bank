import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../database/Firebase";
import GuestUserbar from "./GuestUserbar";
import MemberUserbar from "./MemberUserbar";

const Userbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(auth.currentUser);

  onAuthStateChanged(auth, (user) => {
    if (user && !user.isAnonymous) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  });

  return <>{isSignedIn ? <MemberUserbar /> : <GuestUserbar />}</>;
};

export default Userbar;
