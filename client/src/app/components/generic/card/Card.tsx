import React, { useState } from 'react';

import { Card as BootstrapCard } from 'react-bootstrap';

import useStore from '../../../state/useStore'

import { BaseItem } from "@my-org/shared";

import CrudService from "../../../types/CrudService";
import CardComponentProps from '../../../types/props/CardComponentProps';
import IconButton from '../button/IconButton'

import { useLoading } from '../../../loadingProvider/LoadingProvider';

import { toast } from 'sonner';

import { useThemeStyles } from '../../../hooks/useThemeStyles';


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
  
  const [isHovered, setIsHovered] = useState(false);

  const { setLoading } = useLoading();

  const isEditing = componentKey === item.name;

  const {
    mainCardBg,
    mainCardEditingBg,
    textColor,
    editColor,
    deleteColor,
    saveColor,
    undoColor
  } = useThemeStyles();

  // STARTS EDIT
  function startEdit() {
    if (componentKey == "") {
      setItemBeforeEdit(item);
      setComponentKey(item[keyField as keyof T] as string);
    } else {
      toast.warning("You are already editing an item");
    }
  }

  // SAVES CHANGES
  async function saveChanges() {
    try {
      setLoading(true);
      await service.editItem(item);
      toast.success("Changes Saved");
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

    if (!(item[fieldName as keyof T] as Array<string>).includes(value)) {

      const newArray = item[fieldName as keyof T] as Array<string>;
      newArray.push(value);

      const newItem = { ...item, [fieldName]: newArray };
      updateItem(newItem);
    }
  }

  function handleArrayRemoval(value: string, fieldName: string) {
    if ((item[fieldName as keyof T] as Array<string>).includes(value)) {
      const newArray = (item[fieldName as keyof T] as Array<string>).filter(i => i != value);
      const newItem = { ...item, [fieldName]: newArray };
      updateItem(newItem);
    }
  }

  function handleArraySet(newArray: string[], fieldName: string) {
    const newItem = { ...item, [fieldName]: newArray };
    updateItem(newItem);
  }

  const backgroundColor = (!isEditing ? mainCardBg : mainCardEditingBg);

  const border = isEditing
    ? '2px solid rgb(219, 123, 33)'
    : '2px solid transparent';

  return (
    <BootstrapCard
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`m-0`}
      draggable="false"
      style={{
        borderRadius: '15px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 6px',
        backgroundColor,
        color: textColor,
        // border,
        // backgroundColor: "red"
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <BootstrapCard.Body className="d-flex m-0 p-0">
        <CardComponent
          item={item}
          isHovered={isHovered}
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
                iconName="Pencil"
                color={editColor}
                outline={true}
                title="Edit"
                onClick={() => startEdit()}
              />
              {canDelete && (
                <IconButton
                  iconName="Trash"
                  color={deleteColor}
                  outline={true}
                  title="Delete"
                  onClick={() => {deleteItem(item.name)}}
                />
              )}
            </>
          ) : (
            <>
              <IconButton
                iconName="Save"
                color={saveColor}
                outline={true}
                title="Save Changes"
                onClick={saveChanges}
                />
              <IconButton
                iconName="RotateCcw"
                color={undoColor}
                outline={true}
                title="Discard Changes"
                onClick={() => {
                  if (itemBeforeEdit)
                    undoChanges(itemBeforeEdit)
                  }
                }
              />
            </>
          )}
        </div>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}
