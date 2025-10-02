import React, { useState, useEffect } from 'react';

import type { Order } from '@models/Order';

import { Trash, Clipboard, User, Send, ShoppingCart } from 'lucide-react';

import CartItem from '../components/CartItem'


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
      for (const { drink, quantity } of section.ordered_drinks) {
        total += drink.price * quantity;
      }
    }

    return total;
  }

  return (
    <div
      className="d-flex flex-column gap-2 align-items-start w-100 customScrollbar px-3"
      style={{
        overflow: 'auto',
        flex: 1,
        paddingBottom: '100px',
        backgroundColor: 'rgba(178, 32, 32, 1)',
      }}
    >
      <div className='w-100 d-flex align-items-center justify-content-between px-4 py-3 gap-2'>
        
        <div className='d-flex align-items-center gap-3'>
          <ShoppingCart size={40} strokeWidth={2.5} color='white' />
          <h1
            className='m-0'
            style={{ fontWeight: "bold", color: 'white' }}
          >
            Your Cart
          </h1>
        </div>

        <div
          className='d-flex flex-column gap-2 justify-content-center align-items-end'
        >
          <div className='d-flex gap-3 align-items-center'>
            <h3 className='m-0' style={{ color: 'white' }}>{newOrder.table_number}</h3>
            <Clipboard size={30} color='white' />
          </div>
          <div className='d-flex gap-3 align-items-center'>
            <h3 className='m-0' style={{ color: 'white' }}>{newOrder.waiter}</h3>
            <User size={30} color='white' />
          </div>
        </div>

      </div>

      <div
        className='w-100 p-4'
        style={{
          backgroundColor: "white",
          borderRadius: '50px',
        }}
      >
        {newOrder.drinks_body.length > 0 && (
          <div className="d-flex flex-column w-100" >
            <div
              className='d-flex flex-column'
              style={{
                borderRadius: '10px',
                borderTopLeftRadius: '0px',
              }}
            >
              {newOrder.drinks_body.map((item, index) => (
                <CartItem
                  key={index}
                  index={index}
                  item={{
                    section_name: item.section_name,
                    ordered_dishes: item.ordered_drinks.map(d => ({
                      subItem: d.drink,
                      quantity: d.quantity,
                    })),
                  }}
                  section={item.section_name}
                />
              ))}
            </div>
          </div>
        )}

        {newOrder.drinks_body.length > 0 && (
          <div className="d-flex flex-column w-100" >
            <div
              className='d-flex flex-column'
              style={{
                borderRadius: '10px',
                borderTopLeftRadius: '0px',
              }}
            >
              {newOrder.dishes_body.map((item, index) => (
                <CartItem
                  key={index}
                  index={index}
                  item={{
                    section_name: item.section_name,
                    ordered_dishes: item.ordered_dishes.map(d => ({
                      subItem: d.dish,
                      quantity: d.quantity,
                    })),
                  }}
                  section={item.section_name}
                />
              ))}
            </div>
          </div>
        )}

        <div className='my-4 d-flex flex-column gap-4'>

          <div
            className='d-flex justify-content-between w-100 p-2 px-4 rounded-pill'
            style={{
              // backgroundColor: 'rgba(29, 69, 42, 1)',
              // color: 'white',
            }}
          >
            <h4 className='m-0' style={{ fontWeight: "bold" }}>Total:</h4>
            <h4 className='m-0' style={{ fontWeight: "bold" }}>€ {totalPrice}</h4>
          </div>

          <div className='d-flex justify-content-center w-100'>
            <button
              className='btn btn-success d-flex justify-content-center align-items-center gap-2 p-2 px-4 rounded-pill'
              style={{ width: '500px', fontSize: '1.25rem' }}
            >
              <Send size={20}/>
              Send
            </button>
          </div>
        </div>

      </div>
            
    </div>
  );
}