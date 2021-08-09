import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChromeMessage, Sender, MessageType } from '../types';

const Header: React.FC = () => {
  // const [url, setUrl] = useState<string>('');
  const [snowing, setSnowing] = useState(false);
  const click = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      data: { snowing: !snowing },
      type: MessageType.TOGGLE_SNOW,
    };

    chrome.runtime?.sendMessage(message, (response) => {});
  };
  useEffect(() => {
    chrome.runtime?.sendMessage({ type: 'REQ_SNOW_STATUS' });
    chrome.runtime?.onMessage.addListener((message: ChromeMessage) => {
      switch (message.type) {
        case MessageType.SNOW_STATUS:
          // console.log('react received SNOW_STATUS', message);
          setSnowing(message.data.snowing);
          break;
        default:
          break;
      }
    });
  }, []);

  // useEffect(() => {
  //   const queryInfo = { active: true, lastFocusedWindow: true };
  //   chrome.tabs &&
  //     chrome.tabs.query(queryInfo, (tabs) => {
  //       const url = tabs[0].url;
  //       setUrl(url as string);
  //     });
  // }, []);

  return (
    <div className='header'>
      <div className='d-flex align-items-center'>
        <Link className='tool-name' to='/'>
          UET TOOLS
        </Link>
        <Button className='ml-auto' size='sm' variant='outline' onClick={click}>
          {snowing ? '🥶' : '❆'}
        </Button>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
