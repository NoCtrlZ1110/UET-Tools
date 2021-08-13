import React from 'react';
import { Badge } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { NewsModel } from '../../../models/NewsModel';

const NewsTile: React.FC<{ news: NewsModel }> = ({ news }) => {
  const { push } = useHistory();

  return (
    <div
      className='news-tile'
      onClick={() => push(`/UET/details?url=${news.url}`)}
    >
      <div className='overlay' />
      <div className='excerpt'>{news.excerpt.trim()}</div>

      <div className='inner-wrap'>
        <div className='title'>{news.title}</div>
        <hr />
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <Badge className='mr-auto' variant='light'>
              {news.tag}
            </Badge>
          </div>
          <span className='ml-auto'>
            {news.date} - {news.month}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsTile;
