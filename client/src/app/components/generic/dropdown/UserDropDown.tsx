"use client";

import { useState, useRef  } from "react";

import CustomDropDown from "./Dropdown";

import { useThemeStyles } from "../../../hooks/useThemeStyles";

import { useRouter } from 'next/navigation';

interface UserDropDownProps {
  iconComponent: React.ReactNode,
}

export default function UserDropDown({ iconComponent } : UserDropDownProps) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleRef = useRef<HTMLButtonElement>(null);

  const { toolbarBg, toolbarTextColor } = useThemeStyles();

  const router = useRouter();

  const dataList: string[] = [
    "Profile",
    "LogOut"
  ];

  function handleClick(item: string) {
    switch (item) {
      case "Profile":
        break;
      case "LogOut":
        localStorage.removeItem('authToken');
        router.push('/login');
        break;
      default:
        break;
    }
  }

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

      <CustomDropDown
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleRef={toggleRef}
        dataList={dataList}
        onItemClick={handleClick}
      />
      
    </div>
  );
}
