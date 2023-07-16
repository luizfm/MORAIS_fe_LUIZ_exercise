import {act, renderHook} from '@testing-library/react';
import {wrapper} from 'utils/tests/createWrapper';
import {getData} from 'api';
import {useGetAllTeamMembers} from './useGetAllTeamMembers';

const mockMutate = jest.fn();

jest.mock('react-query', () => ({
    ...jest.requireActual('react-query'),
    useMutation: () => ({
        mutate: mockMutate,
        isSuccess: true,
    }),
}));

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
        const {result} = renderHook(() => useGetAllTeamMembers(['1', '2']), {
            wrapper,
        });

        act(() => {
            result.current.mutation.mutate();
        });

        expect(mockMutate).toHaveBeenCalled();
    });
});
