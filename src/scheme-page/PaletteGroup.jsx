import useGetPalettesQuery from "../database/hooks/useGetPalettesQuery";
import Palette from "./Palette";

const PaletteGroup = ({ groupName }) => {
  const { data, isLoading } = useGetPalettesQuery(groupName);

  function listPalettes() {
    const palettes = [];

    for (const [docId, palette] of data) {
      const paletteComponent = (
        <Palette
          key={docId}
          group={groupName}
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
      {!isLoading && listPalettes()}
    </div>
  );
};

export default PaletteGroup;
