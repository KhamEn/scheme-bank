import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchCurrentSchemeDocId,
  fetchAllSchemes,
} from "../database/FirestoreHelper";

// const initialSchemes = await fetchAllSchemes();

const SidebarExpanded = ({ collapseSidebar }) => {
  const { data: dataSchemes, isLoading: isLoadingSchemes } = useQuery(
    ["schemes"],
    fetchAllSchemes
  );
  const { data: dataCurrentScheme, isLoading: isLoadingCurrentSchemeId } =
    useQuery(["currentSchemeId"], fetchCurrentSchemeDocId);

  function getSchemesAsElements() {
    const schemesElements = [];

    for (const [docId, scheme] of dataSchemes) {
      if (isLoadingCurrentSchemeId) {
        const item = (
          <li className=" bg-red-900" key={docId}>
            {scheme.name}
          </li>
        );
        schemesElements.push(item);
      } else {
        if (dataCurrentScheme.id === docId) {
          const item = (
            <li className=" bg-green-900" key={docId}>
              {scheme.name}
            </li>
          );
          schemesElements.push(item);
        } else {
          const item = (
            <li className=" bg-red-900" key={docId}>
              {scheme.name}
            </li>
          );
          schemesElements.push(item);
        }
      }
    }

    return schemesElements;
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
        {!isLoadingSchemes && getSchemesAsElements()}
      </ul>
    </nav>
  );
};

export default SidebarExpanded;
