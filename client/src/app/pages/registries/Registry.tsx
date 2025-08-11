import React, { useState } from 'react';

import useStore from '../../state/useStore'

import { toast } from 'sonner';

import RegistryNavBar from '../../components/generic/registry/RegistryNavBar';

import Card from '../../components/generic/card/Card'
import FiltersContainer from '../../components/generic/filters/FiltersContainer'

import BaseItem from '../../types/BaseItem';
import CardComponentProps from '../../types/props/CardComponentProps';
import CrudService from "../../types/CrudService";


interface RegistryProps<T extends BaseItem> {
  items: T[];
  keyField: string;
  cardComponent: React.ReactNode;
  updateItem: (newItem: T) => void;
  service: CrudService<T>,
  handleSearch: (searchTerm: string) => void;
  filtersComponent?: React.ReactNode;
  renderCreationModal: (visible: boolean, close: () => void) => React.ReactNode;
}

export default function Registry<T extends BaseItem>({
  items,
  keyField,
  cardComponent,
  updateItem,
  service,
  handleSearch,
  filtersComponent,
  renderCreationModal,
} : RegistryProps<T>) {

  const { componentKey, resetComponentKey } = useStore();

  const [showFilters, setShowFilters] = useState<boolean>(true);

  return (
    <div
      style={{ height: '100%' }}
      className="d-flex flex-column p-3 gap-2"
    >

      <div className="">
        <RegistryNavBar
          handleSearch={handleSearch}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          renderCreationModal={renderCreationModal}
        />
      </div>
        
      <div
        className="d-flex flex-row p-2 gap-2"
        style={{
          flexGrow: 1,
          overflowY: 'hidden',
        }}
      >
          <div
            className="customScrollbar d-flex flex-column gap-3 rounded"
            style={{
              overflowX: 'hidden',
              overflowY: 'auto',
              backgroundColor: 'white'
            }}
          >
            <FiltersContainer showFilters={showFilters}>
              {filtersComponent}
            </FiltersContainer>
          </div>
          
          <div
            className="d-flex flex-column gap-3 customScrollbar"
            style={{
              padding: "20px",
              background: "#f9f9f9",
              borderRadius: "15px",
              flexGrow: 1,
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {items.map((item, i) => {
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