import React, { useState } from 'react';

import DishProp from '../../types/DishProp';

import Card from '../generic/card/Card';
import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';
import ComboList from '../generic/form/ComboList';

import '../../styles/card.css';

interface DishCardProps {
  ingredient: DishProp;
  isSelected: boolean;
  setIsSelected: () => void;
}

//! Temp
let ingredientList = [
  "Tomato",
  "Mozzarella",
  "Mushrooms",
  "Ham",
  "French Fries",
  "Cheese",
]

export default function DishCard({ item, isSelected, setIsSelected, isEditing, editItem }: DishCardProps) {

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newItem = { ...item, price: event.target.value };
    editItem(newItem);
  }

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

  function handleIngredientAddition(newValue: string) {
    if (!item.ingredients.includes(newValue)) {
      const newItem = {
        ...item,
        ingredients: [...item.ingredients, newValue],
      };
      editItem(newItem);
    }
  }

  function handleIngredientRemoval(oldValue: string) {
    if (item.ingredients.includes(oldValue)) {
      const newItem = {
        ...item,
        ingredients: item.ingredients.filter(i => i !== oldValue),
      };
      editItem(newItem);
    }
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

        <ComboList
          valueList={item.ingredients}
          dataList={ingredientList}
          handleValueAddition={handleIngredientAddition}
          handleValueRemoval={handleIngredientRemoval}
          fieldName="Ingredients"
          key={item.name}
          isEditing={isEditing}
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