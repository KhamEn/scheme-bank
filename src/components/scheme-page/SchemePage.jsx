import PaletteGroup from "./PaletteGroup";
import { firestoreSubCollection } from "../../database/Enums";

const SchemePage = () => {
  return (
    <div className=" mx-3 mt-14 max-w-screen-2xl sm:mx-6 lg:mx-9 2xl:mx-auto">
      <PaletteGroup groupName={firestoreSubCollection.PRIMARY_PALETTES} />
      <PaletteGroup groupName={firestoreSubCollection.NEUTRAL_PALETTES} />
      <PaletteGroup groupName={firestoreSubCollection.ACCENT_PALETTES} />
    </div>
  );
};

export default SchemePage;
