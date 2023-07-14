import * as React from 'react';
import {RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {routes} from 'routes';

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
};

export default App;
