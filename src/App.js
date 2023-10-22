import './App.css';
import UsingFetchApi from './samples/UsingFetchApi';
// import Sample1 from "./samples/Sample1"
// import Sample2 from "./samples/Sample2"

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <UsingFetchApi />
      <QueryClientProvider client={queryClient}>
        {/* <Sample1 /> */}
        {/* <Sample2 /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
