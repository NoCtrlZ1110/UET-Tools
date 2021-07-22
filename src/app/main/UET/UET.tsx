import React, { useEffect, useState } from 'react';
import { ChromeMessage, MessageType, Sender } from '../../../types';

const UET: React.FC = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const message: ChromeMessage = {
      from: Sender.React,
      data: {},
      type: MessageType.REQ_UET_NEWS,
    };

    chrome.runtime.sendMessage(message);
    chrome.runtime.onMessage.addListener((m: ChromeMessage) => {
      switch (m.type) {
        case MessageType.RES_UET_NEWS:
          setData(m.data);
          console.log('m', m);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <div>
      <div>UET functions here</div>
      {data && <div dangerouslySetInnerHTML={{ __html: data }}></div>}
    </div>
  );
};

export default UET;
