import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { firestoreCollection, queryKeys } from "../../Enums";
import { db, auth } from "../../Firebase";

async function deleteScheme(variables) {
  const schemeDocRef = doc(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid,
    firestoreCollection.SCHEMES,
    variables.id
  );
  await deleteDoc(schemeDocRef);
}

function useDeleteSchemeMutation() {
  const queryClient = useQueryClient();

  return useMutation(deleteScheme, {
    onSuccess: () => {
      queryClient.invalidateQueries([...queryKeys.GET_ALL_SCHEMES]);
    },
  });
}

export default useDeleteSchemeMutation;
