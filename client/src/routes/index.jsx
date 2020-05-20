import React from 'react';
import cookie from 'react-cookies';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NotFound, Home } from '../pages';
import { PrivateLayout, PublicLayout } from '../layouts';
import LandingPage from '../layouts/public/footer';
import publicRoutes from './public';
import privateRoutes from './private';

const Routes = () => {
  const getComponenet = () => {
    if (cookie.load('x-auth-token')) {
      return (
        <PrivateLayout>
          <Home />
        </PrivateLayout>
      );
    }
    return (
      <PublicLayout>
        <LandingPage />
      </PublicLayout>
    );
  };
  return (
    <>
      <BrowserRouter>
        <Switch>
          {publicRoutes()}
          {privateRoutes()}
          <Route exact path="/" component={getComponenet} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
