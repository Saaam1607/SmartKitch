import React, { useEffect, useState } from 'react';

import { Card, Form, Button, Image as BootstrapImage } from 'react-bootstrap';

import { Plus, Minus } from 'lucide-react';

import '../../../styles/scrollbar.css';
import '../../../styles/control.css';

const commonStyle = {
  width: '100%',
  padding: '0.2rem 0.5rem',
  outline: 'none',
  color: '#212529',
}

const getCommonEditingStyle = (isEditing: boolean): React.CSSProperties => ({
  backgroundColor: isEditing ? 'white' : 'transparent',
  border: isEditing ? '2px solid rgb(30, 109, 206)' : '2px solid lightgrey',
});

function TextArea({ item, value, fieldName, isEditing, handleChange }) {
  return (
    <textarea
      className="ps-2 rounded customScrollbar customTextarea"
      value={value}
      id={`${fieldName}-${item.name}`}
      onChange={handleChange}
      style={{
        ...commonStyle,
        ...getCommonEditingStyle(isEditing),
        lineHeight: '1.1',
        height: '60px',
        resize: 'none',
      }}
    />
  );
}

function PriceInput({ type, step, item, value, fieldName, isEditing, handleChange }) {

  const handleIncrement = () => {
    const newValue = parseFloat(value || '0') + parseFloat(step);
    fakeChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = parseFloat(value || '0') - parseFloat(step);
    fakeChange(newValue);
  };

  const fakeChange = (newVal: number) => {
    const fixedValue = newVal.toFixed(2);
    const fakeEvent = {
      target: {
        value: fixedValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(fakeEvent);
  };

  return (
    <div className="d-flex align-items-center" >
      <span className="me-1" style={{ fontSize: '1.2rem' }}>€</span>
      
      <div
        className="d-flex rounded"
        style={{
          ...commonStyle,
          ...getCommonEditingStyle(isEditing),
          width: '100px'
        }}
      >
        <input
          type="number"
          step={step}
          className="ps-2 rounded customScrollbar"
          value={value}
          id={`${fieldName}-${item.name}`}
          onChange={handleChange}
          style={{
            width: '100%',
            border: 0,
            backgroundColor: 'transparent',
            outline: 'none',
            color: '#212529',
          }}
        />
        { isEditing && (
          <div className="d-flex flex-column" style={{ height: '2rem' }}>
            <button
              type="button"
              onClick={handleIncrement}
              className="btn btn-primary p-0 rounded-0 rounded-top d-flex align-items-center justify-content-center"
              style={{
                height: '1rem',
                width: '1.5rem',
              }}
            >
              <Plus size={10}/>
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="btn btn-primary p-0 rounded-0 rounded-bottom d-flex align-items-center justify-content-center"
              style={{
                height: '1rem',
                width: '1.5rem',
              }}
            >
              <Minus size={10}/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TextInput({ type, item, value, fieldName, isEditing, handleChange }) {
  return (
    <input
      type={type}
      className="ps-2 rounded customScrollbar"
      value={value}
      id={`${fieldName}-${item.name}`}
      onChange={handleChange}
      style={{
        ...commonStyle,
        ...getCommonEditingStyle(isEditing),
      }}
    />
  );
}

export default function Control({ type, step, item, value, fieldName, isEditing, handleChange }) {

  return (
    <Form.Group className="mb-1 d-flex flex-column align-items-left">
      <Form.Label
        className="m-0 ms-2"
        htmlFor={`${fieldName}-${item.name}`}
        style={{
          fontSize: '0.85rem',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        {fieldName}
      </Form.Label>

      {type === 'textarea' && (
        <TextArea
          item={item}
          value={value}
          fieldName={fieldName}
          isEditing={isEditing}
          handleChange={handleChange}
        />
      )}
      {type === 'text' && (
        <TextInput
          type={type}
          item={item}
          value={value}
          fieldName={fieldName}
          isEditing={isEditing}
          handleChange={handleChange}
        />
      )}
      {type === 'price' && (
        <PriceInput
          type={type}
          step={step}
          item={item}
          value={value}
          fieldName={fieldName}
          isEditing={isEditing}
          handleChange={handleChange}
        />
      )}
    </Form.Group>
  );
}
