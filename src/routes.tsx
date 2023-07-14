import React from 'react';
import TeamOverview from 'pages/TeamOverview';
import Teams from 'pages/Teams';
import UserOverview from 'pages/UserOverview';
import {createBrowserRouter} from 'react-router-dom';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Teams />,
  },
  {
    path: '/team/:teamId',
    element: <TeamOverview />,
  },
  {
    path: '/user/:useId',
    element: <UserOverview />,
  },
]);
