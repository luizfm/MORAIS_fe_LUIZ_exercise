import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {useGetUserData} from 'hooks/useGetUserData';
import {UserCard} from '..';

const mockedUseNavigate = jest.fn();

jest.mock('hooks/useGetUserData');
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockedUseNavigate,
}));

const id = '1';
const userData = {
    id,
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'John Doe',
    location: 'Brazil',
    avatar: '',
};

describe('UserCard | component | unit test', () => {
    it('should render user card with provided id', () => {
        (useGetUserData as jest.Mock).mockReturnValue({
            data: userData,
            isLoading: false,
        });

        render(<UserCard searchValue="" id={id} />);

        expect(screen.getByTestId(`userCardContainer-${id}`)).toBeInTheDocument();
        expect(screen.getAllByText(/John Doe/i)).toHaveLength(2);
        expect(screen.getByText(/Brazil/i)).toBeInTheDocument();
    });

    it('should not render card when fetch information is loading', () => {
        (useGetUserData as jest.Mock).mockReturnValue({
            data: {},
            isLoading: true,
        });

        render(<UserCard searchValue="" id={id} />);

        expect(screen.queryAllByTestId(`userCardContainer-${id}`)).toHaveLength(0);
    });

    it('should call navigate method when card is clicked', () => {
        (useGetUserData as jest.Mock).mockReturnValue({
            data: userData,
            isLoading: false,
        });

        render(<UserCard searchValue="" id={id} hasNavigation />);

        const card = screen.getByTestId(`userCardContainer-${id}`);
        fireEvent.click(card);

        expect(mockedUseNavigate).toHaveBeenCalledWith(`/user/${id}`, {state: userData});
    });

    it('should not call navigate method if hasNavigation prop is not provided', () => {
        (useGetUserData as jest.Mock).mockReturnValue({
            data: userData,
            isLoading: false,
        });

        render(<UserCard searchValue="" id={id} />);

        const card = screen.getByTestId(`userCardContainer-${id}`);
        fireEvent.click(card);

        expect(mockedUseNavigate).not.toHaveBeenCalled();
    });

    it('should not render component if provided searchValue does not match any user name data', () => {
        (useGetUserData as jest.Mock).mockReturnValue({
            data: userData,
            isLoading: false,
            isSuccess: true,
        });

        render(<UserCard searchValue="thisValueDoesNotExist" id={id} />);

        expect(screen.queryByTestId(`userCardContainer-${id}`)).not.toBeInTheDocument();
    });

    it('should render component if searchValue is not provided', () => {
        (useGetUserData as jest.Mock).mockReturnValue({
            data: userData,
            isLoading: false,
            isSuccess: true,
        });

        render(<UserCard id={id} />);

        expect(screen.getByTestId(`userCardContainer-${id}`)).toBeInTheDocument();
    });
});
