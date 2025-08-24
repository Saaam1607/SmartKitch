"use client";

import { useState, useRef  } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useThemeStyles } from "../../../hooks/useThemeStyles";

interface DropDownProps {
  iconComponent: React.ReactNode,
  dataList: string[],
  onItemClick: (item: string) => void,
}

export default function DropDown({ dataList, onItemClick, iconComponent } : DropDownProps) {

  const [isOpen, setIsOpen] = useState(false);

  const { toolbarBg, toolbarTextColor } = useThemeStyles();

  const toggleRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      style={{ position: 'relative'}}
    >
      <button
        ref={toggleRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          color: toolbarTextColor,
          background: "unset",
          border: "none",
          cursor: "pointer",
        }}
      >
        {iconComponent}
      </button>

     <AnimatePresence>
        {isOpen && toggleRef.current && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: toggleRef.current.offsetHeight + 4,
              left: "auto",
              right: 0,
              background: toolbarBg,
              color: toolbarTextColor,
              borderRadius: "0.25rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              overflow: "hidden",
              minWidth: toggleRef.current.offsetWidth,
              zIndex: 1000,
            }}
          >
            {dataList.map((item) => (
              <div
                key={item}
                onClick={() => {
                  onItemClick(item);
                  setIsOpen(false);
                }}
                style={{
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div> 
  );
}
