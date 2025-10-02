import React, { MutableRefObject, useRef } from 'react';

import type { Dish } from '@models/Dish';
import type { Drink } from '@models/Drink';

import CardImage from "../../components/generic/card/CardImage";

import { Plus, Minus } from 'lucide-react';

import { BaseItem } from '@models/BaseItem';

interface CardItemProps {
  index: number;
  item: { section_name: string, ordered_dishes: {subItem: Dish | Drink, quantity: number}[] };
  section: string;
};

export default function CardItem({
  index,
  item,
  section,
}: CardItemProps) {


  return (
    <div key={index} className='d-flex gap-2 flex-column'>
      <h3
        className='d-flex justify-content-start m-0 p-1 w-100 py-3'
        style={{
          // backgroundColor: 'rgba(220, 24, 44, 1)',
          // color: 'white',
          // borderRadius: '20px',
          width: 'fit-content'
        }}
      >
        {section}
      </h3>
      <div className="d-flex flex-column gap-2">
        {item.ordered_dishes.map((orderedDish, index) => (
          <div
            key={index}
            className='d-flex'
            style={{
              borderRadius: '10px',
              // backgroundColor: 'white',
              // boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 6px',
              backgroundColor: 'rgba(235, 235, 235, 1)'
            }}
          >
            <div
              className='d-flex justify-content-center align-items-center'
              style={{
                // backgroundColor: 'rgba(224, 224, 224, 1)',
                borderTopLeftRadius: '20px',
                borderBottomLeftRadius: '20px',
                width: '50px',
                maxWidth: '50px',
              }}
            >
              <h5 className='m-0'>{orderedDish.quantity}</h5>
            </div>
            
            <div className='d-flex w-100 flex-grow-1 p-2'>
              <img
                src={orderedDish.subItem.imageUrl}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '10px',
                }}
              />
              <div
                className='w-100 p-2 px-3'
              >
                <div
                  className='d-flex justify-content-between w-100'
                >
                  <h5
                    className='m-0'
                    style={{ fontWeight: "bold" }}
                  >
                    {orderedDish.subItem.name}
                  </h5>
                  <div className='d-flex gap-3'>
                    {orderedDish.quantity > 1 && (
                      <h5 className='m-0'>{orderedDish.quantity} x</h5>
                    )}
                    <h5 className='m-0'>€ {orderedDish.subItem.price}</h5>
                  </div>
                </div>
                { "ingredients" in orderedDish.subItem && (
                  <h6>{orderedDish.subItem.ingredients.join(", ")}</h6>
                )}
              </div>
            </div>

            {/* <div
              className='d-flex justify-content-center align-items-center'
              style={{
                backgroundColor: 'rgba(220, 24, 44, 1)',
                borderTopRightRadius: '20px',
                borderBottomRightRadius: '20px',
                width: '60px',
                maxWidth: '60px',
              }}
            >
              <Trash size={25} color={"white"}/>
            </div> */}

          </div>
        ))}
      </div>
    </div>
  );
}