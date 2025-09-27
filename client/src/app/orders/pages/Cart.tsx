import React, { useState, useEffect } from 'react';

import type { Order } from '@models/Order';

import { Trash } from 'lucide-react';

const initialOrder: Order = {
  id: 0,
  table_number: 505,
  waiter: "Bomber",
  taken_at: new Date("2025-09-27T12:25:47.544Z"), // se Order.taken_at è Date
  notes: "",
  dishes_body: [
    {
      section_name: "Pizze",
      ordered_dishes: [
        {
          dish: {
            name: "Quattro Formaggi",
            description: "",
            imageUrl: "https://ik.imagekit.io/SmartKitch/Quattro_Formaggi_6fpEbjlIE.jpg",
            outOfStock: false,
            disabled: false,
            price: 8.5,
            ingredients: ["aaaa", "bbbbb", "cccccc"],
          },
          quantity: 4,
        },
        {
          dish: {
            name: "Margherita",
            description: "pizza basic",
            imageUrl: "https://ik.imagekit.io/SmartKitch/Margherita_P1ZPwd8UE.jpg",
            outOfStock: false,
            disabled: false,
            price: 5.5,
            ingredients: ["aaaa", "bbbbb", "cccccc"],
          },
          quantity: 1,
        },
      ],
    },
  ],
  drinks_body: [],
};

interface CartProps {
  newOrder: Order;
}

export default function Cart({
  newOrder,
}: CartProps) {

  return (
    <div
      className="d-flex flex-column align-items-start w-100 px-5 customScrollbar"
      style={{ overflow: 'auto', flex: 1, paddingBottom: '200px' }}
    >
            {/* <p>{JSON.stringify(initialOrder)}</p> */}
      
            <div className='d-flex flex-column align-items-center'>
              <h3>{initialOrder.table_number}</h3>
              <h3>{initialOrder.waiter}</h3>
            </div>
      
            <div
              className="d-flex flex-column w-100"
              style={{ overflow: 'auto', flex: 1, paddingBottom: '200px' }}
            >
              <h1
                className='m-0 p-1 px-5'
                style={{
                  backgroundColor: 'lightgrey',
                  borderRadius: '10px',
                  width: 'fit-content'
                }}
              >
                Dishes
              </h1>
              <div className='d-flex flex-column'>
                {initialOrder.dishes_body.map((item, index) => (
                  <div key={index} className='d-flex flex-column'>
                    <h3
                      className='m-0 p-1 px-5'
                      style={{
                        backgroundColor: 'rgba(220, 24, 44, 1)',
                        color: 'white',
                        borderRadius: '10px',
                        width: 'fit-content'
                      }}
                    >
                      {item.section_name}
                    </h3>
                    <div className="d-flex flex-column gap-2 my-2">
                      {item.ordered_dishes.map((orderedDish, index) => (
                        <div
                          key={index}
                          className='d-flex'
                          style={{
                            borderRadius: '20px',
                            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 6px',
                          }}
                        >
                          <div
                            className='d-flex justify-content-center align-items-center'
                            style={{
                              backgroundColor: 'rgba(224, 224, 224, 1)',
                              borderTopLeftRadius: '20px',
                              borderBottomLeftRadius: '20px',
                              width: '50px',
                              maxWidth: '50px',
                            }}
                          >
                            <h3 className='m-0'>{orderedDish.quantity}</h3>
                          </div>
                          
                          <div className='d-flex w-100 flex-grow-1'>
                            <img
                              src={orderedDish.dish.imageUrl}
                              style={{
                                width: '100px',
                                height: '100px',
                              }}
                            />
                            <div
                              className='w-100 p-2 px-3'
                            >
                              <div
                                className='d-flex justify-content-between w-100'
                              >
                                <h3>{orderedDish.dish.name}</h3>
                                <div className='d-flex gap-3'>
                                  {orderedDish.quantity > 1 && (
                                    <h4>{orderedDish.quantity} x</h4>
                                  )}
                                  <h3>€ {orderedDish.dish.price}</h3>
                                </div>
                              </div>
                              <h6>{orderedDish.dish.ingredients.join(", ")}</h6>
                            </div>
                          </div>

                          <div
                            className='d-flex justify-content-center align-items-center'
                            style={{
                              backgroundColor: 'rgba(220, 24, 44, 1)',
                              borderTopRightRadius: '20px',
                              borderBottomRightRadius: '20px',
                              width: '75px',
                              maxWidth: '75px',
                            }}
                          >
                            <Trash size={30} color={"white"}/>
                          </div>

                          
                          
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>


              {/* {initialOrder.ordered_dishes.map((item, index) => (
                <div key={index}> 
                  <p>{item.dish_name} ({item.quantity})</p>
                </div>
                // <MenuCard
                //   key={index}
                //   item={item}
                //   index={index}
                //   getDishQty={getDishQty}
                //   addItem={addItem}
                //   removeDishFromOrder={removeDishFromOrder}
                //   flyingRefs={flyingRefs}
                // />
              ))} */}
            </div>
    </div>
  );
}