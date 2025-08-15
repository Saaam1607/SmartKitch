import React, { useState, useEffect } from 'react';

import DishProp from '../../types/DishProp';

import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';
import ComboList from '../generic/form/ComboList';
import MenuComboList from '../generic/form/MenuComboList';

import CardComponentProps from '../../types/props/CardComponentProps';

import useStore from '../../state/useStore'

import '../../styles/card.css';

export default function MenuSectionCard({ item, isEditing, handleCheckChange, handleTextChange, handleImageChange, handlePriceChange, handleArrayAddition, handleArrayRemoval }: CardComponentProps<DishProp>) {

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
            
            <Control
              type="textarea"
              itemKey={item.name}
              value={item.description}
              fieldName="Description"
              isEditing={isEditing}
              handleChange={(event) => handleTextChange(event, "description")}
            />

            <div className="d-flex gap-5">
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