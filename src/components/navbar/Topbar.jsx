import DropdownMenu from "./menu/DropdownMenu";
import Userbar from "./account/Userbar";

function Topbar() {
  return (
    <nav className="fixed top-0 left-0 z-20 flex w-screen justify-between p-1 ">
      <DropdownMenu />
      <Userbar />
    </nav>
  );
}

export default Topbar;
