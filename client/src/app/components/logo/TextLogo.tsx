"use client";

import '../../styles/logo.css'

type TextLogoProps = {
  color: string;
  size: number;
};

export default function TextLogo({ color, size }: TextLogoProps) {
  return (
    <h4
      className="logo"
      style={{ 
        color: color,
        fontSize: `${size}px`
        
      }}
    >
      SmartKitch
    </h4>
  );
}
