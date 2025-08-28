'use client';

import React, { useState, useEffect } from 'react';

import Nav from 'react-bootstrap/Nav';

import { useThemeStyles } from '../../hooks/useThemeStyles';

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
    <Nav.Item
      className="d-flex m-0 p-0 px-2 w-100"
      style={{
        borderRadius: '10px',
        backgroundColor: isActive ? 'rgba(214, 244, 255, 0.2)' : 'transparent',
        color: isActive ? 'white' : toolbarTextColor,
      }}
    >
      <Nav.Link eventKey={key} className={`m-0 p-0 py-1`} style={{ color: 'inherit' }}>
        <div className="d-flex gap-2 align-items-center">
          <Icon size={20} color={toolbarTextColor} />
          {isExpanded && (
            <p>{label}</p>
          )}
        </div>
      </Nav.Link>
    </Nav.Item>
  );
}
