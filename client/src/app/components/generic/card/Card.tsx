import React, { useState } from 'react';

import { Card as BootstrapCard } from 'react-bootstrap';

import useStore from '../../../state/useStore'

import BaseItem from '../../../types/BaseItem';
import CrudService from "../../types/CrudService";
import CardComponentProps from '../../types/props/CardComponentProps';
import IconButton from '../button/IconButton'

import { useLoading } from '../../../loadingProvider/LoadingProvider';

import { toast } from 'sonner';

interface CardProps<T extends BaseItem> {
  item: T;
  keyField: string,
  canDelete?: boolean,
  updateItem: (newItem: T) => void,
  service: CrudService<T>,
  cardComponent: React.ComponentType<CardComponentProps<T>>;
};

export default function Card<T extends BaseItem>({
  item,
  keyField,
  canDelete=true,
  updateItem,
  service,
  cardComponent: CardComponent,
}: CardProps<T>) {

  const { componentKey, setComponentKey, resetComponentKey } = useStore();
  const [itemBeforeEdit, setItemBeforeEdit] = useState<T | null>(null);
  
  const { setLoading } = useLoading();

  const isEditing = componentKey === item.name;

  // STARTS EDIT
  function startEdit() {
    if (componentKey == "") {
      setItemBeforeEdit(item);
      setComponentKey(item[keyField]);
    } else {
      toast.warning("You are already editing an item");
    }
  }

  // SAVES CHANGES
  async function saveChanges() {
    try {
      setLoading(true);
      await service.editItem(item);
      toast.info("Changes Saved");
      await service.fetchItems();
      setLoading(false);
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
      toast.info("Changes Discarded");
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

  function handleArrayAddition(value: string, fieldName: string) {
    if (!item[fieldName].includes(value)) {

      const newArray = item[fieldName];
      newArray.push(value);

      const newItem = { ...item, [fieldName]: newArray };
      updateItem(newItem);
    }
  }

  function handleArrayRemoval(value: string, fieldName: string) {
    if (item[fieldName].includes(value)) {
      const newArray = item[fieldName].filter(i => i != value);
      const newItem = { ...item, [fieldName]: newArray };
      updateItem(newItem);
    }
  }

  function handleArraySet(newArray: string[], fieldName: string) {
    const newItem = { ...item, [fieldName]: newArray };
    updateItem(newItem);
  }

  const backgroundColor = (!isEditing ? '' : 'rgba(249, 238, 233, 1)');

  const border = isEditing
    ? '2px solid rgb(219, 123, 33)'
    : '2px solid transparent';

  return (
    <BootstrapCard
      className={`m-0`}
      draggable="false"
      style={{
        borderRadius: '15px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 6px',
        backgroundColor,
        border,
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <BootstrapCard.Body className="d-flex m-0 p-0">
        <CardComponent
          item={item}
          isEditing={isEditing}
          handleCheckChange={handleCheckChange}
          handleTextChange={handleTextChange}
          handleImageChange={handleImageChange}
          handlePriceChange={handlePriceChange}
          handleArrayAddition={handleArrayAddition}
          handleArrayRemoval={handleArrayRemoval}
          handleArraySet={handleArraySet}
        />
        <div className="d-flex flex-column gap-2 p-2">
          {!isEditing ? (
            <>
              <IconButton
                variant="outline-orange"
                iconName="Pencil"
                primaryColor="rgb(219, 123, 33)"
                secondaryColor="white"
                // color="rgb(219, 123, 33)"
                // borderColor="rgb(223, 226, 230)"
                title="Edit"
                onClick={() => startEdit(item.name)}
              />
              {canDelete && (
                <IconButton
                  variant="outline-danger"
                  // borderColor="rgb(223, 226, 230)"
                  iconName="Trash"
                  title="Delete"
                  onClick={() => {deleteItem(item.name)}}
                />
              )}
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
