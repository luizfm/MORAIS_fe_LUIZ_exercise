import {useQuery} from 'react-query';
import {getUserData} from 'services/users';
import {UserData} from 'types';

export const useGetUserData = (userId: string, enabled = true) => {
    const {data, isLoading, error} = useQuery<UserData>(
        ['userData', userId],
        () => getUserData(userId),
        {
            enabled,
        }
    );

    return {data, isLoading, error};
};
