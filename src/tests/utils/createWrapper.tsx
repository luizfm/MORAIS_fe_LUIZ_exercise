import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';

type Options = {
    path?: string;
    children?: React.ReactNode;
};

export const createWrapper = ({path, children}: Options = {}) => {
    return (
        <MemoryRouter initialEntries={[path]}>
            <Route path={path}>{children}</Route>
        </MemoryRouter>
    );
};
