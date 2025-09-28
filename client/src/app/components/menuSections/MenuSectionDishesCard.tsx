import React, { useState, useEffect } from 'react';

import { MenuSection } from '@models/MenuSection';

import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import MenuComboList from '../generic/form/MenuComboList';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';
import FoodDrinkSwitch from '../generic/form/FoodDrinkSwitch';

import CardComponentProps from '../../types/props/CardComponentProps';

import type { Dish } from '@models/Dish';
import type { Drink } from '@models/Drink';


import useStore from '../../state/useStore'

import '../../styles/card.css';

export default function MenuSectionDishesCard({ item, isEditing, handleCheckChange, handleTextChange, handleImageChange, handlePriceChange, handleArraySet }: CardComponentProps<MenuSection>) {

  const { menuSections } = useStore();
  const { dishes, drinks } = useStore();

  // all dishes with their menu section (if any)
  const [availableDishes, setAvailableDishes] = useState<{ item: Dish; menuSection: string; type: string }[]>([]);
  const [availableDrinks, setAvailableDrinks] = useState<{ item: Drink; menuSection: string; type: string }[]>([]);

  useEffect(() => {
    setAvailableDishes(
      dishes.map(dish => {
        const menuSection = menuSections.find(section => section.dishes.includes(dish.name))?.name || '';
        return {
          item: dish,
          menuSection: menuSection !== item.name ? menuSection : '',
          type: "dish"
        };
      })
    );
    setAvailableDrinks(
      drinks.map(drink => {
        const menuSection = menuSections.find(section => section.dishes.includes(drink.name))?.name || '';
        return {
          item: drink,
          menuSection: menuSection !== item.name ? menuSection : '',
          type: "drink"
        };
      }),
    );
  }, [drinks, dishes, menuSections])

  return (
    <div className="d-flex w-100" >
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
            
            <FoodDrinkSwitch
              itemKey={item.name}
              value={item.isDrink}
              fieldName="IsDrink"
              isEditing={isEditing}
              handleChange={(event) => handleCheckChange(event, "isDrink")}
            />

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

            <MenuComboList
              selectedDishesNames={item.isDrink ? item.drinks : item.dishes}
              allItemsWithMenu={item.isDrink ? availableDrinks : availableDishes}
              handleArraySet={handleArraySet}
              fieldName={item.isDrink ? "drinks" : "dishes"}
              itemKey={item.name}
              isEditing={isEditing}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}