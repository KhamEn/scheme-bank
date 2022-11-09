import useGetCurrentSchemeIdQuery from "../database/hooks/useGetCurrentSchemeIdQuery";
import useAddColorBlockMutation from "../database/hooks/useAddColorBlockMutation";

const Palette = ({ group, docId, name, colors }) => {
  const { data, isLoading } = useGetCurrentSchemeIdQuery();
  const { mutate } = useAddColorBlockMutation(group);
  console.log(colors);

  function addColor() {
    if (!isLoading) {
      const variables = {
        currentSchemeId: data.id,
        paletteGroup: group,
        paletteId: docId,
        colors: colors,
      };
      mutate(variables);
    }
  }

  function listColorBlocks() {
    return colors.map((color, index) => {
      return (
        <div
          key={`${docId}${color}${index}`}
          style={{ backgroundColor: color }}
        >
          {color}
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
