import React, { useState, useEffect } from 'react';

import { Dish } from "@my-org/shared";

import CardImage from '../card/CardImage';
import Control from '../form/Control';

import useStore from '../../../state/useStore'

import '../../../styles/card.css';

interface DishMiniCardProps {
  dishName: string;
}

export default function DishMiniCard({ dishName }: DishMiniCardProps) {

  const { dishes } = useStore();

  const [dish, setDish] = useState<Dish | null>(null);

  useEffect(() => {
    const foundDish = dishes.find(d => d.name === dishName);
    setDish(foundDish || null);
  }, [dishes, dishName]);


  return (
    <div
      className="d-flex w-100"
      style={{
        border: '1px solid lightgrey',
        // backgroundColor: 'rgba(231, 231, 231, 1)',
        borderRadius: '10px',
      }}
    >
      
      {dish && (
        <>
          <div
            className="d-flex align-items-center p-0"
            style={{
              minHeight: '100%'
            }}
          >
            <CardImage
              image={dish.image}
              size={100}
              borderRadius={10}
            />
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

                <div className="d-flex align-items-center justify-content-between w-100 gap-5">
                  
                  <h5 className="m-0 p-0">{dish.name}</h5>


                  <div className="" style={{ fontSize: '1.3rem' }}>
                    <Control
                      type="price"
                      step={0.1}
                      itemKey={dish.name}
                      value={dish.price}
                      fieldName="Price"
                      showLabel={false}
                      width={50}
                    />  
                  </div>
                  
                </div>
                
                <div className="d-flex gap-2" style={{ fontSize: '0.9rem' }}>
                  {dish.ingredients && dish.ingredients.length > 0 && (
                    <p className="p-0 m-0" style={{ width: "fit-content" }}>
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