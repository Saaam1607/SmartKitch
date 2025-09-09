import React, { useState } from 'react';

import { Card as BootstrapCard } from 'react-bootstrap';

import useStore from '../../../state/useStore'

import { BaseItem } from '@models/BaseItem';

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
  canSave?: (newItem: T) => Promise<boolean>;
  service: CrudService<T>,
  cardComponent: React.ComponentType<CardComponentProps<T>>;
};

export default function Card<T extends BaseItem>({
  item,
  keyField,
  canDelete=true,
  canSave,
  service,
  cardComponent: CardComponent,
}: CardProps<T>) {

  const { componentKey, setComponentKey, resetComponentKey } = useStore();
  const [sessionItem, setSessionItem] = useState<T>(item);
  
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
      setComponentKey(item[keyField as keyof T] as string);
    } else {
      toast.warning("You are already editing an item");
    }
  }

  // SAVES CHANGES
  async function saveChanges() {
    try {
      if (canSave) {
        const result = await canSave(sessionItem);
        if (!result)
          return;
      }

      setLoading(true);
      await service.editItem(sessionItem);
      if (sessionItem?.image) {
        await service.editItemImage(sessionItem.name, sessionItem.image);
      }
      toast.success("Changes Saved");
      await service.fetchItems();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    resetComponentKey();
  }

  // DISCARD CHANGES
  function undoChanges() {
    if (componentKey) {
      setSessionItem(item);
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
    const newItem = { ...sessionItem, [fieldName]: checked };
    setSessionItem(newItem);
  }

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) {
    const { value } = event.target;
    const newItem = { ...sessionItem, [fieldName]: value };
    setSessionItem(newItem);
  }

  async function handleImageChange(newImage: string, fieldName: string) {
    try {
      setLoading(true);
      await service.editItemImage(sessionItem.name, sessionItem.image);
      toast.success("Image Saved");
      // await service.fetchItems();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    const newItem = { ...sessionItem, [fieldName]: newImage };
    setSessionItem(newItem);
  }
      
  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>, fieldName: string) {
    const newItem = { ...sessionItem, [fieldName]: parseFloat(event.target.value) };
    setSessionItem(newItem);
  }

  function handleArrayAddition(value: string, fieldName: string) {
    if (!(sessionItem[fieldName as keyof T] as Array<string>).includes(value)) {

      const newArray = sessionItem[fieldName as keyof T] as Array<string>;
      newArray.push(value);

      const newItem = { ...sessionItem, [fieldName]: newArray };
      setSessionItem(newItem);
    }
  }

  function handleArrayRemoval(value: string, fieldName: string) {
    if ((sessionItem[fieldName as keyof T] as Array<string>).includes(value)) {
      const newArray = (sessionItem[fieldName as keyof T] as Array<string>).filter(i => i != value);
      const newItem = { ...sessionItem, [fieldName]: newArray };
      setSessionItem(newItem);
    }
  }

  function handleArraySet(newArray: string[], fieldName: string) {
    const newItem = { ...sessionItem, [fieldName]: newArray };
    setSessionItem(newItem);
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
      <BootstrapCard.Body className="d-flex flex-column flex-lg-row m-0 p-0">
       <div className="order-2 order-lg-1 w-100">
          <CardComponent
            item={sessionItem}
            getImage={service?.fetchItemImage}
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
        </div> 

        <div
          className="d-flex flex-row flex-lg-column justify-content-end justify-content-lg-start order-1 order-lg-2 gap-2 p-2"
        >
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
                onClick={() => {undoChanges()}}
              />
            </>
          )}
        </div>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}
