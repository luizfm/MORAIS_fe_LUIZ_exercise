import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

export const wrapper = ({children}) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
