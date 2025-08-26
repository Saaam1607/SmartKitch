import React, { useState, useEffect } from 'react';

import type { BaseItem } from '@models/BaseItem';
import type { Dish } from '@models/Dish';
import type { Ingredient } from '@models/Ingredient';

import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';
import ComboList from '../generic/form/ComboList';

import CardComponentProps from '../../types/props/CardComponentProps';

import useStore from '../../state/useStore'

import '../../styles/card.css';

import ColorThief from 'colorthief';


export default function DishCard<T extends BaseItem>({ item, isHovered, isEditing, handleCheckChange, handleTextChange, handleImageChange, handlePriceChange, handleArrayAddition, handleArrayRemoval }: CardComponentProps<Dish>) {

  const ingredients = useStore((state) => state.ingredients);

  const [ingredientsNames, setIngredientsNames] = useState(ingredients.map(obj => obj.name));

  const [mainColor, setMainColor] = useState<[number, number, number] | null>(null); // default bianco

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // serve se l'immagine viene da un dominio esterno
    img.src = item.image;

    img.onload = () => {
      const colorThief = new ColorThief();
      const color: [number, number, number] = colorThief.getColor(img); // ritorna [R,G,B]
      setMainColor(color);
    };
  }, [item]);

  useEffect(() => {
    setIngredientsNames(ingredients.map(obj => obj.name))
  }, [ingredients])

  function handleIngredientAddition(ingredient: string) {
    if (handleArrayAddition) {
      handleArrayAddition(ingredient, "ingredients")
    }
  }

  function handleIngredientRemoval(ingredient: string) {
    if (handleArrayRemoval) {
      handleArrayRemoval(ingredient, "ingredients")
    }
  }

  return (
    <div

      className="d-flex w-100"
    >
      <div
        className="d-flex align-items-center p-3"
        style={{
          minHeight: '100%',
          background: mainColor && mainColor.length > 0
            ? `linear-gradient(to right, rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}) 75%, transparent 25%)`
            : "#ffffff",
          transition: "opacity 0.5s ease",
          opacity: mainColor && mainColor.length > 0 ? 1 : 0,
          borderTopLeftRadius: "15px",
          borderBottomLeftRadius: "15px",
        }}
      >
        <div style={{borderRadius: "15px"}}>
          <CardImage
            image={item.image}
            size={175}
            borderSize={8}
            // isHovered={isHovered}
            updateImage={(image: string) => handleImageChange(image, 'image')}
            isEditing={isEditing}
          />
        </div> 
        
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