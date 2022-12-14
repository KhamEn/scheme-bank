import DropdownMenu from "./menu/DropdownMenu";
import Userbar from "./account/Userbar";

function Topbar() {
  return (
    <nav className="flex h-12 max-w-screen-2xl flex-wrap items-center justify-between gap-1 sm:mx-6 sm:px-0 lg:mx-9 2xl:mx-auto ">
      <DropdownMenu />
      <Userbar />
    </nav>
  );
}

export default Topbar;
