"use client";

import Dropdown from "./Dropdown";

import { useRouter } from 'next/navigation';

interface UserDropDownProps {
  iconComponent: React.ReactNode,
}

export default function UserDropDown({ iconComponent } : UserDropDownProps) {

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
    <div style={{ position: 'relative'}} >
      <Dropdown
        iconComponent={iconComponent}
        dataList={dataList}
        onItemClick={handleClick}
      />
    </div>
  );
}
