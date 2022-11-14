import { useQuery } from "@tanstack/react-query";
import { getDocs, collection } from "firebase/firestore";
import db from "../../firestore-config";
import { FIRESTORE_COLLECTION } from "../../Enums";

/* 
  return a map of schemes (key = schemeDocumentId, value = scheme)
*/
async function fetchAllSchemes() {
  const schemesCollection = await getDocs(
    collection(db, FIRESTORE_COLLECTION.schemes)
  );
  const schemes = new Map();

  schemesCollection.forEach((scheme) => {
    schemes.set(scheme.id, scheme.data());
  });

  return schemes;
}

function useGetAllSchemesQuery() {
  return useQuery([FIRESTORE_COLLECTION.schemes], fetchAllSchemes);
}

export default useGetAllSchemesQuery;
