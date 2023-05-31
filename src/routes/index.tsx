import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { RouteLayout } from '../Components';
import WithHeader from '../Layouts/WithHeader';
import { Home, Page404 ,Clients,ClientsLogs,Money,Vehicles} from '../Pages';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <RouteLayout path="/home" exact component={Home} layout={WithHeader} />
        <RouteLayout path="/clients" exact component={Clients} layout={WithHeader} />
        <RouteLayout path="/clients/logs" exact component={ClientsLogs} layout={WithHeader} />
        <RouteLayout path="/money" exact component={Money} layout={WithHeader} />
        <RouteLayout path="/veiculos" exact component={Vehicles} layout={WithHeader} />
        <RouteLayout path="*"  exact component={Page404} layout={WithHeader} isError404 />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
