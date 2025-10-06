import React, { useState, useEffect } from 'react';

import { Order, DishOrderBody } from '@models/Order';

import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import CardImageSection from '../generic/card/CardImageSection'

import DishesBody from './DishesBody';
import DrinksBody from './DrinksBody';

import CardComponentProps from '../../types/props/CardComponentProps';


import '../../styles/card.css';

export default function OrderCard({ item, isEditing, handleCheckChange, handleTextChange, handleImageChange, handlePriceChange }: CardComponentProps<Order>) {

  const [totalPrice, setTotalPrice] = useState(0)

useEffect(() => {
  let total = 0;

  item.dishes_body.forEach(section => {
    section.ordered_dishes.forEach(order => {
      const price = order.dish.price;
      total += price * order.quantity;
    });
  });

  item.drinks_body.forEach(section => {
    section.ordered_drinks.forEach(order => {
      const price = order.drink.price;
      total += price * order.quantity;
    });
  });

  setTotalPrice(total)
}, [item]);

  return (
    <div className="d-flex flex-column flex-lg-row w-100" >

      {/* <CardImageSection
        imageUrl={item.imageUrl}
        handleImageChange={handleImageChange}
        isEditing={isEditing}
      /> */}

      <div className="d-flex w-100">
        <div
          className="w-100 p-2 ps-3 flex-grow-1"
          style={{
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          <Form isEditing={isEditing}>

            {/* <Title title={item.name} /> */}
            
            <Control
              type="text"
              itemKey={String(item.id)}
              value={item.table_number}
              fieldName="Table Nr."
              isEditing={isEditing}
              handleChange={(event) => handleTextChange(event, "table_number")}
            />

            <Control
              type="price"
              step={0.1}
              itemKey={String(item.id)}
              value={totalPrice}
              fieldName="Tot. Price"
              isEditing={isEditing}
              // handleChange={(event) => handlePriceChange(event as React.ChangeEvent<HTMLInputElement>, "price")}
            />

            <div className='d-flex gap-3'>
              <DrinksBody drinkBody={item.drinks_body} isServed={item.are_drinks_served} />
              <DishesBody dishBody={item.dishes_body} isServed={item.are_dishes_served}/>
            </div>

            <Control
              type="textarea"
              itemKey={String(item.id)}
              value={item.notes}
              fieldName="Notes"
              isEditing={isEditing}
              handleChange={(event) => handleTextChange(event, "notes")}
            />

          </Form>
        </div>
      </div>
    </div>
  );
}