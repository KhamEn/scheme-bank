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
    <div className=" flex flex-wrap gap-1">
      <span className="h-fit rounded-full border border-brand-300 bg-brand-300 p-1 text-gray-50">
        {auth.currentUser.email}
      </span>
      <button
        onClick={signOut}
        className="btn btn-delete mx-1 h-fit border-ui-900 bg-gray-50 p-1 text-ui-900"
      >
        Sign Out
      </button>
    </div>
  );
};

export default MemberUserbar;
