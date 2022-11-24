import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { firestoreCollection, queryKeys } from "../../Enums";
import db from "../../firestore-config";

/*
Create a new scheme, and make it the current scheme
*/
async function createAndSelectNewScheme(name) {
  // create new scheme
  const schemesDocRef = collection(db, firestoreCollection.SCHEMES);
  const newSchemeDocRef = await addDoc(schemesDocRef, { name: name });

  // set current
  const currentSchemeIdDocRef = doc(
    db,
    firestoreCollection.CURRENT_SCHEME,
    "ID"
  );
  await updateDoc(currentSchemeIdDocRef, {
    id: newSchemeDocRef.id,
  });
}

function useCreateAndSelectSchemeMutation() {
  const queryClient = useQueryClient();

  return useMutation(createAndSelectNewScheme, {
    onSuccess: () => {
      queryClient.invalidateQueries([...queryKeys.GET_ALL_SCHEMES]);
      queryClient.invalidateQueries([...queryKeys.GET_CURRENT_SCHEME_ID]);
    },
  });
}

export default useCreateAndSelectSchemeMutation;
