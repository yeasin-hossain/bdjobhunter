/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { isExpired } from 'react-jwt';
import { Redirect, Route } from 'react-router-dom';
import { getFromStorage } from '../util/localStore';

function PrivateRoutes({ children, ...rest }) {
  const user = getFromStorage();
  const isMyTokenExpired = isExpired(user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        // eslint-disable-next-line no-constant-condition
        !isMyTokenExpired ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoutes;
