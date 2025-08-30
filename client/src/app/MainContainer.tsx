"use client";

import React, { useState, useEffect } from "react";
import InitialLogo from "./components/logo/InitialLogo";
import Main from "./Main";
import { AnimatePresence, motion } from "framer-motion";

import Image from "next/image";

// const delay1: number = 500;
// const delay2: number = 2500;

const delay1: number = 0
const delay2: number = 0


export default function MainContainer() {
  const [showText, setShowText] = useState(false);
  const [showImage, setShowImage] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true)
    }, delay1);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showImage) {
      const timer = setTimeout(() => {
        setShowText(false)
        setShowImage(false)
      }, delay2);
      return () => clearTimeout(timer);
    }
  }, [setShowText]);

  return (
    <div style={{ position: "relative", height: "100dvh", width: "100%" }}>
      
      <div
        style={{
          position: "absolute",
          height: "100dvh",
          width: "100%",
        }}
      >
        <Main />
      </div>

      <AnimatePresence mode="wait">
        {(showText || showImage) && (
          <motion.div
            key="logo"
            className="d-flex align-items-center justify-content-center"
            style={{
              position: "absolute",
              height: "100dvh",
              width: "100%",
              backgroundColor: 'white',
              zIndex: 9999,
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >

            <motion.div
              className="d-flex gap-2 align-items-center"
              layout
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              
              {showImage && (
                <motion.div
                  layout="position"
                  initial={{ scale: 0, opacity: 1, rotateY: 0 }}
                  animate={{ scale: 1, opacity: 1, rotateY: showText ? 360 : 0 }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{
                    scale: { duration: 0.25, ease: "easeInOut" },
                    opacity: { duration: 0.25, ease: "easeInOut" },
                    rotateY: { duration: 1, ease: "easeInOut" },
                  }}                 
                  style={{ perspective: 1000 }}
                >
                  <Image
                    src="/assets/logo/SKgrey.png"
                    alt="SmartKitch Logo"
                    width={45}
                    height={45}
                  />
                </motion.div>
              )}

              {showText && (
                <InitialLogo />
              )}

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
