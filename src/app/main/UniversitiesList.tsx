import React from 'react';
import { useHistory } from 'react-router-dom';
import { universities } from '../../const/universities';

const UniversitiesList: React.FC = () => {
  const { push } = useHistory();
  return (
    <div className='main'>
      {universities.map((u, i) => (
        <div
          className='university d-flex'
          style={{ backgroundColor: u.color }}
          onClick={() => {
            push(`/${u.acronym}`);
          }}
          key={i}
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

export default UniversitiesList;
