import React, { useState, useEffect } from 'react';

// Components
import RegistryNavBar from '../../components/generic/registry/RegistryNavBar';
import Card from '../../components/generic/card/Card'
import FiltersContainer from '../../components/generic/filters/FiltersContainer'

// Types
import BaseItem from '../../types/BaseItem';
import CrudService from "../../types/CrudService";

import { LayoutGroup, motion } from "framer-motion";


interface RegistryProps<T extends BaseItem> {
  filteredItems: T[];
  keyField: string;
  cardComponent: React.ReactNode;
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

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState<boolean>(true);

  useEffect(() => {
    let results = filteredItems;
    if (searchTerm != "") {
      results = results.filter((item) =>
        item[keyField].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setItemsToShow(results);  
  }, [filteredItems, searchTerm])

  return (
    <div
      style={{ height: '100%', width: '100%' }}
      className="d-flex flex-column gap-2"
    >
      {showNavbar && (
        <div className="">
          <RegistryNavBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            {...(filtersComponent && { 
              showFilters, 
              setShowFilters 
            })}
            renderCreationModal={renderCreationModal}
          />
        </div>
      )}
        
      <div
        className="d-flex flex-row py-2 gap-3"
        style={{
          flexGrow: 1,
          overflowY: 'hidden',
        }}
      >
          {filtersComponent && (
            <div
              className="customScrollbar d-flex flex-column gap-3 rounded"
              style={{
                overflowX: 'hidden',
                overflowY: 'auto',
              }}
            >
              <FiltersContainer showFilters={showFilters}>
                {filtersComponent}
              </FiltersContainer>
            </div>
          )}
          
          <LayoutGroup>
            <div
              className="d-flex flex-column gap-3 customScrollbar"
              style={{
                padding: "20px",
                background: "linear-gradient(to bottom, #f8f9fa, #e2e7f0ff)",
                // border: "2px solid #e2e7f0ff",
                boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
                borderRadius: "15px",
                flexGrow: 1,
                overflowX: "hidden",
                overflowY: "auto",
              }}
            >
              {itemsToShow.map((item, i) => {
                return (
                  <motion.div
                    layout="position"
                    initial={true}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className=""
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
                  </motion.div>
                );
              })}
            </div>
          </LayoutGroup>
 
      </div>
    </div>
  );
}