import SchemeListItem from "./SchemeListItem";
import useGetAllSchemesQuery from "../database/hooks/useGetAllSchemesQuery";

const SidebarExpanded = ({ collapseSidebar }) => {
  const { data, isLoading } = useGetAllSchemesQuery();

  function getSchemesList() {
    const schemesList = [];

    for (const [docId, scheme] of data) {
      schemesList.push(
        <SchemeListItem key={docId} id={docId} name={scheme.name} />
      );
    }

    return schemesList;
  }

  return (
    <nav
      className={
        "p-2 fixed top-0 left-0 h-screen min-w-max flex flex-col bg-gray-900 text-white shadow-lg"
      }
    >
      <ul>
        <button className=" bg-red-900" onClick={collapseSidebar}>
          {"<<<<"}
        </button>
        {!isLoading && getSchemesList()}
      </ul>
    </nav>
  );
};

export default SidebarExpanded;
