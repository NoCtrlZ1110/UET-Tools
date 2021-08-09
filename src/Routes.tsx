import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { universities } from './const/Universities';
import Main from './app/main/Main';
import UET from './app/main/UET/UET';
import UniversitiesList from './app/main/UniversitiesList';

const Routes: React.FC = () => {
  return (
    <div className='tool-container'>
    <Switch>
      <Route path='/UET' component={UET} />
      <Route path='/universities' component={UniversitiesList} />
      {universities.map((u, i) => (
        <Route path={`/${u.acronym}`} key={i}>
          <div>{u.name}</div>
        </Route>
      ))}
      <Route path='/'>
        <Main />
      </Route>
    </Switch>
    </div>
  );
};

export default Routes;
