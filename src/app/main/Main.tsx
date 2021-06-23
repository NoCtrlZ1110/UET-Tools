import React from 'react';
import { useHistory } from 'react-router-dom';
import { universities } from '../../const/Universities';

const Main: React.FC = () => {
  const { push } = useHistory();
  return (
    <div className='main'>
      {universities.map((u) => (
        <div
          className='university d-flex'
          style={{ backgroundColor: u.color }}
          onClick={() => {
            push(`/${u.acronym}`);
          }}
        >
          <div className='university-name ml-3'>{u.name}</div>
          <img
            className='logo-watermark'
            src={`/logo/${u.acronym}.png`}
            alt={`logo-${u.acronym}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Main;
