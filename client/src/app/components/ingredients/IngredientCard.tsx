import React, { useState, useEffect } from 'react';

import IngredientProp from '../../types/IngredientProp';

import Card from '../generic/card/Card';
import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import IconButton from '../generic/button/IconButton'

import CardComponentProps from '../../types/props/CardComponentProps';

import useStore from '../../state/useStore'

import '../../styles/card.css';

export default function IngredientCard({ item, editItem, saveChanges, undoChanges, deleteItem }: CardComponentProps<IngredientProp>) {

  const { componentKey, setComponentKey } = useStore();

  const [isEditing, setIsEditing] = useState(false);
  const [itemBeforeEdit, setItemBeforeEdit] = useState<T | null>(null);
  
  useEffect(() => {
    setIsEditing(componentKey === item.name)
  }, [componentKey])

  function startEdit() {
    setItemBeforeEdit(item);
    setComponentKey(item.name);
  }

  function handelImageChange(newImage: string) {
    if (!item) return;
    const newItem = { ...item, image: newImage };
    editItem(newItem);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const newItem = { ...item, description: event.target.value };
    editItem(newItem);
  }

  function handleIsAddableChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newItem = { ...item, isAddable: event.target.checked };
    editItem(newItem);
  }

  function handleAdditionPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const num = event.target.value === '' ? '' : parseFloat(event.target.value);
    const newItem: DishProp = { ...item, additionPrice: parseFloat(num) };
    editItem(newItem);
  }

  function handleOutOfStockChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!item) return;
    const newItem = { ...item, outOfStock: event.target.checked };
    editItem(newItem);
  }

  function handleDisabledChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!item) return;
    const newItem = { ...item, disabled: event.target.checked };
    editItem(newItem);
  }

  return (
    <Card
      isEditing={isEditing}
      onClick={() => {}}
    >
      <CardImage
        image={item.image}
        updateImage={handelImageChange}
        isEditing={isEditing}
      />

      <div className="d-flex w-100">
        <div
          className="w-100 p-2 ps-3 flex-grow-1"
          style={{
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          <Form isEditing={isEditing}>

            <Title title={item.name} />
            
            <Control
              type="textarea"
              itemKey={item.name}
              value={item.description}
              fieldName="Description"
              isEditing={isEditing}
              handleChange={handleDescriptionChange}
            />

            <div className="d-flex align-items-center gap-5">
              <Check
                itemKey={item.name}
                value={item.isAddable}
                fieldName="Is Addable"
                isEditing={isEditing}
                handleChange={handleIsAddableChange}
              />

              <Control
                type="price"
                step={0.1}
                itemKey={item.name}
                value={item.additionPrice}
                fieldName="Addition Price"
                isEditing={isEditing}
                handleChange={handleAdditionPriceChange}
              />
            </div>

            <div className="d-flex gap-5">
              <Check
                itemKey={item.name}
                value={item.outOfStock}
                fieldName="Out Of Stock"
                isEditing={isEditing}
                handleChange={handleOutOfStockChange}
              />
              <Check
                itemKey={item.name}
                value={item.disabled}
                fieldName="Disabled"
                isEditing={isEditing}
                handleChange={handleDisabledChange}
              />
            </div> 
          </Form>
        </div>

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
              <IconButton variant="success" iconName="Save" title="Save Changes" onClick={saveChanges} />
              <IconButton variant="secondary" iconName="RotateCcw" title="Discard Changes" onClick={() => { undoChanges(itemBeforeEdit) }} />
            </>
          )}
        </div>

      </div>
    </Card>
  );
}