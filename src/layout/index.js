import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../pages/common/spinner';
import Header from '../pages/header';
import { privateRoute, publicRoutes } from '../routes';

function Layout() {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Header />
        <Switch>
          {publicRoutes.map((route) => (
            <Route exact key={uuidv4()} path={route.path}>
              <route.component />
            </Route>
          ))}
          {privateRoute.map((route) => (
            <Route exact key={uuidv4()} path={route.path}>
              <route.component />
            </Route>
          ))}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Layout;
