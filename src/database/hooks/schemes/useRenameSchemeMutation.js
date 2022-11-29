import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { firestoreCollection, queryKeys } from "../../Enums";
import db from "../../firestore-config";

async function renameScheme(variables) {
  const schemeRef = doc(db, firestoreCollection.SCHEMES, variables.schemeId);
  await updateDoc(schemeRef, {
    name: variables.newName,
  });
}

function useRenameSchemeMutation() {
  const queryClient = useQueryClient();

  return useMutation(renameScheme, {
    onSuccess: () => {
      queryClient.invalidateQueries([...queryKeys.GET_ALL_SCHEMES]);
    },
  });
}

export default useRenameSchemeMutation;
