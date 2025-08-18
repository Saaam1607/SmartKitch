import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import * as LucideIcons from "lucide-react";

import '../../../styles/iconButton.css';

type IconButtonProps = {
  variant: string;
  iconName: string;
  primaryColor?: string;
  secondaryColor?: string;
  title?: string;
  canClick?: boolean;
  onClick: () => void;
};

export default function IconButton({
  variant,
  iconName,
  primaryColor,
  secondaryColor,
  title,
  canClick = true,
  onClick,
}: IconButtonProps) {

  const LucideIcon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType | undefined;
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle: React.CSSProperties = {
    borderRadius: '10px',
    color: isHovered
      ? secondaryColor ?? undefined
      : primaryColor ?? undefined,
    backgroundColor: isHovered
      ? primaryColor ?? undefined
      : secondaryColor ?? undefined,
    // imposta il bordo solo se c'è primaryColor o secondaryColor
    ...(primaryColor || secondaryColor
      ? { border: `1px solid ${isHovered ? (secondaryColor ?? primaryColor) : (primaryColor ?? secondaryColor)}` }
      : {}),
    cursor: canClick ? "pointer" : "not-allowed",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s",
  };

  return (
    <Button
      variant={variant}
      className="icon-button d-flex align-items-center"
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
