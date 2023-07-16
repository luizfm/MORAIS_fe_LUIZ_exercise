import React from 'react';
import {useGetUserData} from 'hooks/useGetUserData';
import {render, screen, waitFor} from '@testing-library/react';
import TeamMembersUserCardList from '..';

jest.mock('hooks/useGetUserData');

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('TeamMembersUSerCardList | component | unit test', () => {
    it('should render member cards if there are team member ids', async () => {
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

        render(<TeamMembersUserCardList teamMemberIds={['3', '4']} />);

        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(2);
        });
    });

    it('should not render member cards if there are not member ids', async () => {
        (useGetUserData as jest.Mock).mockReturnValue({
            data: {},
            isLoading: false,
        });

        render(<TeamMembersUserCardList teamMemberIds={[]} />);

        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(0);
        });
    });
});
