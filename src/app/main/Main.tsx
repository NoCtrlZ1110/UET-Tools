import React from 'react';
import { universities } from '../../const/Universities';

const Main: React.FC = () => {
  return (
    <div className='main'>
      {universities.map((u) => (
        <div className='university d-flex'>
          <img
            src={`/logo/${u.acronym}.png`}
            alt={`logo-${u.acronym}`}
            width={50}
          />
          <div className='university-name'>{u.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Main;
