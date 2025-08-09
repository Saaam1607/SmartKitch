import React from 'react';

import { Form } from 'react-bootstrap';
import Switch from "react-switch";

import '../../../styles/switch.css';

interface SwitchProps {
  itemKey: string;
  value: boolean;
  fieldName: string;
  isEditing: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Switch({ itemKey, value, fieldName, isEditing, handleChange }: SwitchProps) {
  return (
    <Form.Group className="mb-1">
      <div className={`${isEditing ? 'editing' : ''}`}>
        <Form.Check 
          type="switch"
          id={`cbx-${fieldName}-${itemKey}`}
          label={fieldName}
          checked={value}
          onChange={handleChange}
          className="d-flex align-items-center justify-content-start m-0 p-0 gap-2"
        />
      </div>
    </Form.Group>
  );
}
