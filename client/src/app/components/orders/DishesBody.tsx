import React from 'react';

import { Order, DishOrderBody, DrinkOrderBody } from '@models/Order';

interface DishesBodyProps {
  dishBody: DishOrderBody[];
}

export default function DishesBody({ dishBody } : DishesBodyProps ) {
  return (
    <div>
      {dishBody.map((section, index) => (
        <div key={index}>
          <h5 className='m-0 p-0'>{section.section_name}</h5>
          {section.ordered_dishes.map((ordered_dish, index) => (
            <div key={index}>
              <h6 className='m-0 ms-2 p-0'>{ordered_dish.quantity} x {ordered_dish.dish.name}</h6>
              <p
                className='m-0 ms-4 p-0'
                style={{
                  fontSize: '0.8rem'
                }}
              >
                {ordered_dish.dish.ingredients.join(", ")}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}