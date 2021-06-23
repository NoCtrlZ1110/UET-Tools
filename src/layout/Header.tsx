import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
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
    <div className='header'>
      <Link to='/'>VNU TOOLS</Link>
    </div>
  );
};

export default Header;
