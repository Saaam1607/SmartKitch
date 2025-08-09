import React, { useState, useEffect, useRef  } from 'react';

import useStore from '../../state/useStore'

import { toast } from 'sonner';

import RegistryNavBar from '../../components/generic/registry/RegistryNavBar';

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
  filtersComponent,
  renderCreationModal,
} : RegistryProps<T>) {

  const { componentKey, setComponentKey } = useStore();
  const { isEditing, setIsEditing } = useStore();

  const [itemBeforeEdit, setItemBeforeEdit] = useState<T | null>(null);

  const divRef = useRef<HTMLDivElement>(null);

  const [showFilters, setShowFilters] = useState<boolean>(true);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        console.log(componentKey)
        // if (componentKey != "")
          // setComponentKey("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [componentKey]);

  function handleSelection(itemKey: string) {
    if (isEditing) {
      if (componentKey != itemKey) {
        toast.warning("Finish editing before selecting another item");
      }
      return;
    }

    if (componentKey === itemKey) {
      setComponentKey("");
      return;
    }

    setComponentKey(itemKey);
  }

  function startEditing() {
    if (componentKey) {
      setItemBeforeEdit(items.find(item => item[keyField] === componentKey) || null);
      setIsEditing(true);
    }
  }

  function endEditing() {
    setIsEditing(false);
  }

  function undoItemChanges() {
    if (isEditing) {
      setItems(items.map(item =>
        item[keyField] === componentKey ? itemBeforeEdit || item : item
      ));
      setIsEditing(false);
      toast.info("Changes reverted");
    }
  }

  function saveItemChanges() {
    if (isEditing) {
      setIsEditing(false);
      toast.success("Item updated successfully");
    }
  }

  return (
    <div
      style={{
        height: '100%',
        // backgroundColor: "beige"
      }}
      className="d-flex flex-column p-3 gap-2"
    >

      <div className="">
        <RegistryNavBar
          handleSearch={handleSearch}
          startEditing={startEditing}
          saveItemChanges={saveItemChanges}
          undoItemChanges={undoItemChanges}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          isAnItemSelected={componentKey !== ""}
          isEditing={isEditing}
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
            className="customScrollbar d-flex flex-column gap-3 rounded p-3"
            style={{
              flexGrow: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              backgroundColor: 'white',
              backgroundColor: 'rgb(242, 242, 242)',
            }}
          >
            {items.map((item) => (
              <div ref={divRef} key={String(item[keyField])}>
                <Card
                  item={item}
                  isSelected={item[keyField] === componentKey}
                  setIsSelected={() => handleSelection(String(item[keyField]))}
                  isEditing={isEditing && item[keyField] === componentKey}
                  editItem={editItem}
                />
              </div>
            ))}
          </div>

      </div>


    </div>
  );
}