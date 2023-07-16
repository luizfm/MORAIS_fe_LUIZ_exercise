import {UserData} from 'types';

const includesSearchValue = (searchValue: string, value: string) => {
  return value.toLowerCase().includes(searchValue.toLowerCase());
};

export const isSearchedUser = (searchValue: string, data: UserData) => {
  if(!searchValue) {
    return true;
  }

  const firstNameIncludesValue = includesSearchValue(searchValue, data.firstName);
  const lastNameIncludesValue = includesSearchValue(searchValue, data.lastName);
  const displayName = includesSearchValue(searchValue, data.displayName);

  return firstNameIncludesValue || lastNameIncludesValue || displayName;
};