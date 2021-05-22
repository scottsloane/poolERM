import React from 'react';

import Home from './pages/home';
import Customers from './pages/customers'



const Teams = () => {
  return (
    <h1>Teams</h1>
  );
};

const Routes = [
  {
    path: '/',
    sidebarName: 'Home',
    component: Home
  },
  {
    path: '/customers',
    sidebarName: 'Customers',
    component: Customers
  },
  {
    path: '/teams',
    sidebarName: 'Teams',
    component: Teams
  },
];

export default Routes;