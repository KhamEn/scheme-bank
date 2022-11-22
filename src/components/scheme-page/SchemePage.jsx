import PaletteGroup from "./PaletteGroup";
import { firestoreSubCollection } from "../../database/Enums";

const SchemePage = () => {
  return (
    <div className="m-16 ">
      <PaletteGroup groupName={firestoreSubCollection.PRIMARY_PALETTES} />
      <PaletteGroup groupName={firestoreSubCollection.NEUTRAL_PALETTES} />
      <PaletteGroup groupName={firestoreSubCollection.ACCENT_PALETTES} />
    </div>
  );
};

export default SchemePage;
