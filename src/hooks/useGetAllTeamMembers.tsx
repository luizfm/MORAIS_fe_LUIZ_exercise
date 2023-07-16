import {useState} from 'react';
import {useMutation} from 'react-query';
import {getUserData} from 'services/users';
import {UserData} from 'types';

export const useGetAllTeamMembers = (teamMembersIds: string[]) => {
    const [teamMembers, setTeamMembers] = useState<UserData[]>([]);
    const mutation = useMutation(
        () =>
            Promise.all(
                teamMembersIds.map(async id => {
                    const user = await getUserData(id);
                    return user;
                })
            ),
        {
            onSuccess: data => {
                setTeamMembers(data);
            },
        }
    );

    return {
        teamMembers,
        mutation,
    };
};
