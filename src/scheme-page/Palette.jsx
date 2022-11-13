import useDeletePaletteMutation from "../database/hooks/palettes-group/useDeletePaletteMutation";
import useGetCurrentSchemeIdQuery from "../database/hooks/useGetCurrentSchemeIdQuery";
import useUpdatePaletteMutation from "../database/hooks/useUpdatePaletteMutation";

const Palette = ({ paletteType, docId, name, colors }) => {
  const { data, isLoading } = useGetCurrentSchemeIdQuery();
  const { mutate: mutateUpdatePalette } = useUpdatePaletteMutation(paletteType);
  const { mutate: mutateDeletePalette } = useDeletePaletteMutation(paletteType);

  function handleDeletePaletteClick() {
    const variables = {
      schemeId: data.id,
      paletteTypeId: paletteType,
      paletteId: docId,
    };
    mutateDeletePalette(variables);
  }

  function addColor() {
    if (!isLoading) {
      const variables = {
        currentSchemeId: data.id,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColors: colors.concat("#000"),
      };
      mutateUpdatePalette(variables);
    }
  }

  function deleteColor(targetIndex) {
    if (!isLoading) {
      colors.splice(targetIndex, 1);

      const variables = {
        currentSchemeId: data.id,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColors: colors,
      };

      mutateUpdatePalette(variables);
    }
  }

  function listColorBlocks() {
    return colors.map((color, index) => {
      return (
        <div key={`${docId}${color}${index}`}>
          <div style={{ backgroundColor: color }}>{color}</div>
          <button
            onClick={() => deleteColor(index)}
            className=" border-4 border-red-500"
          >
            Delete Color Block
          </button>
        </div>
      );
    });
  }

  return (
    <div className=" border border-gray-500">
      <h3>{name}</h3>
      <button
        className=" bg-red-500 border-2 border-black"
        onClick={handleDeletePaletteClick}
      >
        Delete Palette
      </button>

      <button
        onClick={addColor}
        className=" bg-green-500 border-2 border-black"
      >
        + Add Color
      </button>
      <div>{listColorBlocks()}</div>
    </div>
  );
};

export default Palette;
