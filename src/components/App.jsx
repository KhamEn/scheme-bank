import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Topbar from "./navbar/Topbar";
import SchemePage from "./scheme-page/SchemePage";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Topbar />
        <SchemePage />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
