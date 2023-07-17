import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {createWrapper} from 'utils/tests/createWrapper';
import Card from '..';

const mockUseNavigate = jest.fn();
const mockedTrackEvent = jest.fn();

jest.mock('track', () => ({
    trackEvent: () => mockedTrackEvent,
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('Card', () => {
    it('should render card with single column', () => {
        const columns = [{key: 'columnKey', value: 'columnValue'}];
        render(<Card columns={columns} />, {
            wrapper: createWrapper({}),
        });

        expect(screen.getByText('columnKey')).toBeInTheDocument();
        expect(screen.getByText('columnValue')).toBeInTheDocument();
    });

    it('should render card with multiple columns', () => {
        const columns = [
            {key: 'columnKey1', value: 'columnValue1'},
            {key: 'columnKey2', value: 'columnValue2'},
            {key: 'columnKey3', value: 'columnValue3'},
            {key: 'columnKey4', value: ''},
        ];
        render(<Card columns={columns} />, {
            wrapper: createWrapper({}),
        });

        expect(screen.getByText('columnKey1')).toBeInTheDocument();
        expect(screen.getByText('columnValue1')).toBeInTheDocument();
        expect(screen.getByText('columnKey2')).toBeInTheDocument();
        expect(screen.getByText('columnValue2')).toBeInTheDocument();
        expect(screen.getByText('columnKey3')).toBeInTheDocument();
        expect(screen.getByText('columnValue3')).toBeInTheDocument();
        expect(screen.getByText('columnKey4')).toBeInTheDocument();
    });

    it('should call tracker on card click', async () => {
        render(
            <Card
                columns={[{key: 'columnKey', value: 'columnValue'}]}
                url="/path"
                trackEvent={mockedTrackEvent}
            />,
            {
                wrapper: createWrapper({path: '/path '}),
            }
        );

        fireEvent.click(screen.getByText('columnKey'));

        expect(mockedTrackEvent).toHaveBeenCalled();
    });
});
