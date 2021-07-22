import React from 'react';
import './App.css';
import './index.scss';
import Header from './layout/Header';
import { Route, Switch } from 'react-router-dom';
import { universities } from './const/Universities';
import Main from './app/main/Main';
import UET from './app/main/UET/UET';

const App: React.FC = () => {
  return (
    <div className='vnu-tools'>
      <Header />
      <Switch>
        <Route path='/UET' component={UET} />
        {universities.map((u) => (
          <Route path={`/${u.acronym}`}>
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

export default App;
