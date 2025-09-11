import React from 'react';
import { Form } from 'react-bootstrap';
import '../../../styles/formCheck.css';

interface CheckProps {
  itemKey: string;
  value: boolean;
  fieldName: string;
  isEditing: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Check({ itemKey, value, fieldName, isEditing, handleChange }: CheckProps) {
  return (
    <Form.Group className="mb-1">
      <div className={`checkbox-wrapper-42 ${isEditing ? 'editing' : ''}`}>
        <input
          id={`cbx-${fieldName}-${itemKey}`}
          type="checkbox"
          checked={value}
          onChange={handleChange}
          disabled={!isEditing}
          className={``}
        />
        <label className="cbx" htmlFor={`cbx-${fieldName}-${itemKey}`} style={{ userSelect: 'none' }}/>
        <label 
          className="lbl" 
          htmlFor={`cbx-${fieldName}-${itemKey}`}
          readOnly={!isEditing}
          style={{
            userSelect: 'none'
          }}
        >
          {fieldName}
        </label>
      </div>
    </Form.Group>
  );
}
