import React, { useEffect, useState } from 'react';
import {
  addMessageListener,
  newMessage,
  sendMessage,
} from '../../../chrome/utils';
import { MessageType, NewsModel, Sender } from '../../../types';
import NewsTile from '../components/NewsTile';
import Splash from '../components/Splash';

const UET: React.FC = () => {
  const [data, setData] = useState<NewsModel[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const message = newMessage(Sender.React, {}, MessageType.REQ_UET_NEWS);
    sendMessage(message);
    addMessageListener(MessageType.RES_UET_NEWS, (m) => {
      setData(m.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Splash />
      ) : (
        <div>
          {data &&
            data.map((news, index) => <NewsTile news={news} key={index} />)}
        </div>
      )}
    </div>
  );
};

export default UET;
