import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Sidebar from "./navbar/Sidebar";
import SchemePage from "./scheme-page/SchemePage";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Sidebar />
        <SchemePage />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
