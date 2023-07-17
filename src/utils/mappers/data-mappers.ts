import {Teams, UserData} from 'types';
import {includesSearchValue, isSearchedUser} from 'utils/filters/user-filters';

type MapTeamProps = {
  teams?: Teams[];
  searchValue: string;
}

type MapTeamLeadProps = {
  user?: UserData;
  searchValue: string;
}

type MapUsersProps = {
  users: UserData[];
  searchValue: string;
}

export const mapTeamLead = ({user, searchValue}: MapTeamLeadProps) => {
    if(!isSearchedUser(searchValue, user)) {
      return undefined;
    }

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

export const mapTeams = ({teams, searchValue}: MapTeamProps) => {
  return teams?.reduce((accumulator, team) => {
    if(!includesSearchValue(searchValue, team.name)) {
      return accumulator;
    }
    
    const columns = [
      {
          key: 'Name',
          value: team.name,
      },
    ];
    accumulator.push({
        id: team.id,
        url: `/team/${team.id}`,
        columns,
        navigationProps: team,
    });

    return accumulator;
  }, []);
};
