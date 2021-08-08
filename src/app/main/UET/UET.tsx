import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  addMessageListener,
  newMessage,
  sendMessage,
} from '../../../chrome/utils';
import { MessageType, NewsType, Sender } from '../../../types';
import Splash from '../components/Splash';

const UET: React.FC = () => {
  const [data, setData] = useState<NewsType[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const message = newMessage(Sender.React, {}, MessageType.REQ_UET_NEWS);
    sendMessage(message);
    addMessageListener(MessageType.RES_UET_NEWS, (m) => {
      setData(m.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Splash />
      ) : (
        <div>
          {data &&
            data.map((news, index) => (
              <div key={index}>
                <div>
                  <img src={news.thumbnail} alt='thumbnail' />
                </div>
                <div>
                  {news.date} - {news.month}
                </div>
                <div>{news.title}</div>
                <div>{news.excerpt}</div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default UET;
