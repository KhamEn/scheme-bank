import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import SchemeListItem from "./SchemeListItem";
import useGetAllSchemesQuery from "../../database/hooks/schemes/useGetAllSchemesQuery";

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
    <nav className={"flex h-screen flex-col bg-gray-500/25 p-2"}>
      <ul>
        <button onClick={collapseSidebar}>
          <ArrowLeftOnRectangleIcon className=" h-6 w-6" />
        </button>
        {!isLoading && getSchemesList()}
      </ul>
    </nav>
  );
};

export default SidebarExpanded;
