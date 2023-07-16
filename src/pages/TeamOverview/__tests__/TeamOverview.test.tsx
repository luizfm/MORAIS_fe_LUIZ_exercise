import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {useGetTeamOverview} from 'hooks/useGetTeamOverview';
import {useGetUserData} from 'hooks/useGetUserData';
import {wrapper} from 'utils/tests/createWrapper';
import TeamOverview from '..';

jest.mock('hooks/useGetTeamOverview');
jest.mock('hooks/useGetUserData');

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            name: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

const mockedTeamOverviewData = {
    id: '1',
    teamLeadId: '2',
    teamMemberIds: ['3', '4', '5'],
};

const mockedUserData = {
    id: '2',
    firstName: 'userData',
    lastName: 'userData',
    displayName: 'userData',
    location: '',
    avatar: '',
};

describe('TeamOverview | component | unit test', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render team overview users', async () => {
        (useGetTeamOverview as jest.Mock).mockReturnValue({
            data: mockedTeamOverviewData,
            isLoading: false,
        });
        (useGetUserData as jest.Mock).mockReturnValue({
            data: mockedUserData,
            isLoading: false,
        });

        render(<TeamOverview />, {wrapper});

        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(4);
        });
    });

    it('should render loading spinner when it is fetching data', async () => {
        (useGetTeamOverview as jest.Mock).mockReturnValue({
            data: {},
            isLoading: true,
        });

        (useGetUserData as jest.Mock).mockReturnValue({
            data: {},
            isLoading: true,
        });

        render(<TeamOverview />, {wrapper});

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('should render empty results after submit the form', async () => {
        (useGetTeamOverview as jest.Mock).mockReturnValue({
            data: mockedTeamOverviewData,
            isLoading: false,
        });
        (useGetUserData as jest.Mock).mockReturnValue({
            data: mockedUserData,
            isLoading: false,
            isSuccess: true,
        });

        render(<TeamOverview />, {wrapper});

        const searchInput = screen.getByRole('searchbox', {name: /search for a member/i});

        fireEvent.change(searchInput, {target: {value: 'userDataTest'}});

        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(0);
        });
    });
});
