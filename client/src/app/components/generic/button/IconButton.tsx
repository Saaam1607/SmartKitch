import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import * as LucideIcons from "lucide-react";

import '../../../styles/iconButton.css';

type IconButtonProps = {
  iconName: string;
  color: string;
  outline: boolean;
  title: string;
  canClick?: boolean;
  onClick: () => void;
};

export default function IconButton({
  iconName,
  color,
  outline,
  title,
  canClick = true,
  onClick,
}: IconButtonProps) {

  const LucideIcon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType | undefined;
  const [isHovered, setIsHovered] = useState(false);

  const stylesByState = {
    normal: {
      background: outline ? "transparent" : color,
      text: outline ? color : "white",
    },
    hover: {
      background: outline ? color : "transparent",
      text: outline ? "white" : color,
    },
  };

  const currentStyle = isHovered ? stylesByState.hover : stylesByState.normal;

  const buttonStyle: React.CSSProperties = {
    borderRadius: '10px',
    color: currentStyle.text,
    backgroundColor: currentStyle.background,
    border: `1px solid ${color}`,
    cursor: canClick ? "pointer" : "not-allowed",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s",
  };

  return (
    <Button
      className="icon-button d-flex align-items-center justify-content-center"
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={canClick ? onClick : undefined}
      title={title}
    >
      {LucideIcon ? <LucideIcon /> : null}
    </Button>
  );
}
