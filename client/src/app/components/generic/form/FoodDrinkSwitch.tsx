import React from 'react';

import { Form } from 'react-bootstrap';

import { Hamburger, CupSoda } from 'lucide-react';

import '../../../styles/formCheck.css';

interface FoodDrinkSwitchProps {
  itemKey: string;
  value: boolean;
  fieldName: string;
  isEditing: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FoodDrinkSwitch({ itemKey, value, fieldName, isEditing, handleChange }: FoodDrinkSwitchProps) {

  function selectFood() {
    changeValue(false)
  }

  function selectDrink() {
    changeValue(true)
  }

  function changeValue(newValue: boolean) {
    const fakeEvent = {
      target: { checked: newValue }
    } as React.ChangeEvent<HTMLInputElement>;

    handleChange(fakeEvent);
  }
  
  return (
    <Form.Group className="mb-1">
      <div
        className='d-flex gap-1 p-0 rounded-pill'
        style={{
          width: 'fit-content',
          backgroundColor: isEditing ? 'silver' : 'transparent',
          border: isEditing ? '2px solid rgb(219, 123, 33)' : '2px solid white',
          pointerEvents: isEditing ? 'auto' : 'none',
        }}
      >
        {(isEditing || !value) && (
          <button
            className='btn d-flex align-items-center gap-1 m-0 p-0 px-2 rounded-pill'
            type="button"
            onClick={selectFood}
            style={{
              backgroundColor: !value ? 'white' : 'transparent',
              opacity: !value ? '1' : '0.4',
            }}
          >
            <Hamburger size={20}/>
            Food
          </button>
        )}
        {(isEditing || value) && (
          <button
            className='btn d-flex align-items-center gap-1 m-0 p-0 px-2 rounded-pill'
            type="button"
            onClick={selectDrink}
            style={{
              backgroundColor: value ? 'white' : 'transparent',
              opacity: value ? '1' : '0.4',
              display: !isEditing && value ? 'block' : 'none'
            }}
          >
            Drink
            <CupSoda size={20}/>
          </button>
        )}
        
      </div>
    </Form.Group>
  );
}
