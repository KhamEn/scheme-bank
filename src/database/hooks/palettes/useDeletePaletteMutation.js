import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import { firestoreCollection } from "../../Enums";
import useGetCurrentSchemeIdQuery from "../schemes/useGetCurrentSchemeIdQuery";

/*
@param variablese.schemeId - the doc id of the scheme of the target palette
@param variables.paletteType - the collection id of the palette group of the target palette
@param variables.paletteId - the doc id of the palette
*/
async function deletePalette(variables) {
  const paletteDocRef = doc(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid,
    firestoreCollection.SCHEMES,
    variables.schemeId,
    variables.paletteTypeId,
    variables.paletteId
  );
  await deleteDoc(paletteDocRef);
}

function useDeletePaletteMutation(paletteTypeId) {
  const queryClient = useQueryClient();
  const { data } = useGetCurrentSchemeIdQuery();
  return useMutation(deletePalette, {
    onSuccess: () => {
      queryClient.invalidateQueries([data, paletteTypeId]);
    },
  });
}

export default useDeletePaletteMutation;
