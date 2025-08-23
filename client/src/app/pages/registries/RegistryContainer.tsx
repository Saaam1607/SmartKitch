"use client";

import React from "react";

import { AnimatePresence, motion } from "framer-motion";


type RegistryContainerProps = {
  showRegistry: boolean;
  registryComponent: React.ReactNode;
};

export default function RegistryContainer({ showRegistry, registryComponent }: RegistryContainerProps) {

  return (
    showRegistry && (
      <motion.div
  initial={{ opacity: 0, scale: 0.98, y: 3 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 1.02, y: -3 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
  {registryComponent}
</motion.div>

    )
  );
}
