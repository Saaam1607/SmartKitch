import React, { MutableRefObject, useRef } from 'react';

import type { Dish } from '@models/Dish';
import type { Drink } from '@models/Drink';

import CardImage from "../../components/generic/card/CardImage";

import { Plus, Minus } from 'lucide-react';

import { BaseItem } from '@models/BaseItem';

type CardItem = BaseItem & {
  imageUrl: string;
  price: number;
}

interface MenuCardProps {
  item: { item: Dish; dataType: string; } | { item: Drink; dataType: string; };
  section: string;
  index: number;
  getItemQuantity: (currentItem: Dish | Drink, section: string, type: string) => number;
  addItem: (index: number, item: Dish | Drink, itemType: string, section: string) => void;
  removeItemFromOrder: (item: Dish | Drink, type: string, section: string) => void;
  flyingRefs: MutableRefObject<(HTMLDivElement | null)[]>
};

export default function MenuCard({
  item,
  section,
  index,
  getItemQuantity,
  addItem,
  removeItemFromOrder,
  flyingRefs,
}: MenuCardProps) {

  const quantity = getItemQuantity(item.item, section, item.dataType);

  return (
    <div
      key={item.item.name}
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
        onClick={() => { addItem(index, item.item, item.dataType, section) }}
      >
        <div
          style={{ width: '150px', height: '150px' }}
          ref={(el) => {
            flyingRefs.current[index] = el;
          }}
        >
          <CardImage imageUrl={item.item.imageUrl} />
        </div>
        <div className="w-100">
          <h5 className="m-0 p-0">{item.item.name}</h5>
          <p className="m-0">{item.item.description}</p>
          <p className="m-0">€ {item.item.price}</p>
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
              onClick={() => removeItemFromOrder(item.item, section, item.dataType)}
            />
            <h3 className="m-0 p-1">{quantity}</h3>
            <Plus
              size={25}
              color={"white"}
              className="mx-3"
              style={{
                cursor: 'pointer',
              }}
              onClick={() => { addItem(index, item.item, item.dataType, section) }}
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
            onClick={() => { addItem(index, item.item, item.dataType, section) }}
          >
            Add
          </button>
        )}
        
      </div>
    </div>
  );
}