import React, { useState, useEffect } from 'react';

import { Card as BootstrapCard } from 'react-bootstrap';

import useStore from '../../../state/useStore'

import BaseItem from '../../../types/BaseItem';
import CrudService from "../../types/CrudService";
import CardComponentProps from '../../types/props/CardComponentProps';
import IconButton from '../button/IconButton'


interface CardProps<T extends BaseItem> {
  item: T;
  keyField: string,
  updateItem: (newItem: T) => void,
  service: CrudService<T>,
  cardComponent: React.ComponentType<CardComponentProps<T>>;
};

export default function Card<T extends BaseItem>({
  item,
  keyField,
  updateItem,
  service,
  cardComponent: CardComponent,
}: CardProps<T>) {

  const { componentKey, setComponentKey, resetComponentKey } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  
  const [itemBeforeEdit, setItemBeforeEdit] = useState<T | null>(null);
  
  useEffect(() => {
    setIsEditing(componentKey === item.name)
  }, [componentKey])

  // STARTS EDIT
  function startEdit() {
    setItemBeforeEdit(item);
    setComponentKey(item[keyField]);
  }

  // SAVES CHANGES
  async function saveChanges() {
    try {
      await service.editItem(item);
      // toast.info("Changes Saved");
      await service.fetchItems();
    } catch (error) {
      console.error(error);
    }
    resetComponentKey();
  }

  // DISCARD CHANGES
  function undoChanges(prevItem: T) {
    if (componentKey) {
      updateItem(prevItem);
      resetComponentKey();
      // toast.info("Changes Reverted");
    }
  }

  // DELETES ITEM
  async function deleteItem(componentKey: string) {
    if (componentKey === "") {
      try {
        await service.deleteItem(componentKey);
        await service.fetchItems();
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleCheckChange(event: React.ChangeEvent<HTMLInputElement>, fieldName: string) {
    const { checked } = event.target;
    const newItem = { ...item, [fieldName]: checked };
    updateItem(newItem);
  }

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) {
    const { value } = event.target;
    const newItem = { ...item, [fieldName]: value };
    updateItem(newItem);
  }

  function handleImageChange(newImage: string, fieldName: string) {
    const newItem = { ...item, [fieldName]: newImage };
    updateItem(newItem);
  }
      
  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>, fieldName: string) {
    const newItem = { ...item, [fieldName]: parseFloat(event.target.value) };
    updateItem(newItem);
  }
  
  const backgroundColor = (!isEditing ? '' : 'rgba(255, 229, 217, 1)');

  const border = isEditing
    ? '2px solid #007bff'
    : '2px solid white';

  return (
    <BootstrapCard
      className={`m-0 border-0`}
      draggable="false"
      style={{
        borderRadius: '15px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 6px',
        backgroundColor,
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <BootstrapCard.Body className="d-flex m-0 p-0">
        <CardComponent
          item={item}
          isEditing={isEditing}
          edit={updateItem}
          handleCheckChange={handleCheckChange}
          handleTextChange={handleTextChange}
          handleImageChange={handleImageChange}
          handlePriceChange={handlePriceChange}
        />
        <div className="d-flex flex-column gap-2 p-2">
          {!isEditing ? (
            <>
              <IconButton
                variant="outline-secondary"
                iconName="Pencil"
                color="rgb(219, 123, 33)"
                borderColor="rgb(223, 226, 230)"
                title="Edit"
                onClick={() => startEdit(item.name)}
              />
              <IconButton
                variant="outline-danger"
                // borderColor="rgb(223, 226, 230)"
                iconName="Trash"
                title="Delete"
                onClick={() => {deleteItem(item.name)}}
              />
            </>
          ) : (
            <>
              <IconButton variant="outline-success" iconName="Save" title="Save Changes" onClick={saveChanges} />
              <IconButton variant="outline-secondary" iconName="RotateCcw" title="Discard Changes" onClick={() => { undoChanges(itemBeforeEdit) }} />
            </>
          )}
        </div>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}
