"use client";

import React, { useState } from 'react';

import Dropdown from "./Dropdown";

import { useRouter } from 'next/navigation';

import Modal from '../modal/Modal';

interface UserDropDownProps {
  iconComponent: React.ReactNode,
}

export default function UserDropDown({ iconComponent } : UserDropDownProps) {

  const [showProfileModal, setShowProfileModal] = useState(false);

  const router = useRouter();

  const dataList: string[] = [
    "Profile",
    "LogOut"
  ];

  function handleClick(item: string) {
    switch (item) {
      case "Profile":
      setShowProfileModal(true);  
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
      <Modal
        title="Profile"
        show={showProfileModal}
        close={() => {setShowProfileModal(false)}}
        saveItem={() => {setShowProfileModal(false)}}
      >
        <p>tmp</p>
      </Modal>

      <Dropdown
        iconComponent={iconComponent}
        dataList={dataList}
        onItemClick={handleClick}
      />
    </div>
  );
}
