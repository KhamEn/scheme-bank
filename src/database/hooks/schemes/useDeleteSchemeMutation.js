import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { firestoreCollection, queryKeys } from "../../Enums";
import db from "../../firestore-config";

async function deleteScheme(variables) {
  const schemeDocRef = doc(db, firestoreCollection.SCHEMES, variables.id);
  await deleteDoc(schemeDocRef);
}

function useDeleteSchemeMutation() {
  const queryClient = useQueryClient();

  return useMutation(deleteScheme, {
    onSuccess: () => {
      queryClient.invalidateQueries([...queryKeys.GET_ALL_SCHEMES]);
      queryClient.invalidateQueries([...queryKeys.GET_CURRENT_SCHEME_ID]);
    },
  });
}

export default useDeleteSchemeMutation;
