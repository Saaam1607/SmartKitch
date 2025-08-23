"use client";

import React, { useState, useEffect } from "react";
import InitialLogo from "./components/logo/InitialLogo";
import Main from "./Main";
import { AnimatePresence, motion } from "framer-motion";

export default function MainContainer() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      
      <div
        style={{
          position: "absolute",
          height: "100vh",
          width: "100%",
        }}
      >
        <Main />
      </div>

      <AnimatePresence mode="wait">
        {showLogo && (
          <motion.div
            key="logo"
            className="d-flex align-items-center justify-content-center"
            style={{
              position: "absolute",
              height: "100vh",
              width: "100%",
              backgroundColor: 'white',
              zIndex: 9999,
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <InitialLogo />
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
