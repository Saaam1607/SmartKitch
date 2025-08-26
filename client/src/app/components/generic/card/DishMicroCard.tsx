import React, { useState, useEffect } from 'react';

import type { Dish } from '@models/Dish';

import CardImage from '../card/CardImage';

import useStore from '../../../state/useStore'

import '../../../styles/card.css';

interface DishMiniCardProps {
  dishName: string;
  isSelected: boolean;
  menuSection: string;
}

export default function DishMicroCard({ dishName, isSelected, menuSection }: DishMiniCardProps) {

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
        borderRadius: "15px",
        backgroundColor: isSelected ?  'rgba(231, 231, 231, 1)' : 'rgba(231, 231, 231, 1)',        
        opacity: menuSection ? '0.4' : '1',
        border: isSelected ? '2px solid rgb(219, 123, 33)' : "2px solid transparent",
        color: isSelected ? 'rgba(165, 89, 18, 1)' : 'black',
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

                <div className="d-flex align-items-center gap-2">
                  <h6 className="m-0 p-0">
                    {dish.name}
                  </h6>
                  {menuSection && (
                    <>
                    <p className="m-0 p-0">-</p>
                    <strong
                      className="m-0 p-0"
                      style={{
                        fontSize: "1rem",
                        color: "rgba(0, 150, 170, 1)",
                      }}
                    >
                      {menuSection}
                    </strong>
                    </>
                  )}
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