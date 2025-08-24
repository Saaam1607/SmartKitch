"use client";

import Spinner from './Spinner';


import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';

interface LoadingContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoadingState] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const setLoading = (value: boolean) => {
    if (value) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setLoadingState(true)
      }, 300);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setLoadingState(false);
    }
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Spinner />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error('useLoading must be used within a LoadingProvider');
  return context;
};
