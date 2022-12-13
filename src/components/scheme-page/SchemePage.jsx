import PaletteGroup from "./PaletteGroup";
import { firestoreSubCollection } from "../../database/Enums";
import useGetCurrentSchemeQuery from "../../database/hooks/schemes/useGetCurrentSchemeQuery";

const SchemePage = () => {
  const currentSchemeQuery = useGetCurrentSchemeQuery();
  return (
    <>
      {currentSchemeQuery.isLoading || currentSchemeQuery.isStale ? null : (
        <div className="mx-3 max-w-screen-2xl sm:mx-6 lg:mx-9 2xl:mx-auto">
          <PaletteGroup groupName={firestoreSubCollection.PRIMARY_PALETTES} />
          <PaletteGroup groupName={firestoreSubCollection.NEUTRAL_PALETTES} />
          <PaletteGroup groupName={firestoreSubCollection.ACCENT_PALETTES} />
        </div>
      )}
    </>
  );
};

export default SchemePage;
