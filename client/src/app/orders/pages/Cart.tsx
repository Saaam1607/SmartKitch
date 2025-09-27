import React, { useState, useEffect } from 'react';

import type { Order } from '@models/Order';

import { Trash, Clipboard, User, Send } from 'lucide-react';

const initialOrder: Order = {
  id: 0,
  table_number: 505,
  waiter: "Bomber",
  taken_at: new Date("2025-09-27T12:25:47.544Z"),
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

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(calculateOrderTotal(newOrder));
  })

  function calculateOrderTotal(order: Order): number {
    let total = 0;

    for (const section of order.dishes_body) {
      for (const { dish, quantity } of section.ordered_dishes) {
        total += dish.price * quantity;
      }
    }

    for (const section of order.drinks_body) {
      for (const { dish, quantity } of section.ordered_drinks) {
        total += dish.price * quantity;
      }
    }

    return total;
  }

  return (
    <div
      className="d-flex flex-column gap-2 my-2 align-items-start w-100 px-4 customScrollbar"
      style={{ overflow: 'auto', flex: 1, paddingBottom: '100px' }}
    >
      <div
        className='d-flex justify-content-between align-items-start w-100 p-2 px-4'
        style={{
          backgroundColor: 'rgba(245, 245, 245, 1)',
          borderRadius: '10px',
        }}
      >
        <div className='d-flex gap-3 align-items-center'>
          <Clipboard size={30}/>
          <h3 className='m-0'>{newOrder.table_number}</h3>
        </div>
        <div className='d-flex gap-3 align-items-center'>
          <h3 className='m-0'>{newOrder.waiter}</h3>
          <User size={30}/>
        </div>
      </div>
                        
      <div
        className="d-flex flex-column w-100"
      >
        <h3
          className='m-0 p-1 px-5'
          style={{
            backgroundColor: 'rgba(245, 245, 245, 1)',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            width: 'fit-content'
          }}
        >
          Dishes
        </h3>
        <div
          className='d-flex flex-column p-4'
          style={{
            backgroundColor: 'rgba(245, 245, 245, 1)',
            borderRadius: '10px',
            borderTopLeftRadius: '0px',
          }}
        >
          {newOrder.dishes_body.map((item, index) => (
            <div key={index} className='d-flex flex-column'>
              <h3
                className='d-flex justify-content-center m-0 p-1 px-5 w-100'
                style={{
                  backgroundColor: 'rgba(220, 24, 44, 1)',
                  color: 'white',
                  borderRadius: '20px',
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
                      backgroundColor: 'white',
                      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 6px',
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
                      <h2 className='m-0'>{orderedDish.quantity}</h2>
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
          ))}
        </div>
      </div>

      <div
        className='d-flex justify-content-between w-100 p-2 px-4 rounded-pill'
        style={{
          backgroundColor: 'rgba(29, 69, 42, 1)',
          color: 'white',
        }}
      >
        <h3 className='m-0'>Total</h3>
        <h3 className='m-0'>€ {totalPrice}</h3>
      </div>

      <div className='d-flex justify-content-center  w-100'>
        <button
          className='btn btn-success d-flex justify-content-center align-items-center gap-2 p-2 px-4 rounded-pill'
          style={{ width: '250px', fontSize: '1.25rem' }}
        >
          <Send size={20}/>
          Send
        </button>
      </div>


            
    </div>
  );
}