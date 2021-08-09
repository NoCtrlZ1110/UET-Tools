import React from 'react';

const Splash: React.FC<{ color?: string }> = ({ color }) => {
  return (
    <div className='text-center p-5 m-5' style={{ color: color }}>
      <div className='spinner-border m-5'>
        <span className='sr-only'>Đang tải dữ liệu ...</span>
      </div>
      <h4>Đang tải dữ liệu ...</h4>
    </div>
  );
};

export default Splash;
