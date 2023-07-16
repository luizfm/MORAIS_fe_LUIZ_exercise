import React from 'react';
import {render, screen} from '@testing-library/react';
import {useGetAllTeamMembers} from 'hooks/useGetAllTeamMembers';
import TeamMembersCardList from '..';

jest.mock('hooks/useGetAllTeamMembers');

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

const mutationMock = jest.fn();

const teamMembersMock = [
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
];

describe('TeamMembersCardList | component | unit test', () => {
    it('should render team members card', () => {
        (useGetAllTeamMembers as jest.Mock).mockReturnValue({
            teamMembers: teamMembersMock,
            mutation: {
                mutate: jest.fn(),
            },
        });

        render(<TeamMembersCardList teamMemberIds={['2', '3']} />);

        expect(screen.getByText('userData')).toBeInTheDocument();
        expect(screen.getByText('otherUser')).toBeInTheDocument();
    });

    it('should return display any member if there are no provided ids', () => {
        (useGetAllTeamMembers as jest.Mock).mockReturnValue({
            teamMembers: [],
            mutation: {
                mutate: jest.fn(),
            },
        });

        render(<TeamMembersCardList teamMemberIds={[]} />);

        expect(screen.queryAllByText('userData')).toHaveLength(0);
        expect(screen.queryAllByText('otherUser')).toHaveLength(0);
    });

    it('should call mutation mutate if there are provided ids but no fetched results', () => {
        (useGetAllTeamMembers as jest.Mock).mockReturnValue({
            teamMembers: [],
            mutation: {
                mutate: mutationMock,
            },
        });

        render(<TeamMembersCardList teamMemberIds={['1', '2']} />);

        expect(screen.queryAllByText('userData')).toHaveLength(0);
        expect(screen.queryAllByText('otherUser')).toHaveLength(0);
        expect(mutationMock).toHaveBeenCalled();
    });

    it('should return a list of filtered users based on search value', () => {
        (useGetAllTeamMembers as jest.Mock).mockReturnValue({
            teamMembers: teamMembersMock,
            mutation: {
                mutate: jest.fn(),
            },
        });

        render(<TeamMembersCardList teamMemberIds={['2', '3']} searchValue="otherUser" />);

        expect(screen.queryAllByText('userData')).toHaveLength(0);
        expect(screen.getByText('otherUser')).toBeInTheDocument();
    });

    it('should not render any user if searched value does not match any name', () => {
        (useGetAllTeamMembers as jest.Mock).mockReturnValue({
            teamMembers: teamMembersMock,
            mutation: {
                mutate: jest.fn(),
            },
        });

        render(
            <TeamMembersCardList
                teamMemberIds={['2', '3']}
                searchValue="otherUserThatDoesNotExist"
            />
        );

        expect(screen.queryAllByText('userData')).toHaveLength(0);
        expect(screen.queryAllByText('otherUser')).toHaveLength(0);
    });
});
