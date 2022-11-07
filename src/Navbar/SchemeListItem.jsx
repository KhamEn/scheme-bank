import { useQuery } from "@tanstack/react-query";
import { fetchCurrentSchemeDocId } from "../database/FirestoreHelper";
import useSelectScheme from "../database/useSelectScheme";

const SchemeListItem = ({ id, name }) => {
  const { data, isLoading } = useQuery(
    ["currentSchemeId"],
    fetchCurrentSchemeDocId
  );
  const { mutate } = useSelectScheme();

  function handleClick() {
    mutate(id);
  }

  if (isLoading) {
    return (
      <li className=" bg-red-900 hover:cursor-pointer" onClick={handleClick}>
        {name}
      </li>
    );
  } else {
    if (data.id === id) {
      return (
        <li className=" bg-green-900 hover:cursor-pointer" onClick={handleClick}>
          {name}
        </li>
      );
    } else {
      return (
        <li className=" bg-red-900 hover:cursor-pointer" onClick={handleClick}>
          {name}
        </li>
      );
    }
  }
};

export default SchemeListItem;
