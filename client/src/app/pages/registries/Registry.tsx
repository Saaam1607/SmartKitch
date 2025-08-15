import React, { useState, useEffect } from 'react';

// Components
import RegistryNavBar from '../../components/generic/registry/RegistryNavBar';
import Card from '../../components/generic/card/Card'
import FiltersContainer from '../../components/generic/filters/FiltersContainer'

// Types
import BaseItem from '../../types/BaseItem';
import CrudService from "../../types/CrudService";

interface RegistryProps<T extends BaseItem> {
  filteredItems: T[];
  keyField: string;
  cardComponent: React.ReactNode;
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
          
          
          <div
            className="d-flex flex-column gap-3 customScrollbar"
            style={{
              padding: "20px",
              background: "#edececff",
              borderRadius: "15px",
              flexGrow: 1,
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
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
                    updateItem={updateItem}
                    service={service}
                    cardComponent={cardComponent}
                  />
                </div>
              );
            })}
          </div>
 
      </div>
    </div>
  );
}