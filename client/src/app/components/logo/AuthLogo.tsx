"use client";

import { ChefHat } from 'lucide-react';


export default function AuthLogo() {
  return (
    <div
      style={{
        marginBottom: '2.5rem',
      }}
    >
      <ChefHat
        size={90}
        strokeWidth={1.25}
        className="p-1 rounded-pill"
        style={{
          backgroundColor: 'rgb(88, 107, 126)',
          border: '4px solid rgb(43, 61, 79)',
          color: 'rgb(43, 61, 79)',
          position: 'absolute',
          top: '-2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}  
      />
    </div>
  );
}
