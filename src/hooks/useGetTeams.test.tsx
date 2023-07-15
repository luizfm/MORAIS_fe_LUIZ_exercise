import {renderHook, waitFor} from '@testing-library/react';
import {wrapper} from 'tests/utils/createWrapper';
import {getData} from 'api';
import {useGetTeams} from './useGetTeams';

jest.mock('api', () => ({
    getData: jest.fn(),
}));

describe('useGetTeams | hook | integration test', () => {
    it('should render', async () => {
        const teams = [
            {
                id: '7676a4bf-adfe-415c-941b-1739af07039b',
                name: 'Ordinary Coral Lynx',
            },
            {
                id: '5071b4fc-43f2-47a2-8403-e934dc270606',
                name: 'Weekly Peach Wildebeest',
            },
            {
                id: '7cf0d32d-036f-40b6-86ea-2473d4ccaecd',
                name: 'Surrounding Gold Pheasant',
            },
            {
                id: 'de01d852-c519-4c54-b95a-80c5b6fa0157',
                name: 'Feminist Maroon Gorilla',
            },
        ];
        (getData as jest.Mock).mockReturnValueOnce(teams);
        const {result} = renderHook(() => useGetTeams(), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.data).toBe(teams);
    });
});
