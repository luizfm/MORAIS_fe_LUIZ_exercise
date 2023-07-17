import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {trackEvent} from 'track';
import List from '..';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

jest.mock('track', () => ({
    trackEvent: jest.fn(),
}));

const mockedItemsList = [
    {
        id: '1',
        columns: [
            {
                key: 'columnKey1',
                value: 'columnValue1',
            },
        ],
        navigationProps: {
            id: '1',
            name: 'John Doe',
        },
    },
];

describe('List | component | unit test', () => {
    it('should render spinner and not render items when it is loading', () => {
        render(<List isLoading items={mockedItemsList} />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        expect(screen.queryByTestId('cardContainer')).not.toBeInTheDocument();
    });

    it('should not render spinner and render items when it is not loading', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
        ];
        render(<List isLoading={false} items={items} />);

        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-1')).toBeInTheDocument();
    });

    it('should render multiple card when multiple items', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
            {
                id: '2',
                columns: [
                    {
                        key: 'columnKey2',
                        value: 'columnValue2',
                    },
                ],
            },
        ];
        render(<List isLoading={false} items={items} />);

        expect(screen.getByTestId('cardContainer-1')).toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-2')).toBeInTheDocument();
    });

    it('should call track event when card is clicked', async () => {
        render(<List isLoading={false} items={mockedItemsList} />);

        const card = screen.getByTestId('cardContainer-1');
        fireEvent.click(card);

        expect(trackEvent).toHaveBeenCalledWith('Team Card Click', {id: '1'});
    });
});
