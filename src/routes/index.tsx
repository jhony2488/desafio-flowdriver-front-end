import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { RouteLayout } from '../Components';
import WithHeader from '../Layouts/WithHeader';
import { Home, Page404 } from '../Pages';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <RouteLayout path="/home" exact component={Home} layout={WithHeader} />
        <RouteLayout path="*"  exact component={Page404} layout={WithHeader} isError404 />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
