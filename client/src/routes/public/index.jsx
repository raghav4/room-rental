import React from 'react';

import PublicRoute from './publicRoute';
import { LogIn, SignUp } from '../../pages';

const publicRoutes = () => {
  const routes = [
    { path: '/login', component: <LogIn /> },
    { path: '/signup', component: <SignUp /> },
  ];
  return routes.map((route) => (
    <PublicRoute
      exact
      path={route.path}
      key={route.path}
      component={route.component}
    />
  ));
};

export default publicRoutes;
