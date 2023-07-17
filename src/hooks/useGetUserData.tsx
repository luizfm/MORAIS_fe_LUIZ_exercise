import {useQuery} from 'react-query';
import {getUserData} from 'services/users';
import {UserData} from 'types';

export const useGetUserData = (userId: string, enabled = true) => {
    return useQuery<UserData>(['userData', userId], () => getUserData(userId), {
        enabled,
    });
};
