import { useQuery } from "@tanstack/react-query";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import { firestoreCollection, queryKeys } from "../../Enums";

/* 
  return a map of schemes (key = schemeDocumentId, value = scheme)
*/
async function fetchAllSchemes() {
  const schemesCollectionRef = collection(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid,
    firestoreCollection.SCHEMES
  );
  const schemesCollectionSnap = await getDocs(schemesCollectionRef);

  const schemes = new Map();
  schemesCollectionSnap.forEach((scheme) => {
    schemes.set(scheme.id, scheme.data());
  });

  return schemes;
}

function useGetAllSchemesQuery() {
  return useQuery([...queryKeys.GET_ALL_SCHEMES], fetchAllSchemes);
}

export default useGetAllSchemesQuery;
