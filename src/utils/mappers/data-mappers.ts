import {ListItem, Teams, UserData} from 'types';

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
