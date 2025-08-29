'use client';

import React, { useState, useEffect } from 'react';

import Nav from 'react-bootstrap/Nav';

import { useThemeStyles } from '../../../hooks/useThemeStyles';

interface MenuItemProps {
  label: string;
  iconComponent: React.ComponentType<{ size?: number; color?: string }>;
  selectedRegistry: string;
  isExpanded: boolean;
}

export default function MenuItem({
  label,
  iconComponent: Icon,
  selectedRegistry,
  isExpanded
} : MenuItemProps) {

  const key = label.toLowerCase()

  const [isActive, setIsActive] = useState<boolean>(selectedRegistry === key);

  useEffect(() => {
    setIsActive(selectedRegistry === key);
  }, [key, selectedRegistry])

  const { bgColor, textColor, toolbarBg, toolbarTextColor } = useThemeStyles();

  return (
    <Nav.Link
      eventKey={key}
      className={`d-flex w-100 m-0 p-0 px-2 py-1 menu-button ${isActive && " current"}`}
      style={{
        borderRadius: '10px',
        color: isActive ? 'white' : toolbarTextColor,
      }}
    >
      <div className={`d-flex align-items-center ${isExpanded && "gap-2"}`}>
        <Icon size={20} color={toolbarTextColor} />
        {isExpanded && (
          <p>{label}</p>
        )}
      </div>
    </Nav.Link>
  );
}
