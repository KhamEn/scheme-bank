import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import { firestoreCollection } from "../../Enums";
import useGetCurrentSchemeIdQuery from "../schemes/useGetCurrentSchemeIdQuery";

/*
@param variablese.schemeId - the doc id of the scheme where the palette resides
@param variables.paletteType - the doc id of the palette type of the palette
@param variables.paletteId - the doc id of the palette
@param variables.paletteName - the new name
*/
async function renamePalette(variables) {
  const paletteDocRef = doc(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid,
    firestoreCollection.SCHEMES,
    variables.schemeId,
    variables.paletteType,
    variables.paletteId
  );
  await updateDoc(paletteDocRef, {
    name: variables.paletteName,
  });
}

function useRenamePaletteMutation(paletteType) {
  const queryClient = useQueryClient();
  const { data } = useGetCurrentSchemeIdQuery();

  return useMutation(renamePalette, {
    onSuccess: () => {
      queryClient.invalidateQueries([data, paletteType]);
    },
  });
}

export default useRenamePaletteMutation;
