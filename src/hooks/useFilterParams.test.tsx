import {renderHook} from '@testing-library/react';
import {createWrapper} from 'utils/tests/createWrapper';
import {useLocation} from 'react-router-dom';
import {useFilterParams} from './useFilterParams';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
    useLocation: jest.fn(),
}));

describe('useFilterParams | hook | test', () => {
    it('should be able to get param info if exists', () => {
        (useLocation as jest.Mock).mockReturnValue({
            search: '?name=test',
        });

        const {result} = renderHook(() => useFilterParams(), {
            wrapper: createWrapper({path: '/'}),
        });

        const value = result.current.getParam('name');
        expect(value).toBe('test');
    });

    it('should call navigate with provided url params', () => {
        (useLocation as jest.Mock).mockReturnValue({
            search: '',
        });
        const {result} = renderHook(() => useFilterParams(), {
            wrapper: createWrapper({path: '/'}),
        });

        result.current.setUrlParams('bob', 'name');
        expect(mockedUseNavigate).toHaveBeenCalledWith('/?name=bob', {replace: true});
    });

    it('should call navigate with provided url params', async () => {
        (useLocation as jest.Mock).mockReturnValue({
            search: '',
        });
        const {result} = renderHook(() => useFilterParams(), {
            wrapper: createWrapper({path: '/teams'}),
        });

        result.current.setUrlParams('john', 'name');

        expect(mockedUseNavigate).toHaveBeenCalledWith('/?name=john', {replace: true});
    });

    it('should call navigate with updated url params', () => {
        (useLocation as jest.Mock).mockReturnValue({
            search: '?name=mary',
        });
        const {result} = renderHook(() => useFilterParams(), {
            wrapper: createWrapper({path: '/teams'}),
        });

        result.current.setUrlParams('john', 'name');

        expect(mockedUseNavigate).toHaveBeenCalledWith('/?name=john', {replace: true});
    });

    it('should call navigate with updated (deleted one) url params', () => {
        (useLocation as jest.Mock).mockReturnValue({
            search: '?name=john',
        });
        const {result} = renderHook(() => useFilterParams(), {
            wrapper: createWrapper({path: '/teams'}),
        });

        result.current.setUrlParams('', 'name');

        expect(mockedUseNavigate).toHaveBeenCalledWith('/', {replace: true});
    });

    it('should not call navigate if there is no search value provided', () => {
        (useLocation as jest.Mock).mockReturnValue({
            search: '',
        });
        const {result} = renderHook(() => useFilterParams(), {
            wrapper: createWrapper({path: '/teams'}),
        });

        result.current.setUrlParams('', 'name');

        expect(mockedUseNavigate).not.toHaveBeenCalled();
    });
});
