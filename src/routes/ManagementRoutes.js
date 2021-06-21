/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getFromStorage } from '../util/localStore';

function ManagementRoutes({ children, ...rest }) {
  const user = JSON.parse(atob(getFromStorage().split('.')[1]));

  return (
    <Route
      {...rest}
      render={({ location }) =>
        // eslint-disable-next-line no-constant-condition
        user?.role === 'jobPoster' && user?.paid ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default ManagementRoutes;
