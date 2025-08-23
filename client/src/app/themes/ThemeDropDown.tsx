"use client";

import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../themes/ThemeProvider";
import { useThemeStyles } from "../hooks/useThemeStyles";

const themes = ["light", "dark", "solarized", "pastel", "twilight"];

export default function ThemeDropdown() {
  
  const { themeName, setThemeName } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const { toolbarBg, toolbarTextColor } = useThemeStyles();

  return (
    <Dropdown show={isOpen} onToggle={() => setIsOpen(!isOpen)}>
      <Dropdown.Toggle
        className="nav-link"
        style={{ color: toolbarTextColor, backgroundColor: "unset" }}
      >
        <Palette size={25} color={toolbarTextColor} />
      </Dropdown.Toggle>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              marginTop: "0.5rem",
              zIndex: 1000,
              background: toolbarBg,
              color: toolbarTextColor,
              borderRadius: "0.25rem",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          >
            {themes.map((t) => (
              <div
                key={t}
                onClick={() => {
                  setThemeName(t);
                  setIsOpen(false);
                }}
                style={{
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(0,0,0,0.05)"
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Dropdown>
  );
}
