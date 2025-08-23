"use client";

import { motion } from "framer-motion";

import '../../styles/logo.css';

export default function InitialLogo() {
  const letters = "SmartKitch".split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 * i }
    })
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <motion.h3
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        fontSize: "3rem",
        display: "flex",
        overflow: "hidden",
        fontFamily: "'Cursive', sans-serif",
        fontWeight: "bold",
        color: "#535353ff",
      }}
    >
      {letters.map((char, index) => (
        <motion.span className="logo" key={index} variants={child}>
          {char}
        </motion.span>
      ))}
    </motion.h3>
  );
}
