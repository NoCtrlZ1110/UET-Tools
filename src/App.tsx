import React from 'react';
import './App.css';
import './index.scss';
import Header from './layout/Header';
import { Route, Switch } from 'react-router-dom';
import { universities } from './const/Universities';
import Main from './app/main/Main';

const App: React.FC = () => {
  return (
    <div className='vnu-tools'>
      <Header />
      <Switch>
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
