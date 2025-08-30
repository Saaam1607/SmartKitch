import React, { useState, useEffect } from 'react';

// Components
import RegistryNavBar from './RegistryNavBar';
import Card from '../card/Card'
import FiltersContainer from '../filters/FiltersContainer'

// Types
import { BaseItem } from '@models/BaseItem';
import CrudService from "../../../types/CrudService";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import { useThemeStyles } from '../../../hooks/useThemeStyles';

import CardComponentProps from '../../../types/props/CardComponentProps';

interface RegistryProps<T extends BaseItem> {
  filteredItems: T[];
  keyField: string;
  cardComponent: React.ComponentType<CardComponentProps<T>>;
  canDelete?: boolean;
  updateItem: (newItem: T) => void;
  service: CrudService<T>,
  showNavbar?: boolean;  
  filtersComponent?: React.ReactNode;
  renderCreationModal: (visible: boolean, close: () => void) => React.ReactNode;
}

export default function Registry<T extends BaseItem>({
  filteredItems,
  keyField,
  cardComponent,
  updateItem,
  canDelete = true,
  service,
  showNavbar = false,
  filtersComponent,
  renderCreationModal,
} : RegistryProps<T>) {

  const [itemsToShow, setItemsToShow] = useState<T[]>(filteredItems);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [isLgUp, setIsLgUp] = useState(false);

  const {
    cardsContainerBg,
    filtersContainerBg,
  } = useThemeStyles();

  useEffect(() => {
    let results = filteredItems;
    if (searchTerm != "") {
      results = results.filter((item) =>
        {
          const _keyField = keyField as keyof T;
          const value = String(item[_keyField]);
          return value.toLowerCase().includes(searchTerm.toLowerCase())
        }
      );
    }
    setItemsToShow(results);  
  }, [filteredItems, searchTerm])

  useEffect(() => {
    const handleResize = () => setIsLgUp(window.innerWidth >= 992);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{ height: '100%', width: '100%' }}
      className="d-flex flex-column gap-3"
    >
      {showNavbar && (
        <RegistryNavBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          {...(filtersComponent && { 
            showFilters, 
            setShowFilters 
          })}
          renderCreationModal={renderCreationModal}
        />
      )}
        
      <LayoutGroup>
        
          <div
            className="d-flex flex-column flex-lg-row"
            style={{
              gap: showFilters ? '1rem' : '0',
              flexGrow: 1,
              overflowY: 'hidden',
              height: '100%',
            }}
          >
            <AnimatePresence>
              {filtersComponent && showFilters && (
                <motion.div
                  layout
                  initial={isLgUp ? { width: 0 } : { height: 0 }}
                  animate={isLgUp ? { width: "auto" } : { height: "auto" }}
                  exit={isLgUp ? { width: 0 } : { height: 0 }}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                  className="customScrollbar d-flex flex-column"
                  style={{
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    borderRadius: '15px',
                    minHeight: "fit-content",
                    backgroundColor: filtersContainerBg,
                    transformOrigin: 'left',
                  }}
                >
                  <FiltersContainer showFilters={showFilters}>
                    {filtersComponent}
                  </FiltersContainer>
                </motion.div>
              )}
            </AnimatePresence>
              <div
                className="d-flex flex-column gap-3 customScrollbar"
                style={{
                  padding: "20px",
                  backgroundColor: cardsContainerBg,
                  boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
                  borderRadius: "15px",
                  flexGrow: 1,
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              >
                <LayoutGroup>
		              {itemsToShow.map((item, i) => {
                    return (
                      <div
                        key={i}
                        style={{
                          borderRadius: "12px",
                          boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
                        }}
                      >
                        <Card
                          item={item}
                          keyField={keyField}
                          canDelete={canDelete}
                          updateItem={updateItem}
                          service={service}
                          cardComponent={cardComponent}
                        />
                      </div>
                    );
                  })}
                </LayoutGroup>
              </div>
          </div>
      </LayoutGroup>
    </div>
  );
}