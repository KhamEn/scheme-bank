import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firestore-config";
import { firestoreCollection, queryKeys } from "../../Enums";

async function fetchCurrentScheme() {
  const currentSchemeIdRef = doc(db, firestoreCollection.CURRENT_SCHEME, "ID");
  const currentSchemeIdSnap = await getDoc(currentSchemeIdRef);
  const schemesRef = doc(
    db,
    firestoreCollection.SCHEMES,
    currentSchemeIdSnap.data().id
  );
  const schemesSnap = await getDoc(schemesRef);

  return schemesSnap.data();
}

function useGetCurrentSchemeQuery() {
  return useQuery([...queryKeys.GET_CURRENT_SCHEME], fetchCurrentScheme);
}

export default useGetCurrentSchemeQuery;
