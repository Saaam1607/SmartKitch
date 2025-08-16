import React, { useState, useEffect } from 'react';

import DishProp from '../../types/DishProp';

import Form from '../form/Form';
import Title from '../form/Title';
import CardImage from '../card/CardImage';
import Control from '../form/Control';
import Check from '../form/Check';
import ComboList from '../form/ComboList';

import CardComponentProps from '../../types/props/CardComponentProps';

import useStore from '../../../state/useStore'

import '../../../styles/card.css';

interface DishMiniCardProps {
  dishName: string;
}

export default function DishMicroCard({ dishName }: DishMiniCardProps) {

  const { dishes } = useStore();

  const [dish, setDish] = useState<DishProp | null>(null);

  useEffect(() => {
    const foundDish = dishes.find(d => d.name === dishName);
    setDish(foundDish || null);
  }, [dishes, dishName]);


  return (
    <div
      className="d-flex w-100"
      style={{
        backgroundColor: 'rgba(231, 231, 231, 1)',
        borderRadius: '15px',
      }}
    >
      
      {dish && (
        <>
          <div
            className="d-flex align-items-center p-0"
            style={{ minHeight: '100%' }}
          >
            <CardImage image={dish.image} size={60} />
          </div>

          <div className="d-flex w-100">
            <div
              className="w-100 p-0 px-2 flex-grow-1 w-100"
              style={{
                borderTopRightRadius: "15px",
                borderBottomRightRadius: "15px",
              }}
            >
              <div>

                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="m-0 p-0">
                    {dish.name}
                  </h6>
                </div>
                
                <div className="d-flex gap-1" >
                  {dish.ingredients && dish.ingredients.length > 0 && (
                    <p className="p-0 m-0" style={{ width: "fit-content", fontSize: "0.8rem" }}>
                      {dish.ingredients.join(", ")}
                    </p>
                  )}
                </div>

              </div>
            </div>
          </div>
        </>
      )}
      
      
    </div>
  );
}