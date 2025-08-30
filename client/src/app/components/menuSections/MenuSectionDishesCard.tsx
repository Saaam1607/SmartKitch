import React, { useState, useEffect } from 'react';

import { MenuSection } from '@models/MenuSection';

import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import MenuComboList from '../generic/form/MenuComboList';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import CardComponentProps from '../../types/props/CardComponentProps';

import useStore from '../../state/useStore'

import '../../styles/card.css';

export default function MenuSectionDishesCard({ item, isEditing, handleCheckChange, handleTextChange, handleImageChange, handlePriceChange, handleArraySet }: CardComponentProps<MenuSection>) {

  const { menuSections } = useStore();
  const { dishes } = useStore();

  const [availableDishes, setAvailableDishes] = useState<{ item: string; menuSection: string }[]>([]);

  useEffect(() => {
    return setAvailableDishes(dishes.map(dish => {

      const menuSection = menuSections.find(section => section.dishes.includes(dish.name))?.name || '';

      return {
        item: dish.name,
        menuSection: menuSection !== item.name ? menuSection : '',
      };
    }));
  }, [menuSections])

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
              valueList={item.dishes}
              dataList={availableDishes}
              handleArraySet={handleArraySet}
              fieldName="dishes"
              itemKey={item.name}
              isEditing={isEditing}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}