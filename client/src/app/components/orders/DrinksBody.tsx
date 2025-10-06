import React from 'react';

import { Order, DishOrderBody, DrinkOrderBody } from '@models/Order';

import ServedIcon from './ServedIcon';

import { Wine, Pizza } from 'lucide-react';

interface DrinksBodyProps {
  drinkBody: DrinkOrderBody[];
  isServed: boolean;
}

export default function DrinksBody({ drinkBody, isServed } : DrinksBodyProps ) {
  return (
    <div
      className=''
      style={{
        height: 'fit-content',
      }}
    >
      <div className='d-flex align-items-center gap-2'>
        <Wine size={20} />
        <h5 className='m-0 p-0'>Drinks</h5> 
        <ServedIcon isServed={isServed} />
      </div>
      
      <div className='d-flex gap-2'>
        {drinkBody.map((section, index) => (
          <div
            key={index}
            className='p-2 px-3 rounded'
            style={{
              background: 'linear-gradient(to right, rgba(255, 244, 207, 1), rgb(255, 240, 179))'
            }}
          >
            <h5 className='m-0 p-0'>{section.section_name}</h5>
            {section.ordered_drinks.map((ordered_drink, index) => (
              <div key={index}>
                <h6
                  className='m-0 ms-2 p-0'
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {ordered_drink.quantity} x {ordered_drink.drink.name}
                </h6>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}