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

export default function DishMiniCard({ dishName }: DishMiniCardProps) {

  console.log("S_--")
  console.log(dishName);

  const { dishes } = useStore();

  const [dish, setDish] = useState<DishProp | null>(null);

  useEffect(() => {
    const foundDish = dishes.find(d => d.name === dishName);
    setDish(foundDish || null);
  }, [dishes, dishName]);


  return (
    <div className="d-flex w-100" >
      
      {dish && (
        <>
          <div
            className="d-flex align-items-center p-3"
            style={{
              minHeight: '100%'
            }}
          >
            <CardImage
              image={dish.image}
              size={100}
            />
          </div>

          <div className="d-flex w-100 ">
            <div
              className="w-100 p-2 ps-3 flex-grow-1 w-100"
              style={{
                borderTopRightRadius: "15px",
                borderBottomRightRadius: "15px",
              }}
            >
              <Form isEditing={false}>

                <div className="d-flex align-items-center justify-content-between w-100">
                  <Title title={dish.name} />
                  <Control
                    type="price"
                    step={0.1}
                    itemKey={dish.name}
                    value={dish.price}
                    fieldName="Price"
                  />
                </div>
                
                
                {/* <Control
                  type="textarea"
                  itemKey={dish.name}
                  value={dish.description}
                  fieldName="Description"
                /> */}


              </Form>
            </div>
          </div>
        </>
      )}
      
      
    </div>
  );
}