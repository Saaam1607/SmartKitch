import React from 'react';

import { BounceLoader } from 'react-spinners'

export default function Spinner() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.7)',
        fontSize: '1.5rem',
        zIndex: 9998,
      }}
    >
      <BounceLoader
        color="rgb(219, 123, 33)"
        size={60}
        speedMultiplier={1.5}
      />
    </div>
  );
}
