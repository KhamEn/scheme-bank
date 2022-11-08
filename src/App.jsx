import { enableMapSet } from "immer";
import Sidebar from "./Navbar/Sidebar";
import SchemePage from "./SchemePage/SchemePage";

// Immer
enableMapSet()

function App() {
  return (
    <div>
      <Sidebar />
      <SchemePage/>
    </div>
  );
}

export default App;
