import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import { firestoreCollection, queryKeys } from "../../Enums";

async function fetchCurrentScheme() {
  const userDocRef = doc(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid
  );
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    throw new Error("User is not found.");
  }
  const currentSchemeId = userDocSnap.data().currentSchemeId;

  const currentSchemeDocRef = doc(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid,
    firestoreCollection.SCHEMES,
    currentSchemeId
  );

  const currentSchemeSnap = await getDoc(currentSchemeDocRef);
  if (!currentSchemeSnap.exists()) {
    throw new Error("Scheme is not found.");
  }

  return currentSchemeSnap.data();
}

function useGetCurrentSchemeQuery() {
  return useQuery([...queryKeys.GET_CURRENT_SCHEME], fetchCurrentScheme, {
    staleTime: Infinity,
  });
}

export default useGetCurrentSchemeQuery;
