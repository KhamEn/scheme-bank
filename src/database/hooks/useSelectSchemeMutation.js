import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import db from "../firestore-config";
import { FIRESTORE_COLLECTION } from "../Enums";

async function setCurrentSchemeDocId(id) {
  const docRef = doc(db, FIRESTORE_COLLECTION.currentScheme, "ID");
  await updateDoc(docRef, {
    id: id,
  });
}

function useSelectSchemeMutation() {
  const queryClient = useQueryClient();

  return useMutation(setCurrentSchemeDocId, {
    onSuccess: () => {
      queryClient.invalidateQueries([FIRESTORE_COLLECTION.currentScheme]);
    },
  });
}

export default useSelectSchemeMutation;
