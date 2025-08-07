import React, { useState, useEffect } from 'react';

import useStore from '../../state/useStore'

import { toast } from 'sonner';

import RegistryNavBar from '../../components/generic/registry/RegistryNavBar';

import BaseItem from '../../types/BaseItem';
import CardComponentProps from '../../types/props/CardComponentProps';

interface RegistryProps<T extends BaseItem> {
  items: T[];
  setItems: (items: T[]) => void;
  keyField: keyof T;
  cardComponent: React.ComponentType<CardComponentProps<T>>;
  handleSearch: (searchTerm: string) => void;
  createItem: (item: T) => void;
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
  createItem,
  editItem,
  filtersComponent,
  renderCreationModal,
} : RegistryProps<T>) {

  const { componentKey, setComponentKey } = useStore();
  const { isEditing, setIsEditing } = useStore();

  const [itemBeforeEdit, setItemBeforeEdit] = useState<T | null>(null);

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
      style={{ height: '100%', backgroundColor: "beige" }}
      className="d-flex flex-column"
    >
      <RegistryNavBar
        handleSearch={handleSearch}
        startEditing={startEditing}
        saveItemChanges={saveItemChanges}
        undoItemChanges={undoItemChanges}
        isAnItemSelected={componentKey !== ""}
        isEditing={isEditing}
        filters={filtersComponent}
        renderCreationModal={renderCreationModal}
      />

      <div
        className="customScrollbar d-flex flex-column gap-2 mx-3 my-2 p-2 rounded"
        style={{
          flexGrow: 1,
          overflowX: 'hidden',
          overflowY: 'auto',
          backgroundColor: 'white'
        }}
      >
        {items.map((item) => (
          <Card
            key={String(item[keyField])}
            item={item}
            isSelected={item[keyField] === componentKey}
            setIsSelected={() => handleSelection(String(item[keyField]))}
            isEditing={isEditing && item[keyField] === componentKey}
            editItem={editItem}
          />
        ))}
      </div>
    </div>
  );
}