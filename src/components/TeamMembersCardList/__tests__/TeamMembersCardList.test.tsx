import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {useGetAllTeamMembers} from 'hooks/useGetAllTeamMembers';
import {trackEvent} from 'track';
import TeamMembersCardList from '..';

jest.mock('hooks/useGetAllTeamMembers');

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock('track', () => ({
    trackEvent: jest.fn(),
}));

const teamMembersMock = {
    teamLead: {
        id: '1',
        firstName: 'teamLeadData',
        lastName: 'teamLeadData',
        displayName: 'teamLeadData',
        location: '',
        avatar: '',
    },
    teamMembers: [
        {
            id: '2',
            firstName: 'userData',
            lastName: 'userData',
            displayName: 'userData',
            location: '',
            avatar: '',
        },
        {
            id: '3',
            firstName: 'otherUser',
            lastName: 'otherUser',
            displayName: 'otherUser',
            location: '',
            avatar: '',
        },
    ],
};

describe('TeamMembersCardList | component | unit test', () => {
    it('should render team members card', () => {
        (useGetAllTeamMembers as jest.Mock).mockReturnValue({
            team: teamMembersMock,
            isLoading: false,
        });

        render(<TeamMembersCardList teamLeadId="1" teamMemberIds={['2', '3']} />);

        expect(screen.getByText('teamLeadData')).toBeInTheDocument();
        expect(screen.getByText('userData')).toBeInTheDocument();
        expect(screen.getByText('otherUser')).toBeInTheDocument();
    });

    it('should not display any member if there are no provided ids', () => {
        (useGetAllTeamMembers as jest.Mock).mockReturnValue({
            team: {
                teamLead: undefined,
                teamMembers: [],
            },
            isLoading: false,
        });

        render(<TeamMembersCardList teamLeadId="" teamMemberIds={[]} />);

        expect(screen.queryAllByText('teamLeadData')).toHaveLength(0);
        expect(screen.queryAllByText('userData')).toHaveLength(0);
        expect(screen.queryAllByText('otherUser')).toHaveLength(0);
    });

    it('should return a list of filtered users based on search value', () => {
        (useGetAllTeamMembers as jest.Mock).mockReturnValue({
            team: teamMembersMock,
            isLoading: false,
        });

        render(
            <TeamMembersCardList
                teamLeadId="1"
                teamMemberIds={['2', '3']}
                searchValue="otherUser"
            />
        );

        expect(screen.queryAllByText('teamLeadData')).toHaveLength(0);
        expect(screen.queryAllByText('userData')).toHaveLength(0);
        expect(screen.getByText('otherUser')).toBeInTheDocument();
    });

    it('should not render any user if searched value does not match any name', () => {
        (useGetAllTeamMembers as jest.Mock).mockReturnValue({
            team: teamMembersMock,
            isLoading: false,
        });

        render(
            <TeamMembersCardList
                teamMemberIds={['2', '3']}
                teamLeadId="1"
                searchValue="otherUserThatDoesNotExist"
            />
        );

        expect(screen.queryAllByText('teamLeadData')).toHaveLength(0);
        expect(screen.queryAllByText('userData')).toHaveLength(0);
        expect(screen.queryAllByText('otherUser')).toHaveLength(0);
    });

    it('should call track event when team lead card is clicked', () => {
        (useGetAllTeamMembers as jest.Mock).mockReturnValue({
            team: teamMembersMock,
            isLoading: false,
        });

        render(<TeamMembersCardList teamLeadId="1" teamMemberIds={['2', '3']} />);

        expect(screen.getByText('teamLeadData')).toBeInTheDocument();
        expect(screen.getByText('userData')).toBeInTheDocument();
        expect(screen.getByText('otherUser')).toBeInTheDocument();

        const teamLeadCard = screen.getByTestId('cardContainer-1');
        fireEvent.click(teamLeadCard);

        expect(trackEvent).toHaveBeenCalledWith('Team Lead Card Clicked', {
            id: '1',
            name: 'teamLeadData',
        });
    });

    it('should call track event when team member card is clicked', () => {
        (useGetAllTeamMembers as jest.Mock).mockReturnValue({
            team: teamMembersMock,
            isLoading: false,
        });

        render(<TeamMembersCardList teamLeadId="1" teamMemberIds={['2', '3']} />);

        expect(screen.getByText('teamLeadData')).toBeInTheDocument();
        expect(screen.getByText('userData')).toBeInTheDocument();
        expect(screen.getByText('otherUser')).toBeInTheDocument();

        const teamLeadCard = screen.getByTestId('cardContainer-2');
        fireEvent.click(teamLeadCard);

        expect(trackEvent).toHaveBeenCalledWith('Team Member Card Clicked', {
            id: '2',
            name: 'userData',
        });
    });

    it('should render loader spinner when it is fetching data', () => {
        (useGetAllTeamMembers as jest.Mock).mockReturnValue({
            team: teamMembersMock,
            isLoading: true,
        });

        render(<TeamMembersCardList teamLeadId="1" teamMemberIds={['2', '3']} />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        expect(screen.queryAllByText('teamLeadData')).toHaveLength(0);
        expect(screen.queryAllByText('userData')).toHaveLength(0);
        expect(screen.queryAllByText('otherUser')).toHaveLength(0);
    });
});
