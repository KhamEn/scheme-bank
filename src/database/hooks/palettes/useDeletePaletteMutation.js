import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import db from "../../firestore-config";
import { firestoreCollection } from "../../Enums";
import useGetCurrentSchemeIdQuery from "../schemes/useGetCurrentSchemeIdQuery";

/*
@param variablese.schemeId - the doc id of the scheme of the target palette
@param variables.paletteType - the collection id of the palette group of the target palette
@param variables.paletteId - the doc id of the palette
*/
async function deletePalette(variables) {
  await deleteDoc(
    doc(
      db,
      firestoreCollection.SCHEMES,
      variables.schemeId,
      variables.paletteTypeId,
      variables.paletteId
    )
  );
}

function useDeletePaletteMutation(paletteTypeId) {
  const queryClient = useQueryClient();
  const { data } = useGetCurrentSchemeIdQuery();
  return useMutation(deletePalette, {
    onSuccess: () => {
      queryClient.invalidateQueries([data.id, paletteTypeId]);
    },
  });
}

export default useDeletePaletteMutation;
