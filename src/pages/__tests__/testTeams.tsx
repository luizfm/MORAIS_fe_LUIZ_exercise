import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import Teams from 'pages/Teams';
import {useGetTeams} from 'hooks/useGetTeams';

jest.mock('hooks/useGetTeams');

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

describe('Teams', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', async () => {
        (useGetTeams as jest.Mock).mockReturnValue({
            data: [],
            isLoading: true,
        });

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByTestId('spinner')).toBeInTheDocument();
        });
    });

    it('should render teams list', () => {
        (useGetTeams as jest.Mock).mockReturnValue({
            data: [
                {
                    id: '1',
                    name: 'Team1',
                },
                {
                    id: '2',
                    name: 'Team2',
                },
            ],
            isLoading: false,
        });

        render(<Teams />);

        expect(screen.getByText('Team1')).toBeInTheDocument();
        expect(screen.getByText('Team2')).toBeInTheDocument();
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
});
