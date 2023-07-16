import React from 'react';
import {RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {routes} from 'routes';
import {ReactQueryDevtools} from 'react-query/devtools';

const client = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 10, // 10 minutes
            refetchOnWindowFocus: false,
        },
    },
});

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
