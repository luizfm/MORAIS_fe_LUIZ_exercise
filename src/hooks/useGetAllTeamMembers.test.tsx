import {renderHook, waitFor} from '@testing-library/react';
import {wrapper} from 'utils/tests/createWrapper';
import {getData} from 'api';
import {useGetAllTeamMembers} from './useGetAllTeamMembers';

jest.mock('api', () => ({
    getData: jest.fn(),
}));

const userData = {
    id: '371d2ee8-cdf4-48cf-9ddb-04798b79ad9e',
    firstName: 'Randy',
    lastName: 'Funk',
    displayName: 'randyFunk',
    avatarUrl: 'https://cdn.fakercloud.com/avatars/thomasschrijer_128.jpg',
    location: 'West Ericashire',
};

describe('useGetAllTeamMembers | hook | integration test', () => {
    it('should not trigger hook when enabled is false', async () => {
        (getData as jest.Mock).mockReturnValueOnce(userData);
        const {result} = renderHook(
            () =>
                useGetAllTeamMembers({teamLeadId: '1', teamMemberIds: ['1', '2'], searchValue: ''}),
            {
                wrapper,
            }
        );

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const {teamLead, teamMembers} = result.current.team;

        expect(teamLead).toStrictEqual(userData);
        expect(teamMembers).toHaveLength(2);
    });
});
