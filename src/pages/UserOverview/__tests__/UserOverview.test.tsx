import React from 'react';
import {render, screen} from '@testing-library/react';
import {useGetUserData} from 'hooks/useGetUserData';
import {createWrapper} from 'utils/tests/createWrapper';
import UserOverview from '..';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => ({}),
    useParams: () => ({
        userId: '1',
    }),
}));

jest.mock('hooks/useGetUserData');

const mockedUser = {
    id: '1',
    firstName: 'Test',
    lastName: 'User',
    displayName: 'userName',
    location: 'location',
};

describe('UserOverview | component | unit test', () => {
    it('should render UserOverview', () => {
        (useGetUserData as jest.Mock).mockReturnValue({
            data: mockedUser,
            isLoading: false,
        });

        render(<UserOverview />, {wrapper: createWrapper({})});

        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('userName')).toBeInTheDocument();
        expect(screen.getByText('location')).toBeInTheDocument();
    });

    it('should render spinner when data is loading', () => {
        (useGetUserData as jest.Mock).mockReturnValue({
            data: mockedUser,
            isLoading: true,
        });

        render(<UserOverview />, {wrapper: createWrapper({})});

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        expect(screen.queryAllByText('Test User')).toHaveLength(0);
        expect(screen.queryAllByText('userName')).toHaveLength(0);
        expect(screen.queryAllByText('location')).toHaveLength(0);
    });
});
