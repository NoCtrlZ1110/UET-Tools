import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {
  addMessageListener,
  newMessage,
  sendMessage,
} from '../../../chrome/utils';
import { NewsDetailModel } from '../../../models/NewsModel';
import { MessageType, Sender } from '../../../types';
import Splash from '../components/Splash';

const NewsDetails: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<NewsDetailModel>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = location.search.replace('?url=', '');
    sendMessage(
      newMessage(Sender.React, { url }, MessageType.REQ_UET_NEWS_DETAILS)
    );
    addMessageListener(MessageType.RES_UET_NEWS_DETAILS, (m) => {
      setData(m.data);
      setIsLoading(false);
    });
  }, [location]);

  return (
    <div className='news-details'>
      {isLoading ? (
        <Splash />
      ) : (
        <>
          <div className='title'>{data?.title}</div>
          <hr />
          <div className='content'>{data?.content}</div>
          <hr />
          <div className='metadata'>
            {data?.metadata.author} - {data?.metadata.date} -{' '}
            {data?.metadata.tag.concat(' | ')} - {data?.metadata.views}{' '}
          </div>
          <hr />
          <div className='refers'>
            {data?.refers.map((r) => (
              <div onClick={() => window.open(r.url, '_blank')}>{r.title}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsDetails;
