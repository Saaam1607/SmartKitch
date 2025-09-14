import React from 'react';

import { Drink } from '@models/Drink';
import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import CardImageSection from '../generic/card/CardImageSection'

import CardComponentProps from '../../types/props/CardComponentProps';


import '../../styles/card.css';

export default function DrinkCard({ item, getImage, isEditing, handleCheckChange, handleTextChange, handleImageChange, handlePriceChange }: CardComponentProps<Drink>) {

  return (
    <div className="d-flex flex-column flex-lg-row w-100" >
      
      <CardImageSection
        imageUrl={item.imageUrl}
        handleImageChange={handleImageChange}
        isEditing={isEditing}
      >
      </CardImageSection>

      <div className="d-flex w-100">
        <div
          className="w-100 p-2 ps-3 flex-grow-1"
          style={{
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          <Form isEditing={isEditing}>

            <Title title={item.name} />
            
            <Control
              type="textarea"
              itemKey={item.name}
              value={item.description}
              fieldName="Description"
              isEditing={isEditing}
              handleChange={(event) => handleTextChange(event, "description")}
            />

            <div className="d-flex align-items-center gap-5">
              <Control
                type="price"
                step={0.1}
                itemKey={item.name}
                value={item.price}
                fieldName="Price"
                isEditing={isEditing}
                handleChange={(event) => handlePriceChange(event as React.ChangeEvent<HTMLInputElement>, "price")}
              />
            </div>

            <div className="d-flex gap-5">
              <Check
                itemKey={item.name}
                value={item.outOfStock}
                fieldName="Out Of Stock"
                isEditing={isEditing}
                handleChange={(event) => handleCheckChange(event, "outOfStock")}
              />
              <Check
                itemKey={item.name}
                value={item.disabled}
                fieldName="Disabled"
                isEditing={isEditing}
                handleChange={(event) => handleCheckChange(event, "disabled")}
              />
            </div> 
          </Form>
        </div>
      </div>
    </div>
  );
}