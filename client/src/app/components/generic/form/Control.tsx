import React, { useRef } from 'react';

import { Form } from 'react-bootstrap';

import '../../../styles/scrollbar.css';
import '../../../styles/control.css';

import useAutosizeTextArea from "./useAutosizeTextArea";

const commonStyle = {
  width: '100%',
  outline: 'none',
  color: 'inherit',
}

const getCommonEditingStyle = (isEditing: boolean): React.CSSProperties => ({
  backgroundColor: isEditing ? 'white' : 'transparent',
  border: isEditing ? '2px solid rgb(219, 123, 33)' : '2px solid transparent',
});

interface ControlProps {
  type: string;
  step?: number;
  itemKey: string;
  value: string | number;
  fieldName: string;
  showLabel?: boolean;
  width?: number;
  isEditing?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function Control({ type, step, itemKey, value, fieldName, isEditing, showLabel=true, width, handleChange=() => {}}  : ControlProps) {

  return (
    <Form.Group className="d-flex flex-column align-items-left">
      {showLabel && (
        <Form.Label
          className="m-0"
          htmlFor={`${fieldName}-${itemKey}`}
          style={{
            fontSize: '0.75rem',
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          {fieldName}
        </Form.Label>
      )}

      {type === 'textarea' && (
        <TextArea
          itemKey={itemKey}
          value={value as string}
          fieldName={fieldName}
          isEditing={isEditing}
          handleChange={handleChange}
        />
      )}
      {type === 'text' && (
        <TextInput
          type={type}
          itemKey={itemKey}
          value={value as string}
          fieldName={fieldName}
          isEditing={isEditing}
          handleChange={handleChange}
        />
      )}
      {type === 'price' && (
        <PriceInput
          type={type}
          step={step || 1}
          itemKey={itemKey}
          value={value as number}
          fieldName={fieldName}
          isEditing={isEditing}
          width={width}
          handleChange={handleChange}
        />
      )}
    </Form.Group>
  );
}

interface TextAreaProps {
  itemKey: string;
  value: string;
  fieldName: string;
  isEditing?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ itemKey, value, fieldName, isEditing, handleChange }: TextAreaProps) {
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <textarea
      className="p-1 customScrollbar"
      id="review-text"
      onChange={handleChange}
      placeholder=""
      ref={textAreaRef}
      value={value}
      readOnly={!isEditing}
      style={{
        ...commonStyle,
        ...getCommonEditingStyle(isEditing || false),
        resize: 'none',
        width: '100%',
        borderRadius: '0.25rem',
        overflowY: 'auto',
        minHeight: '36px',
      }}
    />
  );
}

interface PriceInputProps {
  type: string;
  step: number;
  itemKey: string;
  value: number;
  fieldName: string;
  isEditing?: boolean;
  width?: number;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function PriceInput({ type, step, itemKey, value, fieldName, isEditing, width, handleChange }: PriceInputProps) {

  const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;

  const handleIncrement = () => {
    const newValue = numericValue + step;
    fakeChange(newValue);
  };

  const handleDecrement = () => {
    if (numericValue > 0) {
      const newValue = numericValue - step;
      fakeChange(newValue);
    }
  };

  const fakeChange = (newVal: number) => {
    const fixedValue = newVal.toFixed(2);
    const fakeEvent = {
      target: {
        value: fixedValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    if (handleChange) {
      handleChange(fakeEvent);
    }
  };

  return (
    <div className="d-flex align-items-center" >
      <span className="me-1" style={{ fontSize: '1.2rem' }}>€</span>
      
      <div
        className="d-flex rounded"
        style={{
          ...commonStyle,
          ...getCommonEditingStyle(isEditing || false),
          ...width ? { width: `${width}px` } : { width: '100px' },
        }}
      >
        <input
          type="number"
          step={step}
          className="ps-2 rounded customScrollbar"
          value={value ?? ""}
          id={`${fieldName}-${itemKey}`}
          onChange={handleChange}
          readOnly={!isEditing}
          style={{
            color: 'inherit',
            width: '100%',
            border: 0,
            backgroundColor: 'transparent',
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
}

interface TextInputProps {
  type: string;
  itemKey: string;
  value: string;
  fieldName: string;
  isEditing?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({ type, itemKey, value, fieldName, isEditing, handleChange }: TextInputProps) {
  return (
    <input
      type={type}
      className="ps-2 rounded customScrollbar"
      value={value}
      id={`${fieldName}-${itemKey}`}
      onChange={handleChange}
      readOnly={!isEditing}
      style={{
        ...commonStyle,
        ...getCommonEditingStyle(isEditing || false),
      }}
    />
  );
}