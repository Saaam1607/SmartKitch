import React from 'react';

import IngredientProp from '../../types/IngredientProp';

import Card from '../generic/card/Card';
import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import CardComponentProps from '../../types/props/CardComponentProps';

import '../../styles/card.css';

export default function IngredientCard({ item, isSelected, setIsSelected, isEditing, editItem }: CardComponentProps<IngredientProp>) {

  function handelImageChange(newImage: string) {
    if (!item) return;
    const newItem = { ...item, image: newImage };
    editItem(newItem);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!item) return;
    const newItem = { ...item, description: event.target.value };
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
      isSelected={isSelected}
      isEditing={isEditing}
      onClick={() => setIsSelected()}
    >
      <CardImage
        image={item.image}
        updateImage={handelImageChange}
        isEditing={isEditing}
      />

      <div
        className="w-100 p-2 ps-3"
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
    </Card>
  );
}