import {ListItem, Teams, UserData} from 'types';
import {isSearchedUser} from 'utils/filters/user-filters';

export const mapTeamLead = (user?: UserData) => {
    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${user?.firstName} ${user?.lastName}`,
        },
        {
            key: 'Display Name',
            value: user?.displayName,
        },
        {
            key: 'Location',
            value: user?.location,
        },
    ];

    return {
        columns,
        url: `/user/${user?.id}`,
        navigationProps: user,
    };
};

export const mapUser = (user?: UserData) => {
  const columns = [
    {
        key: 'Name',
        value: `${user?.firstName} ${user?.lastName}`,
    },
    {
        key: 'Display Name',
        value: user?.displayName,
    },
    {
        key: 'Location',
        value: user?.location,
    },
  ];
  
  return {
      id: user?.id,
      url: `/user/${user?.id}`,
      columns,
      navigationProps: user,
  };
};

type MapUsersProps = {
  users: UserData[];
  searchValue: string
}

export const mapUsers = ({users, searchValue}: MapUsersProps) => {
  return users?.reduce((accumulator, user) => {
    if(!isSearchedUser(searchValue, user)) {
      return accumulator;
    }

    const columns = [
      {
          key: 'Name',
          value: `${user?.firstName} ${user?.lastName}`,
      },
      {
          key: 'Display Name',
          value: user?.displayName,
      },
      {
          key: 'Location',
          value: user?.location,
      },
    ];

    accumulator.push({
      id: user?.id,
      url: `/user/${user?.id}`,
      columns,
      navigationProps: user,
    });

    return accumulator;

  }, []);
};

export const mapTeams = (teams: Teams[]) => {
  return teams?.map(team => {
      var columns = [
          {
              key: 'Name',
              value: team.name,
          },
      ];
      return {
          id: team.id,
          url: `/team/${team.id}`,
          columns,
          navigationProps: team,
      } as ListItem;
  });
};
