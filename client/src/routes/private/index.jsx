import React from 'react';
import PrivateRoute from './privateRoute';
import {
  Home,
  AddRoom,
  RoomDetails,
  AddBooking,
  DeleteRoom,
  UpdateRoom,
} from '../../pages';
import LogOut from './logout';

const privateRoutes = () => {
  const routes = [
    { path: '/room/new', component: <AddRoom /> },
    { path: '/room/book', component: <AddBooking /> },
    { path: '/room/details', component: <RoomDetails /> },
    { path: '/room/delete', component: <DeleteRoom /> },
    { path: '/room/update', component: <UpdateRoom /> },
    { path: '/logout', component: <LogOut /> },
    { path: '/', component: <Home /> },
  ];

  return routes.map((route) => (
    <PrivateRoute
      exact
      path={route.path}
      key={route.path}
      component={route.component}
    />
  ));
};

export default privateRoutes;
