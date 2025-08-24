"use client";

import MainContainer from './MainContainer';

import { useAuthGuard } from './hooks/useAuthGuard';

export default function Home() {

  useAuthGuard();

  return (
    <div>
      <MainContainer />
    </div>
  );
}
