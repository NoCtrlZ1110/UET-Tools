import React from 'react';
import { universities } from '../../const/Universities';

const Main: React.FC = () => {
  return (
    <div className='main'>
      {universities.map((u) => (
        <div className='university d-flex' style={{ backgroundColor: u.color }}>
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
