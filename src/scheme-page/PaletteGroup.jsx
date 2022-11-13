import useAddPaletteMutation from "../database/hooks/palettes-group/useAddPaletteMutation";
import useGetCurrentSchemeIdQuery from "../database/hooks/useGetCurrentSchemeIdQuery";
import useGetPalettesQuery from "../database/hooks/useGetPalettesQuery";
import Palette from "./Palette";

const PaletteGroup = ({ groupName }) => {
  const { data, isLoading } = useGetPalettesQuery(groupName);
  const { data: currentSchemeId } = useGetCurrentSchemeIdQuery();
  const { mutate } = useAddPaletteMutation(groupName);

  function handleNewPaletteClick() {
    const paletteName = "new paletteo";
    const variables = {
      schemeId: currentSchemeId.id,
      paletteType: groupName,
      paletteName: paletteName,
    };
    mutate(variables);
  }

  function listPalettes() {
    const palettes = [];

    for (const [docId, palette] of data) {
      const paletteComponent = (
        <Palette
          key={docId}
          paletteType={groupName}
          docId={docId}
          name={palette.name}
          colors={palette.colors}
        />
      );
      palettes.push(paletteComponent);
    }

    return palettes;
  }

  return (
    <div>
      <h1>{groupName}</h1>
      <button
        onClick={handleNewPaletteClick}
        className=" border-2 border-green-500"
      >
        New Palette
      </button>
      {!isLoading && listPalettes()}
    </div>
  );
};

export default PaletteGroup;
