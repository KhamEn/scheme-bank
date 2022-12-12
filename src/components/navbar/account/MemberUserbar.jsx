import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../database/Enums";
import { auth } from "../../../database/Firebase";

const MemberUserbar = () => {
  const queryClient = useQueryClient();

  function signOut() {
    auth.signOut();

    queryClient.invalidateQueries([...queryKeys.GET_CURRENT_SCHEME_ID]);
    queryClient.invalidateQueries([...queryKeys.GET_CURRENT_SCHEME]);
    queryClient.invalidateQueries([...queryKeys.GET_ALL_SCHEMES]);
  }

  return (
    <div className="m-1">
      <span className="rounded-full border border-gray-700 bg-gray-700 p-2 text-gray-200">
        Member
      </span>
      <button onClick={signOut} className="btn btn-neutral ml-2 p-1">
        Sign Out
      </button>
    </div>
  );
};

export default MemberUserbar;
