import React from 'react';
import {RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {routes} from 'routes';
import {ReactQueryDevtools} from 'react-query/devtools';

const client = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={client}>
            <main>
                <RouterProvider router={routes} />
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
