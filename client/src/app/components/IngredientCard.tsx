import React, { useState } from 'react';

import IngredientProp from '../../types/IngredientProp';

import CardWrapper from './CardWrapper';
import FormWrapper from './FormWrapper';
import FormTitle from './FormTitle';
import CardImage from './CardImage';
import FormControl from './FormControl';
import FormCheck from './FormCheck';

import '../styles/card.css';

interface IngredientCardProps {
  ingredient: IngredientProp;
  isSelected: boolean;
  setIsSelected: () => void;
}

export default function IngredientCard({ item, isSelected, setIsSelected, isEditing, editItem }: IngredientCardProps) {

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
    <CardWrapper
      isSelected={isSelected}
      isEditing={isEditing}
      onClick={() => setIsSelected()}
    >
      <CardImage image={item.image} isEditing={isEditing} />

      <FormWrapper isEditing={isEditing}>

        <FormTitle title={item.name} />
        
        <FormControl
          item={item}
          value={item.description}
          fieldName="Description"
          isEditing={isEditing}
          handleChange={handleDescriptionChange}
        />

        <div className="d-flex gap-5">
          <FormCheck
            item={item}
            value={item.outOfStock}
            fieldName="Out Of Stock"
            isEditing={isEditing}
            handleChange={handleOutOfStockChange}
          />
          <FormCheck
            item={item}
            value={item.disabled}
            fieldName="Disabled"
            isEditing={isEditing}
            handleChange={handleDisabledChange}
          />
        </div> 

      </FormWrapper>
    </CardWrapper>
  );
}