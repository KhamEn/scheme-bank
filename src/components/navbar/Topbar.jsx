import DropdownMenu from "./DropdownMenu";

function Topbar() {
  return (
    <nav className="fixed top-0 left-0 z-50">
      <DropdownMenu />
    </nav>
  );
}

export default Topbar;
