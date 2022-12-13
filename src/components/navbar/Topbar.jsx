import DropdownMenu from "./menu/DropdownMenu";
import Userbar from "./account/Userbar";

function Topbar() {
  return (
    <nav className="flex w-screen flex-wrap justify-between gap-1 p-1 ">
      <DropdownMenu />
      <Userbar />
    </nav>
  );
}

export default Topbar;
