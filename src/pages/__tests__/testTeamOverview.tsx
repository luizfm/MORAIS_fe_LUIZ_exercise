import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {useGetTeamOverview} from 'hooks/useGetTeamOverview';
import {useGetUserData} from 'hooks/useGetUserData';
import TeamOverview from '../TeamOverview';

jest.mock('hooks/useGetTeamOverview');
jest.mock('hooks/useGetUserData');

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            teamName: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

describe('TeamOverview', () => {
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
            data: {
                id: '1',
                teamLeadId: '2',
                teamMemberIds: ['3', '4', '5'],
            },
            isLoading: false,
        });
        (useGetUserData as jest.Mock).mockReturnValue({
            data: {
                id: '2',
                firstName: 'userData',
                lastName: 'userData',
                displayName: 'userData',
                location: '',
                avatar: '',
            },
            isLoading: false,
        });

        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(4);
        });
    });
});
