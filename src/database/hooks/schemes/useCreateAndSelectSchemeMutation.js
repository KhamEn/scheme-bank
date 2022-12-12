import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { firestoreCollection, queryKeys } from "../../Enums";
import { auth, db } from "../../Firebase";

/*
Create a new scheme, and make it the current scheme
*/
async function createAndSelectNewScheme(name) {
  // create new scheme
  const schemesCollectionRef = collection(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid,
    firestoreCollection.SCHEMES
  );
  const newSchemeDocRef = await addDoc(schemesCollectionRef, { name: name });

  // set current
  const userDocRef = doc(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid
  );
  await updateDoc(userDocRef, {
    currentSchemeId: newSchemeDocRef.id,
  });
}

function useCreateAndSelectSchemeMutation() {
  const queryClient = useQueryClient();

  return useMutation(createAndSelectNewScheme, {
    onSuccess: () => {
      queryClient.invalidateQueries([...queryKeys.GET_ALL_SCHEMES]);
      queryClient.invalidateQueries([...queryKeys.GET_CURRENT_SCHEME_ID]);
      queryClient.invalidateQueries([...queryKeys.GET_CURRENT_SCHEME]);
    },
  });
}

export default useCreateAndSelectSchemeMutation;
