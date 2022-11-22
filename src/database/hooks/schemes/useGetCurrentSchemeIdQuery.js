import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firestore-config";
import { firestoreCollection, queryKeys } from "../../Enums";

async function fetchCurrentSchemeDocId() {
  const docRef = doc(db, firestoreCollection.CURRENT_SCHEME, "ID");
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

function useGetCurrentSchemeIdQuery() {
  return useQuery(
    [...queryKeys.GET_CURRENT_SCHEME_ID],
    fetchCurrentSchemeDocId
  );
}

export default useGetCurrentSchemeIdQuery;
