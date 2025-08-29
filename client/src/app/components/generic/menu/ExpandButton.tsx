'use client';

import React, { useState, useEffect } from 'react';

import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { useThemeStyles } from '../../../hooks/useThemeStyles';

import { AnimatePresence, motion } from "framer-motion";


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
    width: "25px",
    height: "25px",
    border: `1px solid ${toolbarTextColor}`,
    borderRadius: "5px",
    color: toolbarTextColor
  }

  return (
    <div
      className={`d-flex justify-content-center p-2 w-100`}
    >
      <div className={`flex-grow-1 fake-expanded-div ${!isExpanded && " collapsed"}`} />
      <div
      >
        {isExpanded ? (
          <ChevronsLeft className="expand-button" style={ commonIconStyle } onClick={() => {setIsExpanded(false)}} />
        ) : (
          <ChevronsRight className="expand-button" style={ commonIconStyle } onClick={() => {setIsExpanded(true)}} />
        )}
      </div>
      

      
    </div>
  );
}
