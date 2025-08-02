import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import '../../../styles/formCheck.css';

export default function Check({ item, value, fieldName, isEditing, handleChange }) {
  return (
    <Form.Group className="mb-1">
      <div className={`checkbox-wrapper-42 ${isEditing ? 'editing' : ''}`}>
        <input
          id={`cbx-${fieldName}-${item.name}`}
          type="checkbox"
          checked={value}
          onChange={handleChange}
          disabled={!isEditing}
          className={``}
        />
        <label className="cbx" htmlFor={`cbx-${fieldName}-${item.name}`} style={{ userSelect: 'none' }}/>
        <label 
          className="lbl" 
          htmlFor={`cbx-${fieldName}-${item.name}`}
          style={{
            pointerEvents: isEditing ? 'auto' : 'none',
            userSelect: 'none'
          }}
        >
          {fieldName}
        </label>
      </div>
    </Form.Group>
  );
}
