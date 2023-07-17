import {renderHook, waitFor} from '@testing-library/react';
import {createWrapper} from 'utils/tests/createWrapper';
import {getData} from 'api';
import {useGetTeamOverview} from './useGetTeamOverview';

jest.mock('api', () => ({
    getData: jest.fn(),
}));

const mockedTeamOverview = {
    id: '1',
    teamLeadId: '2',
    teamMemberIds: ['1', '2', '3'],
};

describe('useGetTeamOverview | hook | integration test', () => {
    it('should not trigger hook when enabled is false', async () => {
        (getData as jest.Mock).mockReturnValueOnce(mockedTeamOverview);
        const {result} = renderHook(() => useGetTeamOverview('1'), {
            wrapper: createWrapper({}),
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.data).toBe(undefined);
    });

    it('should render team overview with provided team id', async () => {
        (getData as jest.Mock).mockReturnValueOnce(mockedTeamOverview);
        const {result} = renderHook(() => useGetTeamOverview('1', true), {
            wrapper: createWrapper({}),
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.data).toBe(mockedTeamOverview);
    });
});
