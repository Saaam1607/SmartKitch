"use client";

import { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useThemeStyles } from "../../../hooks/useThemeStyles";


interface DropDownProps<T> {
  iconComponent: React.ReactNode,
  dataList: T[],
  onItemClick: (item: T) => void,
}

export default function Dropdown<T>({ dataList, onItemClick, iconComponent } : DropDownProps<T>) {

  const [isOpen, setIsOpen] = useState(false);

  const { toolbarBg, toolbarTextColor } = useThemeStyles();

  const toggleRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            ref={dropdownRef}
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
            {dataList.map((item, idx) => (
              <div
                key={typeof item === "string" ? item : idx}
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
                {typeof item === "string"
                  ? item.charAt(0).toUpperCase() + item.slice(1)
                  : String(item)}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div> 
  );
}
