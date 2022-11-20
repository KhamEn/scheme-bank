import useGetCurrentSchemeIdQuery from "../../database/hooks/schemes/useGetCurrentSchemeIdQuery";
import useSelectSchemeMutation from "../../database/hooks/schemes/useSetCurrentSchemeMutation";

const SchemeListItem = ({ id, name }) => {
  const { data, isLoading } = useGetCurrentSchemeIdQuery();
  const { mutate } = useSelectSchemeMutation();

  function handleClick() {
    mutate(id);
  }

  if (isLoading) {
    return (
      <li
        className=" m-2 rounded border border-black bg-white p-1 text-black hover:cursor-pointer hover:bg-black/50 hover:text-white/80"
        onClick={handleClick}
      >
        {name}
      </li>
    );
  } else {
    if (data.id === id) {
      return (
        <li
          className="m-2 rounded border border-black bg-black  p-1  text-white hover:cursor-pointer"
          onClick={handleClick}
        >
          {name}
        </li>
      );
    } else {
      return (
        <li
          className=" m-2 rounded border border-black bg-white p-1 text-black hover:cursor-pointer hover:bg-black/80 hover:text-white/80"
          onClick={handleClick}
        >
          {name}
        </li>
      );
    }
  }
};

export default SchemeListItem;
