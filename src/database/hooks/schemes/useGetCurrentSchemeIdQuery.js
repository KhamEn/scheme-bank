import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firestore-config";
import { FIRESTORE_COLLECTION } from "../../Enums";

async function fetchCurrentSchemeDocId() {
  const docRef = doc(db, FIRESTORE_COLLECTION.currentScheme, "ID");
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

function useGetCurrentSchemeIdQuery() {
  return useQuery(
    [FIRESTORE_COLLECTION.currentScheme],
    fetchCurrentSchemeDocId
  );
}

export default useGetCurrentSchemeIdQuery;
