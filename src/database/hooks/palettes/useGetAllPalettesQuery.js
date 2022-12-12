import { getDocs, collection } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { auth, db } from "../../Firebase";
import { firestoreCollection } from "../../Enums";
import useGetCurrentSchemeIdQuery from "../schemes/useGetCurrentSchemeIdQuery";

/*
@return: a map (key: docId, value: palette{name, colors})
*/
async function getAllPalettes(currentSchemeDocId, paletteGroupId) {
  const palettesCollectionRef = collection(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid,
    firestoreCollection.SCHEMES,
    currentSchemeDocId,
    paletteGroupId
  );
  const palettesCollectionSnap = await getDocs(palettesCollectionRef);

  const palettes = new Map();
  palettesCollectionSnap.forEach((paletteDocSnap) =>
    palettes.set(paletteDocSnap.id, paletteDocSnap.data())
  );
  return palettes;
}

/*
Get all palettes of a specific palette type (primary, neutral, accent)
*/
function useGetAllPalettesQuery(paletteGroupId) {
  const { data } = useGetCurrentSchemeIdQuery();

  return useQuery({
    queryKey: [data, paletteGroupId],
    queryFn: () => {
      const palettes = getAllPalettes(data, paletteGroupId);
      return palettes;
    },
    enabled: !!data,
  });
}

export default useGetAllPalettesQuery;
