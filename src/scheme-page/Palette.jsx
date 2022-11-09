import useGetCurrentSchemeIdQuery from "../database/hooks/useGetCurrentSchemeIdQuery";
import useUpdatePaletteMutation from "../database/hooks/useUpdatePaletteMutation";

const Palette = ({ group, docId, name, colors }) => {
  const { data, isLoading } = useGetCurrentSchemeIdQuery();
  const { mutate } = useUpdatePaletteMutation(group);

  function addColor() {
    if (!isLoading) {
      const variables = {
        currentSchemeId: data.id,
        paletteGroup: group,
        paletteId: docId,
        updatedColors: colors.concat("#000"),
      };
      mutate(variables);
    }
  }

  function deleteColor(targetIndex) {
    if (!isLoading) {
      colors.splice(targetIndex, 1);

      const variables = {
        currentSchemeId: data.id,
        paletteGroup: group,
        paletteId: docId,
        updatedColors: colors,
      };

      mutate(variables);
    }
  }

  function listColorBlocks() {
    return colors.map((color, index) => {
      return (
        <div>
          <div
            key={`${docId}${color}${index}`}
            style={{ backgroundColor: color }}
          >
            {color}
          </div>
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
