import React from 'react';

import type { Dish } from '@models/Dish';

import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';

import '../../styles/card.css';

interface DishMiniCardProps {
  dish: Dish;
}

export default function DishMiniCard({ dish }: DishMiniCardProps) {

  return (
    <div
      className="d-flex w-100"
      style={{
        border: '1px solid lightgrey',
        // backgroundColor: 'rgba(231, 231, 231, 1)',
        borderRadius: '10px',
      }}
    >
      {dish && (
        <>
          <div
            className="d-flex align-items-center p-0"
            style={{ width: '100px', height: '100px' }}
          >
            <CardImage
              imageUrl={dish.imageUrl}
              borderRadius={10}
            />
          </div>

          <div
            className="d-flex w-100 p-0 px-2 flex-grow-1 w-100"
            style={{
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "15px",
            }}
          >

            <div className="d-flex flex-column w-100 gap-1">
              <h5 className="m-0 p-0">{dish.name}</h5>
              <div className="d-flex gap-2" style={{ fontSize: '0.9rem' }}>
                {dish.ingredients && dish.ingredients.length > 0 && (
                  <p className="p-0 m-0" style={{ width: "fit-content" }}>
                    {dish.ingredients.join(", ")}
                  </p>
                )}
              </div>
            </div>

            <div
              className="d-flex align-items-center"
              style={{ fontSize: '1.3rem' }}
            >
              <Control
                type="price"
                step={0.1}
                itemKey={dish.name}
                value={dish.price}
                fieldName="Price"
                showLabel={false}
                width={50}
              />  
            </div>

          </div>
        </>
      )}
    </div>
  );
}