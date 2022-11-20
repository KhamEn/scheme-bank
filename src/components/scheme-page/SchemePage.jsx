import PaletteGroup from "./PaletteGroup";
import { FIRESTORE_COLLECTION } from "../../database/Enums";

const SchemePage = () => {
  return (
    <div className="m-16 ">
      <PaletteGroup groupName={FIRESTORE_COLLECTION.primaryPalettes} />
      <PaletteGroup groupName={FIRESTORE_COLLECTION.neutralPalettes} />
      <PaletteGroup groupName={FIRESTORE_COLLECTION.accentPalettes} />
    </div>
  );
};

export default SchemePage;
