import React, { useState, useEffect } from 'react';

import DishProp from '../../types/DishProp';

import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';
import MenuComboList from '../generic/form/MenuComboList';

import CardComponentProps from '../../types/props/CardComponentProps';

import useStore from '../../state/useStore'

import '../../styles/card.css';

export default function MenuSectionDishesCard({ item, isEditing, handleCheckChange, handleTextChange, handleImageChange, handlePriceChange, handleArrayAddition, handleArrayRemoval }: CardComponentProps<DishProp>) {

  const { menuSections } = useStore();

  const [dishesNames, setDishesNames] = useState(menuSections.map(obj => obj.name));

  useEffect(() => {
    setDishesNames(menuSections.map(obj => obj.name))
  }, [menuSections])

  function handleIngredientAddition(ingredient: string) {
    handleArrayAddition(ingredient, "ingredients")
  }

  function handleIngredientRemoval(ingredient: string) {
    handleArrayRemoval(ingredient, "ingredients")
  }

  return (
    <div className="d-flex w-100" >
      {/* <div
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
      </div> */}

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
            
            <MenuComboList
              valueList={item.ingredients}
              dataList={dishesNames}
              handleValueAddition={handleIngredientAddition}
              handleValueRemoval={handleIngredientRemoval}
              fieldName="Dishes"
              itemKey={item.name}
              isEditing={isEditing}
            />

          </Form>
        </div>
      </div>
    </div>
  );
}