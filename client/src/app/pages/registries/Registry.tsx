import React, { useState } from 'react';

import useStore from '../../state/useStore'

import { toast } from 'sonner';

import RegistryNavBar from '../../components/generic/registry/RegistryNavBar';

import CardList from '../../components/generic/card/CardList'
import BaseItem from '../../types/BaseItem';
import CardComponentProps from '../../types/props/CardComponentProps';
import FiltersContainer from '../../components/generic/filters/FiltersContainer'


interface RegistryProps<T extends BaseItem> {
  items: T[];
  setItems: (items: T[]) => void;
  keyField: keyof T;
  cardComponent: React.ComponentType<CardComponentProps<T>>;
  handleSearch: (searchTerm: string) => void;
  editItem: (item: T) => void;
  saveChanges: () => void;
  deleteItem: (itemKey: string) => void;
  filtersComponent?: React.ReactNode;
  renderCreationModal: (visible: boolean, close: () => void) => React.ReactNode;
}

export default function Registry<T extends BaseItem>({
  items,
  setItems,
  keyField,
  cardComponent: Card,
  handleSearch,
  editItem,
  saveChanges,
  deleteItem,
  filtersComponent,
  renderCreationModal,
} : RegistryProps<T>) {

  const { componentKey, resetComponentKey } = useStore();
  const [showFilters, setShowFilters] = useState<boolean>(true);

  function undoChanges(prevItem: T) {
    if (componentKey) {
      setItems(items.map(item =>
        item[keyField] === componentKey ? prevItem || item : item
      ));
      resetComponentKey();
      toast.info("Changes reverted");
    }
  }

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
          
          <CardList
            items={items}
            editItem={editItem}
            undoChanges={undoChanges}
            saveChanges={saveChanges}
            deleteItem={deleteItem}
            cardComponent={Card}
          />

      </div>
    </div>
  );
}