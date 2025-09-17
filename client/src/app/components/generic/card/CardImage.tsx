import React from 'react';

import { Image } from 'lucide-react';

interface CardImageProps {
  imageUrl: string;
  isHovered?: boolean;
  borderSize?: number;
  borderRadius?: number;
  updateImage?: (image: string) => void;
  isEditing?: boolean;
}

export default function CardImage({ imageUrl, isHovered, borderSize=0, borderRadius=15, updateImage, isEditing }: CardImageProps) {

  return (
    <>
      {imageUrl ? (
        <img
          alt="Card Image"
          src={imageUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: 'cover',
            borderRadius: `${borderRadius}px`,
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      ) : (
        <div
          className=""
          style={{
            width: "100%",
            height: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            borderRadius: `${borderRadius}px`
          }} 
        >
          <Image width={50} height={50} style={{color: "grey"}}/>
        </div>
      )}
    </>
  );
}