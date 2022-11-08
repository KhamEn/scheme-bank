const Palette = ({ docId, name, colors }) => {
  function listColorBlocks() {
    return colors.map((color, index) => {
      return <div key={`${docId}${color}${index}`} style={{backgroundColor: color}}>{color}</div>;
    });
  }

  return (
    <div className=" border border-gray-500">
      <h3>{name}</h3>
      <div>{listColorBlocks()}</div>
    </div>
  );
};

export default Palette;
