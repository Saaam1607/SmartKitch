import React from 'react';


interface ServedIconProps {
  isServed: boolean;
}

export default function ServedIcon({ isServed } : ServedIconProps ) {
  return (
    <div
      className='rounded-pill'
      style={{
        width: '12px',
        height: '12px',
        backgroundColor: isServed ? 'rgb(54, 194, 65)' : 'red',
        border: isServed ? 'rgb(35, 162, 46)' : '2px solid rgba(188, 0, 0, 1)'
      }}
    />
  );
}