import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {checkLocalStorage} from './checkLocalStorage'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={props => (
    checkLocalStorage() !== null ? (
      <Component { ...props } />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}
      />
    )
  )} />
);

export default PrivateRoute;
