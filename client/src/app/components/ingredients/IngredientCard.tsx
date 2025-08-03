import React, { useState } from 'react';

import IngredientProp from '../../types/IngredientProp';

import Card from '../generic/card/Card';
import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import '../../styles/card.css';

interface IngredientCardProps {
  ingredient: IngredientProp;
  isSelected: boolean;
  setIsSelected: () => void;
}

export default function IngredientCard({ item, isSelected, setIsSelected, isEditing, editItem }: IngredientCardProps) {

  function handelImageChange(newImage: string) {
    const newItem = { ...item, image: newImage };
    editItem(newItem);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newItem = { ...item, description: event.target.value };
    editItem(newItem);
  }

  function handleOutOfStockChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newItem = { ...item, outOfStock: event.target.checked };
    editItem(newItem);
  }

  function handleDisabledChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newItem = { ...item, disabled: event.target.checked };
    editItem(newItem);
  }

  return (
    <Card
      isSelected={isSelected}
      isEditing={isEditing}
      onClick={() => setIsSelected()}
    >
      <CardImage image={item.image} updateImage={handelImageChange} isEditing={isEditing} />

      <Form isEditing={isEditing}>

        <Title title={item.name} />
        
        <Control
          type="textarea"
          item={item}
          value={item.description}
          fieldName="Description"
          isEditing={isEditing}
          handleChange={handleDescriptionChange}
        />

        <div className="d-flex gap-5">
          <Check
            item={item}
            value={item.outOfStock}
            fieldName="Out Of Stock"
            isEditing={isEditing}
            handleChange={handleOutOfStockChange}
          />
          <Check
            item={item}
            value={item.disabled}
            fieldName="Disabled"
            isEditing={isEditing}
            handleChange={handleDisabledChange}
          />
        </div> 

      </Form>
    </Card>
  );
}