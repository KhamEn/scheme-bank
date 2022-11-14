import { getDocs, collection } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import db from "../../firestore-config";
import { FIRESTORE_COLLECTION } from "../../Enums";
import useGetCurrentSchemeIdQuery from "../schemes/useGetCurrentSchemeIdQuery";

//  return: a map (key: docId, value: palette{name, colors})
async function getAllPalettes(currentSchemeDocId, paletteGroupId) {
  const palettesRef = collection(
    db,
    FIRESTORE_COLLECTION.schemes,
    currentSchemeDocId,
    paletteGroupId
  );
  const palettesSnap = await getDocs(palettesRef);
  const palettes = new Map();
  palettesSnap.forEach((doc) => palettes.set(doc.id, doc.data()));
  return palettes;
}

function useGetAllPalettesQuery(paletteGroupId) {
  const { data } = useGetCurrentSchemeIdQuery();
  const currentSchemeDocId = data?.id;

  return useQuery({
    queryKey: [currentSchemeDocId, paletteGroupId],
    queryFn: () => {
      const palettes = getAllPalettes(currentSchemeDocId, paletteGroupId);
      return palettes;
    },
    enabled: !!currentSchemeDocId,
  });
}

export default useGetAllPalettesQuery;
