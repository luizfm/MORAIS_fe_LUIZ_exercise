import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {MemoryRouter} from 'react-router-dom';

const queryClient = new QueryClient();

type WrapperProps = {
    children: React.ReactNode;
};

type CreateWrapperProps = {
    path?: string;
};

export const createWrapper = ({path = '/'}: CreateWrapperProps) => {
    const Wrapper = ({children}: WrapperProps) => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
            </QueryClientProvider>
        );
    };

    return Wrapper;
};
