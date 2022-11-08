import PaletteGroup from "./PaletteGroup";

const SchemePage = () => {
  return (
    <div className=" ml-32">
      <PaletteGroup groupName={"primary-palettes"} />
      <PaletteGroup groupName={"neutral-palettes"} />
      <PaletteGroup groupName={"accent-palettes"} />
    </div>
  );
};

export default SchemePage;
