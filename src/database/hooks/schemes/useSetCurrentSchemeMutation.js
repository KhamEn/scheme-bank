import { doc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { firestoreCollection, queryKeys } from "../../Enums";
import db from "../../firestore-config";

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
