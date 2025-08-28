'use client';

import React, { useState } from 'react';

import Nav from 'react-bootstrap/Nav';

import { useThemeStyles } from '../../hooks/useThemeStyles';

interface MenuSectionProps {
  label: string;
  handleSelect: (eventKey: string | null) => void;
  isExpanded: boolean;
  children: React.ReactNode;
}

export default function MenuSection({
  label,
  handleSelect,
  isExpanded,
  children
} : MenuSectionProps) {

  const { bgColor, textColor, toolbarBg, toolbarTextColor } = useThemeStyles();

  return (
            
    <div
      className={`p-2 py-2 w-100`}
      style={{
      }}
    >
      <div
        className="d-flex gap-2 align-items-center"
        style={{
          width: '100%',
        }}
      >
        <p
          className="m-0 p-0"
          style={{
            color: toolbarTextColor,
            opacity: '0.6',
            width: isExpanded ? "100%" : "0",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {label} 
        </p>
      </div>
      
      <Nav onSelect={handleSelect} className="d-flex flex-column justify-content-start menu-button">
        {children}
      </Nav>
    </div>
  );
}
