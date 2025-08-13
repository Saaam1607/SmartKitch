import React, { useState, useEffect } from 'react';

import DishProp from '../../types/DishProp';

import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';
import ComboList from '../generic/form/ComboList';

import CardComponentProps from '../../types/props/CardComponentProps';

import useStore from '../../state/useStore'

import '../../styles/card.css';

export default function DishCard({ item, isEditing, handleCheckChange, handleTextChange, handleImageChange, handlePriceChange, handleArrayAddition, handleArrayRemoval }: CardComponentProps<DishProp>) {

  const { ingredients } = useStore();

  const [ingredientsNames, setIngredientsNames] = useState(ingredients.map(obj => obj.name));

  useEffect(() => {
    setIngredientsNames(ingredients.map(obj => obj.name))
  }, [ingredients])

  function handleIngredientAddition(ingredient: string) {
    handleArrayAddition(ingredient, "ingredients")
  }

  function handleIngredientRemoval(ingredient: string) {
    handleArrayRemoval(ingredient, "ingredients")
  }

  return (
    <div className="d-flex w-100" >
      <div
        className="d-flex align-items-center p-3"
        style={{
          minHeight: '100%'
        }}
      >
        <CardImage
          image={item.image}
          updateImage={(image: string) => handleImageChange(image, 'image')}
          isEditing={isEditing}
        />
      </div>

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
              handleChange={(event) => handleTextChange(event, "description")}
            />

            <ComboList
              valueList={item.ingredients}
              dataList={ingredientsNames}
              handleValueAddition={handleIngredientAddition}
              handleValueRemoval={handleIngredientRemoval}
              fieldName="Ingredients"
              itemKey={item.name}
              isEditing={isEditing}
            />

            <div className="d-flex align-items-center gap-5">
              <Control
                type="price"
                step={0.1}
                itemKey={item.name}
                value={item.price}
                fieldName="Price"
                isEditing={isEditing}
                handleChange={(event) => handlePriceChange(event as React.ChangeEvent<HTMLInputElement>, "price")}
              />
            </div>

            <div className="d-flex gap-5">
              <Check
                itemKey={item.name}
                value={item.outOfStock}
                fieldName="Out Of Stock"
                isEditing={isEditing}
                handleChange={(event) => handleCheckChange(event, "outOfStock")}
              />
              <Check
                itemKey={item.name}
                value={item.disabled}
                fieldName="Disabled"
                isEditing={isEditing}
                handleChange={(event) => handleCheckChange(event, "disabled")}
              />
            </div> 
          </Form>
        </div>
      </div>
    </div>
  );
}