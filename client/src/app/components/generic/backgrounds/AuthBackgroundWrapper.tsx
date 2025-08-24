"use client";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import '../../../styles/auth.css'

const images = [
  "/assets/images/bg.jpg",
  "/assets/images/bg2.jpg",
];

export default function AuthBackgroundWrapper({ children }: { children: React.ReactNode }) {
  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="auth-container"
      style={{ position: "relative" }}
    >
      <AnimatePresence >
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3 }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.9), rgba(88, 107, 126, 0.9)),
              url(${images[index]})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
