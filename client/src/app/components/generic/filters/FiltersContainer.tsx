import React from 'react';

import { motion } from "motion/react"

type FiltersProps = {
  showFilters: boolean;
  children: React.ReactNode;
};

export default function FiltersContainer({ showFilters, children }: FiltersProps) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        height: '100%',
      }}
    >
      {showFilters && (
        <div
          className="p-3 border"
          style={{
            height: '100%',
            backgroundColor: '#edececff',
            borderRadius: '15px',
          }}
        >
          <p className="m-0">Filters:</p>
          <div className="d-flex gap-5">
            {children}
          </div>
        </div>
      )}
    </motion.div>
  );
}