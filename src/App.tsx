import React, { useEffect, useState } from 'react';
import './App.css';
import './index.scss';
import Header from './layout/Header';
import Main from './app/main/Main';

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const url = tabs[0].url;
        setUrl(url as string);
      });
  }, []);
  return (
    <div className='vnu-tools'>
      <Header />
      <Main />
    </div>
  );
};

export default App;
