import React, { useState, useEffect } from 'react';

import ColorThief from 'colorthief';

interface CardImageContainerProps {
  image: string;
  children: React.ReactNode;
}

export default function CardImageContainer({ image, children }: CardImageContainerProps) {

  const [mainColor, setMainColor] = useState<[number, number, number] | null>(null);
  const [isLgUp, setIsLgUp] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = image;

    img.onload = () => {
      const colorThief = new ColorThief();
      const color: [number, number, number] = colorThief.getColor(img);
      setMainColor(color);
    };
  }, [image]);
  

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
        opacity: mainColor && mainColor.length > 0 ? 1 : 0,
        borderTopLeftRadius: isLgUp ? "15px" : "0",
        borderBottomLeftRadius: isLgUp ? "15px" : "0",
      }}
    >
      <div style={{borderRadius: "15px"}}>
        {children}
      </div> 
    </div>
  );
}