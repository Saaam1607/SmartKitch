'use client';

import React, { useState, useEffect } from 'react';

import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { useThemeStyles } from '../../hooks/useThemeStyles';

interface ExpandButtonProps {
  isExpanded: boolean;
  setIsExpanded: (newValue: boolean) => void;
}

export default function ExpandButton({
  isExpanded,
  setIsExpanded
} : ExpandButtonProps) {



  const { bgColor, textColor, toolbarBg, toolbarTextColor } = useThemeStyles();

  const commonIconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: "25px",
    height: "25px",
    border: `1px solid ${toolbarTextColor}`,
    borderRadius: "5px",
    color: toolbarTextColor
  }

  return (
    <div className={`d-flex ${isExpanded ? "justify-content-end" : "justify-content-center" } p-2 w-100`}>
      {isExpanded ? (
        <ChevronsLeft style={ commonIconStyle } onClick={() => {setIsExpanded(false)}} />
      ) : (
        <ChevronsRight style={ commonIconStyle } onClick={() => {setIsExpanded(true)}} />
      )}
      
    </div>
  );
}
