import { useQuery } from "@tanstack/react-query";
import { getDocs, collection } from "firebase/firestore";
import db from "../../firestore-config";
import { firestoreCollection, queryKeys } from "../../Enums";

/* 
  return a map of schemes (key = schemeDocumentId, value = scheme)
*/
async function fetchAllSchemes() {
  const schemesCollection = await getDocs(
    collection(db, firestoreCollection.SCHEMES)
  );
  const schemes = new Map();

  schemesCollection.forEach((scheme) => {
    schemes.set(scheme.id, scheme.data());
  });

  return schemes;
}

function useGetAllSchemesQuery() {
  return useQuery([...queryKeys.GET_ALL_SCHEMES], fetchAllSchemes);
}

export default useGetAllSchemesQuery;
