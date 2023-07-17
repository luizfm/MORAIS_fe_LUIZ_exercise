import {getData} from 'api';
import {UserData} from 'types';

export const getUserData = (userId: string): Promise<UserData> => {
    return getData(`/users/${userId}`);
};