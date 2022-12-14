import { useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { firestoreCollection, queryKeys } from "../database/Enums";
import { auth, db } from "../database/Firebase";
import useSetCurrentSchemeMutation from "../database/hooks/schemes/useSetCurrentSchemeMutation";
import useCreateUserWithStarterSchemeMutation from "../database/hooks/users/useCreateUserWithStarterSchemeMutation";
import Topbar from "./navbar/Topbar";
import SchemePage from "./scheme-page/SchemePage";

function App() {
  const queryClient = useQueryClient();
  const createUserWithStarterSchemeMutation =
    useCreateUserWithStarterSchemeMutation();
  const setCurrentSchemeMutation = useSetCurrentSchemeMutation();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.isAnonymous) {
          const userDocRef = doc(
            db,
            firestoreCollection.BASE_COLLECTION,
            user.uid
          );
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setCurrentSchemeMutation.mutate(userDocSnap.data().currentSchemeId);
          } else {
            const variables = {
              uid: user.uid,
            };
            createUserWithStarterSchemeMutation.mutate(variables);
          }
        } else {
          queryClient.invalidateQueries([...queryKeys.GET_CURRENT_SCHEME_ID]);
          queryClient.invalidateQueries([...queryKeys.GET_CURRENT_SCHEME]);
          queryClient.invalidateQueries([...queryKeys.GET_ALL_SCHEMES]);
        }
      } else {
        signInAnonymously(auth);
      }
    });
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-50 w-screen max-w-full border-b border-gray-50 backdrop-blur-3xl">
        <Topbar />
      </div>
      <div>
        <SchemePage />
      </div>
    </div>
  );
}

export default App;
