import React, { MutableRefObject, useRef } from 'react';

import CardImage from "../../components/generic/card/CardImage";

import { Plus, Minus } from 'lucide-react';

import { BaseItem } from '@models/BaseItem';

type CardItem = BaseItem & {
  imageUrl: string;
  price: number;
}

interface OrderMenuCardProps {
  item: CardItem;
  index: number;
  getDishQty: (itemName: string) => number;
  addItem: (index: number, itemName: string, imageUrl: string) => void;
  removeDishFromOrder: (dishName: string) => void;
  flyingRefs: MutableRefObject<(HTMLDivElement | null)[]>
};

export default function OrderMenuCard({
  item,
  index,
  getDishQty,
  addItem,
  removeDishFromOrder,
  flyingRefs,
}: OrderMenuCardProps) {

  const quantity = getDishQty(item.name);

  return (
    <div
      key={item.name}
      className="d-flex flex-column gap-2"
      style={{
        borderRadius: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px',
        width: '15rem',
        minWidth: '15rem',
        height: '18rem',
        minHeight: '18rem',
        cursor: 'pointer',
      }}
    >
      <div
        className="w-100 flex-grow-1 d-flex flex-column justify-content-center align-items-center p-2"
        onClick={() => { addItem(index, item.name, item.imageUrl) }}
      >
        <div
          style={{ width: '150px', height: '150px' }}
          ref={(el) => {
            flyingRefs.current[index] = el;
          }}
        >
          <CardImage imageUrl={item.imageUrl} />
        </div>
        <div className="w-100">
          <h5 className="m-0 p-0">{item.name}</h5>
          <p className="m-0">{item.description}</p>
          <p className="m-0">€ {item.price}</p>
        </div>
      </div>
      <div
        className="d-flex justify-content-between align-items-center w-100"
        style={{
          borderBottomRightRadius: '20px',
          borderBottomLeftRadius: '20px',
          backgroundColor: quantity > 0 ? 'rgb(220, 24, 44)' : 'rgba(165, 165, 165, 1)',
          color: 'white',
          textAlign: 'center',
          height: '3rem',
        }}
      >
        {quantity > 0 ? (
          <>
            <Minus
              size={25}
              color={"white"}
              className="mx-3"
              style={{
                cursor: 'pointer',
              }}
              onClick={() => removeDishFromOrder(item.name)}
            />
            <h3 className="m-0 p-1">{quantity}</h3>
            <Plus
              size={25}
              color={"white"}
              className="mx-3"
              style={{
                cursor: 'pointer',
              }}
              onClick={() => { addItem(index, item.name, item.imageUrl) }}
            />
          </>
        ) : (
          <button
            className="btn w-100"
            style={{
              color: 'white',
              backgroundColor: 'transparent',
              border: 'none',
            }}
            onClick={() => { addItem(index, item.name, item.imageUrl) }}
          >
            Add
          </button>
        )}
        
      </div>
    </div>
  );
}