import { useQuery } from "@tanstack/react-query";
import { fetchCurrentSchemeDocId } from "../database/FirestoreHelper";

function useGetCurrentSchemeIdQuery() {
  return useQuery(["currentSchemeId"], fetchCurrentSchemeDocId);
}

export default useGetCurrentSchemeIdQuery;
