import {renderHook, waitFor} from '@testing-library/react';
import {wrapper} from 'tests/utils/createWrapper';
import {getData} from 'api';
import {useGetUserData} from './useGetUserData';

jest.mock('api', () => ({
    getData: jest.fn(),
}));

describe('useGetUserData | hook | integration test', () => {
    it('should render', async () => {
        const userData = {
            id: '371d2ee8-cdf4-48cf-9ddb-04798b79ad9e',
            firstName: 'Randy',
            lastName: 'Funk',
            displayName: 'randyFunk',
            avatarUrl: 'https://cdn.fakercloud.com/avatars/thomasschrijer_128.jpg',
            location: 'West Ericashire',
        };
        (getData as jest.Mock).mockReturnValueOnce(userData);
        const {result} = renderHook(() => useGetUserData(userData.id), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.data).toBe(userData);
    });
});
