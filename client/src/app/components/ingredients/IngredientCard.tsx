import React from 'react';

import IngredientProp from '../../types/IngredientProp';

import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';


import CardComponentProps from '../../types/props/CardComponentProps';


import '../../styles/card.css';

export default function IngredientCard({ item, isEditing, edit }: CardComponentProps<IngredientProp>) {

  function handelImageChange(newImage: string) {
    if (!item) return;
    const newItem = { ...item, image: newImage };
    edit(newItem);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const newItem = { ...item, description: event.target.value };
    edit(newItem);
  }

  function handleIsAddableChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newItem = { ...item, isAddable: event.target.checked };
    edit(newItem);
  }

  function handleAdditionPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const num = event.target.value === '' ? '' : parseFloat(event.target.value);
    const newItem: DishProp = { ...item, additionPrice: parseFloat(num) };
    edit(newItem);
  }

  function handleOutOfStockChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!item) return;
    const newItem = { ...item, outOfStock: event.target.checked };
    edit(newItem);
  }

  function handleDisabledChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!item) return;
    const newItem = { ...item, disabled: event.target.checked };
    edit(newItem);
  }

  return (
    <div className="d-flex w-100" >
      <div
        className="d-flex align-items-center p-2"
        style={{
          minHeight: '100%'
        }}
      >
        <CardImage
          image={item.image}
          updateImage={handelImageChange}
          isEditing={isEditing}
        />
      </div>

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
              handleChange={handleDescriptionChange}
            />

            <div className="d-flex align-items-center gap-5">
              <Check
                itemKey={item.name}
                value={item.isAddable}
                fieldName="Is Addable"
                isEditing={isEditing}
                handleChange={handleIsAddableChange}
              />

              <Control
                type="price"
                step={0.1}
                itemKey={item.name}
                value={item.additionPrice}
                fieldName="Addition Price"
                isEditing={isEditing}
                handleChange={handleAdditionPriceChange}
              />
            </div>

            <div className="d-flex gap-5">
              <Check
                itemKey={item.name}
                value={item.outOfStock}
                fieldName="Out Of Stock"
                isEditing={isEditing}
                handleChange={handleOutOfStockChange}
              />
              <Check
                itemKey={item.name}
                value={item.disabled}
                fieldName="Disabled"
                isEditing={isEditing}
                handleChange={handleDisabledChange}
              />
            </div> 
          </Form>
        </div>
      </div>
    </div>
  );
}