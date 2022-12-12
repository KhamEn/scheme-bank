import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../Firebase";
import { firestoreCollection, queryKeys } from "../../Enums";

async function fetchCurrentSchemeDocId() {
  const userDocRef = doc(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid
  );
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    throw new Error("User is not found");
  }

  return userDocSnap.data().currentSchemeId;
}

function useGetCurrentSchemeIdQuery() {
  return useQuery(
    [...queryKeys.GET_CURRENT_SCHEME_ID],
    fetchCurrentSchemeDocId
  );
}

export default useGetCurrentSchemeIdQuery;
