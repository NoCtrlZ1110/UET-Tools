import React from 'react';
import './App.css';
import './index.scss';
import Header from './layout/Header';
import Routes from './Routes';

const App: React.FC = () => {
  return (
    <div className='uet-tools'>
      <Header />
      <Routes />
    </div>
  );
};

export default App;
