import React from 'react';

import DishProp from '../../types/DishProp';

import Card from '../generic/card/Card';
import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';
import ComboList from '../generic/form/ComboList';

import CardComponentProps from '../../types/props/CardComponentProps';

import '../../styles/card.css';

//! Temp
const ingredientList = [
  "Tomato",
  "Mozzarella",
  "Mushrooms",
  "Ham",
  "French Fries",
  "Cheese",
]

export default function DishCard({ item, isSelected, setIsSelected, isEditing, editItem }: CardComponentProps<DishProp>) {

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!item) return;

    const newItem: DishProp = { ...item, price: parseFloat(event.target.value) };
    editItem(newItem);
  }

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

  function handleIngredientAddition(newValue: string) {
    if (!item.ingredients.includes(newValue)) {
      if (!item) return;
      const newItem = {
        ...item,
        ingredients: [...item.ingredients, newValue],
      };
      editItem(newItem);
    }
  }

  function handleIngredientRemoval(oldValue: string) {
    if (item.ingredients.includes(oldValue)) {
      if (!item) return;
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
          itemKey={item.name}
          value={item.price}
          fieldName="Price"
          isEditing={isEditing}
          handleChange={handlePriceChange}
        />

        <Control
          type="textarea"
          itemKey={item.name}
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
          itemKey={item.name}
          isEditing={isEditing}
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
    </Card>
  );
}