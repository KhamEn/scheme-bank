import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../firestore-config";
import { firestoreCollection, queryKeys } from "../../Enums";

async function setCurrentSchemeDocId(id) {
  const docRef = doc(db, firestoreCollection.CURRENT_SCHEME, "ID");
  await updateDoc(docRef, {
    id: id,
  });
}

function useSetCurrentSchemeMutation() {
  const queryClient = useQueryClient();

  return useMutation(setCurrentSchemeDocId, {
    onSuccess: () => {
      queryClient.invalidateQueries([...queryKeys.GET_CURRENT_SCHEME_ID]);
    },
  });
}

export default useSetCurrentSchemeMutation;
