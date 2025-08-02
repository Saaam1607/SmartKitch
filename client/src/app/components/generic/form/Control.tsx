import React, { useEffect, useState } from 'react';

import { Card, Form, Button, Image as BootstrapImage } from 'react-bootstrap';

import '../../../styles/scrollbar.css';

function TextArea({ item, value, fieldName, isEditing, handleChange }) {
  return (
    <textarea
      className="ps-2 rounded customScrollbar customTextarea"
      value={value}
      id={`${fieldName}-${item.name}`}
      onChange={handleChange}
      style={{
        backgroundColor: !isEditing ? 'transparent' : 'white',
        padding: '0.375rem 0.75rem',
        border: !isEditing ? '2px solid lightgrey' : '2px solid rgb(30, 109, 206)',
        lineHeight: '1.1',
        height: '60px',
        color: '#212529',
        resize: 'none',
        outline: 'none',
      }}
    />
  );
}

function TextInput({ item, value, fieldName, isEditing, handleChange }) {
  return (
    <input
      type="text"
      className="ps-2 rounded customScrollbar"
      value={value}
      id={`${fieldName}-${item.name}`}
      onChange={handleChange}
      style={{
        backgroundColor: !isEditing ? 'transparent' : 'white',
        padding: '0.375rem 0.75rem',
        border: !isEditing ? '2px solid lightgrey' : '2px solid rgb(30, 109, 206)',
        color: '#212529',
        outline: 'none',
      }}
    />
  );
}

export default function Control({ type, item, value, fieldName, isEditing, handleChange }) {

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

      {type === 'text' ? (
        <TextInput
          item={item}
          value={value}
          fieldName={fieldName}
          isEditing={isEditing}
          handleChange={handleChange}
        />
      ) : type === 'textarea' ? (
        <TextArea
          item={item}
          value={value}
          fieldName={fieldName}
          isEditing={isEditing}
          handleChange={handleChange}
        />
      ) : null}

    </Form.Group>
  );
}
