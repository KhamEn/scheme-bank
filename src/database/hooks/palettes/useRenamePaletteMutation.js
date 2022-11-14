import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../firestore-config";
import { FIRESTORE_COLLECTION } from "../../Enums";
import useGetCurrentSchemeIdQuery from "../schemes/useGetCurrentSchemeIdQuery";

/*
@param variablese.schemeId - the doc id of the scheme where the palette resides
@param variables.paletteType - the doc id of the palette type of the palette
@param variables.paletteId - the doc id of the palette
@param variables.paletteName - the new name
*/
async function renamePalette(variables) {
  const paletteRef = doc(
    db,
    FIRESTORE_COLLECTION.schemes,
    variables.schemeId,
    variables.paletteType,
    variables.paletteId
  );
  await updateDoc(paletteRef, {
    name: variables.paletteName,
  });
}

function useRenamePaletteMutation(paletteType) {
  const queryClient = useQueryClient();
  const { data } = useGetCurrentSchemeIdQuery();

  return useMutation(renamePalette, {
    onSuccess: () => {
      queryClient.invalidateQueries([data.id, paletteType]);
    },
  });
}

export default useRenamePaletteMutation;
