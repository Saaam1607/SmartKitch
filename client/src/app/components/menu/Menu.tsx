'use client';

import useStore from '../../state/useStore'

import React, { useState } from 'react';

import { ChefHat, Pizza, Utensils, Wine, Book, NotebookText, CircleDollarSign, Crown } from 'lucide-react';

import { useThemeStyles } from '../../hooks/useThemeStyles';

import { AnimatePresence, motion } from "framer-motion";

import MenuSection from "./MenuSection"
import MenuItem from "./MenuItem"
import ExpandButton from "./ExpandButton"


interface MenuProps {
  handleSelect: (eventKey: string | null) => void;
  selectedRegistry: string;
}


export default function Menu({
  handleSelect,
  selectedRegistry,
} : MenuProps) {

  const { bgColor, textColor, toolbarBg, toolbarTextColor } = useThemeStyles();

  const { setComponentKey } = useStore();

  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      style={{
        backgroundColor: toolbarBg,
        height: '100%',
        ...(isExpanded && { minWidth: "180px" }),
      }}
      className="d-flex flex-column align-items-start"
    >

      <ExpandButton isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <MenuSection label="TEAM" handleSelect={handleSelect} isExpanded={isExpanded} >
        <MenuItem label={"Roles"} iconComponent={Book} selectedRegistry={selectedRegistry} isExpanded={isExpanded} />
      </MenuSection>
      
      <MenuSection label="REGISTRIES" handleSelect={handleSelect} isExpanded={isExpanded} >
        <MenuItem label={"Ingredients"} iconComponent={ChefHat} selectedRegistry={selectedRegistry} isExpanded={isExpanded} />
        <MenuItem label={"Dishes"} iconComponent={Pizza} selectedRegistry={selectedRegistry} isExpanded={isExpanded} />
        <MenuItem label={"Drinks"} iconComponent={Wine} selectedRegistry={selectedRegistry} isExpanded={isExpanded} />
        <MenuItem label={"Menu"} iconComponent={Utensils} selectedRegistry={selectedRegistry} isExpanded={isExpanded} />
      </MenuSection>

      <MenuSection label="ORDERS"  handleSelect={handleSelect} isExpanded={isExpanded} >
        <MenuItem label={"Orders"} iconComponent={NotebookText} selectedRegistry={selectedRegistry} isExpanded={isExpanded} />
      </MenuSection>

      <MenuSection label="STATISTICS" handleSelect={handleSelect} isExpanded={isExpanded} >
        <MenuItem label={"Earnings"} iconComponent={CircleDollarSign} selectedRegistry={selectedRegistry} isExpanded={isExpanded} />
        <MenuItem label={"Products"} iconComponent={Crown} selectedRegistry={selectedRegistry} isExpanded={isExpanded} />
      </MenuSection>
        
    </div>
  );
}
