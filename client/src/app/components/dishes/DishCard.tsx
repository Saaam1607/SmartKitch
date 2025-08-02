import React, { useState } from 'react';

import DishProp from '../../types/DishProp';

import Card from '../generic/card/Card';
import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import '../../styles/card.css';

interface DishCardProps {
  ingredient: DishProp;
  isSelected: boolean;
  setIsSelected: () => void;
}

export default function DishCard({ item, isSelected, setIsSelected, isEditing, editItem }: DishCardProps) {

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newIngredient = { ...item, price: event.target.value };
    editItem(newIngredient);
  }

  function handelImageChange(newImage: string) {
    const newIngredient = { ...item, image: newImage };
    editItem(newIngredient);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newIngredient = { ...item, description: event.target.value };
    editItem(newIngredient);
  }

  function handleOutOfStockChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newIngredient = { ...item, outOfStock: event.target.checked };
    editItem(newIngredient);
  }

  function handleDisabledChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newIngredient = { ...item, disabled: event.target.checked };
    editItem(newIngredient);
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
          type="price"
          step={0.1}
          item={item}
          value={item.price}
          fieldName="Price"
          isEditing={isEditing}
          handleChange={handlePriceChange}
        />

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