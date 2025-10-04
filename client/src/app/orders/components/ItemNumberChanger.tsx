import React, { MutableRefObject, useRef } from 'react';

import type { Dish } from '@models/Dish';
import type { Drink } from '@models/Drink';

import CardImage from "../../components/generic/card/CardImage";

import { Plus, Minus } from 'lucide-react';

import { BaseItem } from '@models/BaseItem';

interface CardItemProps {
  number: number;
  handleIncrement?: () => void;
  handleDecrement?: () => void;
};

export default function CardItem({
  number,
  handleIncrement,
  handleDecrement,
}: CardItemProps) {

  return (
    <div
      className='d-flex rounded'
        style={{
          width: 'fit-content',
        }}
      >
        <div
          className='d-flex align-items-center justify-content-center rounded-pill'
          style={{
            width: '25px',
            height: '25px',
            backgroundColor: 'rgba(240, 133, 56, 1)',
            color: 'white',
          }}
        >
          <Minus size={20} />
        </div>
        <div
          className='d-flex align-items-center justify-content-center px-3'
          style={{
            height: '25px',
          }}
        >
          <h5 className='m-0 p-0'>{number}</h5>
        </div>  
        <div
          className='d-flex align-items-center justify-content-center rounded-pill'
          style={{
            width: '25px',
            height: '25px',
            backgroundColor: 'rgba(240, 133, 56, 1)',
            color: 'white',
          }}
        >
          <Plus size={20} />
        </div>
        
      </div>
  );
}