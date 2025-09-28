import React from 'react';

import type { Dish } from '@models/Dish';
import type { Drink } from '@models/Drink';

import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';

import '../../styles/card.css';

interface DishMiniCardProps {
  item: Dish | Drink;
}

export default function DishMiniCard({ item }: DishMiniCardProps) {

  return (
    <div
      className="d-flex w-100"
      style={{
        border: '1px solid lightgrey',
        // backgroundColor: 'rgba(231, 231, 231, 1)',
        borderRadius: '10px',
      }}
    >
      {item && (
        <>
          <div
            className="d-flex align-items-center p-0"
            style={{ width: '100px', height: '100px' }}
          >
            <CardImage
              imageUrl={item.imageUrl}
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
              <h5 className="m-0 p-0">{item.name}</h5>
              
              <div className="d-flex gap-2" style={{ fontSize: '0.9rem' }}>
                {"ingredients" in item && item.ingredients.length > 0 && (
                  <p className="p-0 m-0" style={{ width: "fit-content" }}>
                    {item.ingredients.join(", ")}
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
                itemKey={item.name}
                value={item.price}
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