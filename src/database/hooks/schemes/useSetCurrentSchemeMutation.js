import { doc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { firestoreCollection, queryKeys } from "../../Enums";
import { auth, db } from "../../Firebase";

async function setCurrentSchemeDocId(id) {
  const docRef = doc(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid
  );
  await updateDoc(docRef, {
    currentSchemeId: id,
  });
}

function useSetCurrentSchemeMutation() {
  const queryClient = useQueryClient();

  return useMutation(setCurrentSchemeDocId, {
    onSuccess: () => {
      queryClient.invalidateQueries([...queryKeys.GET_CURRENT_SCHEME_ID]);
      queryClient.invalidateQueries([...queryKeys.GET_CURRENT_SCHEME]);
      // GET_ALL_SCHEMES is used by <MenuItem/> to apply special effects on the selected scheme
      queryClient.invalidateQueries([...queryKeys.GET_ALL_SCHEMES]);
    },
  });
}

export default useSetCurrentSchemeMutation;
