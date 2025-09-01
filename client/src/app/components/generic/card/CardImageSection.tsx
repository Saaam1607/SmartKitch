import React, { useState, useEffect } from 'react';

import CardImage from './CardImage';

import ColorThief from 'colorthief';

interface CardImageSectionProps {
  getImage?: () => Promise<string> | undefined;
  updateImage?: (image: string) => void;
  isEditing: boolean;
}

export default function CardImageSection({ getImage, updateImage, isEditing }: CardImageSectionProps) {

  const [imageUrl, setImageUrl] = useState<string>("")

  const [mainColor, setMainColor] = useState<[number, number, number] | null>(null);
  const [isLgUp, setIsLgUp] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadImage = async () => {
      if (getImage) {
        const image = await getImage()
        if (image)
          if (isMounted) setImageUrl(image);
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [getImage]);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageUrl;

      img.onload = () => {
        const colorThief = new ColorThief();
        const color: [number, number, number] = colorThief.getColor(img);
        setMainColor(color);
      };
    }
  }, [imageUrl]);

  useEffect(() => {
    const handleResize = () => setIsLgUp(window.innerWidth >= 992);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const background =
    mainColor && mainColor.length > 0
      ? isLgUp
        ? `linear-gradient(to right, rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}) 75%, transparent 25%)`
        : `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`
      : "#ffffff";

  return (
    <div
      className="d-flex justify-content-center align-items-center p-3"
      style={{
        minHeight: '100%',
        background: background,
        transition: "opacity 0.5s ease",
        borderTopLeftRadius: isLgUp ? "15px" : "0",
        borderBottomLeftRadius: isLgUp ? "15px" : "0",
      }}
    >
      <div style={{borderRadius: "15px"}}>
        <CardImage
          imageUrl={imageUrl}
          size={175}
          borderSize={8}
          updateImage={updateImage}
          isEditing={isEditing}
        />
      </div> 
    </div>
  );
}