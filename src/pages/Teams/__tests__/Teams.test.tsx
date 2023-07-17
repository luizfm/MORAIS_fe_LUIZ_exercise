import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Teams from 'pages/Teams';
import {useGetTeams} from 'hooks/useGetTeams';
import {createWrapper} from 'utils/tests/createWrapper';

jest.mock('hooks/useGetTeams');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
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

const mockedTeamData = [
    {
        id: '1',
        name: 'Team1',
    },
    {
        id: '2',
        name: 'Team2',
    },
];

describe('Teams | component | unit test', () => {
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

        render(<Teams />, {wrapper: createWrapper({})});

        await waitFor(() => {
            expect(screen.getByTestId('spinner')).toBeInTheDocument();
        });
    });

    it('should render teams list', () => {
        (useGetTeams as jest.Mock).mockReturnValue({
            data: mockedTeamData,
            isLoading: false,
        });

        render(<Teams />, {wrapper: createWrapper({})});

        expect(screen.getByText('Team1')).toBeInTheDocument();
        expect(screen.getByText('Team2')).toBeInTheDocument();
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    it('should render empty results after submit the form', async () => {
        (useGetTeams as jest.Mock).mockReturnValue({
            data: mockedTeamData,
            isLoading: false,
        });

        render(<Teams />, {wrapper: createWrapper({})});

        const searchInput = screen.getByRole('searchbox', {name: /search for a team/i});

        fireEvent.input(searchInput, {target: {value: 'Team2'}});

        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.queryAllByText(/Team1/i)).toHaveLength(0);
        });
        expect(screen.queryAllByText(/Team2/i)).toHaveLength(1);
    });
});
