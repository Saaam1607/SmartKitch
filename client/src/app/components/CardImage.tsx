import React, { useState } from 'react';

import { Image } from 'lucide-react';

export default function CardImage({ image, isEditing }) {

  return (
    <div className="rounded-start" >
      {image != "" ? (
        <div
          className="rounded-start"
          style={{
            width: '200px',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            pointerEvents: 'none',
          }} 
        >
          <img
            className="rounded-start faded"
            src={image}
            style={{
              width: '200px',
              height: '150px',
              objectFit: 'cover',
            }}
          /> 
        </div>
      ) : (
        <div
          className="rounded-start faded"
          style={{
            width: '200px',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
          }} 
        >
          <Image width={50} height={50} style={{color: "grey"}}/>
        </div>
      )}
    </div>
  );
}