import React, { useEffect, useState } from 'react';

import { Form, Button, ListGroup, InputGroup } from 'react-bootstrap';

import { X } from 'lucide-react';

interface ComboListProps {
  valueList: string[];
  dataList: string[];
  handleValueAddition: (value: string) => void;
  handleValueRemoval: (value: string) => void;
  fieldName: string;
  itemKey: string;
  isEditing: boolean;
}

export default function ComboList({ valueList, dataList, handleValueAddition, handleValueRemoval, fieldName, itemKey, isEditing }: ComboListProps) {

  const [valueToAdd, setValueToAdd] = useState("");
  const [availableValues, SetAvailableValues] = useState(dataList.filter(el => !valueList.includes(el)));

  useEffect(() => {
    SetAvailableValues(dataList.filter(el => !valueList.includes(el)));
  }, [valueList])

  return (
    <Form.Group className="mb-1 d-flex flex-column align-items-left">
      <Form.Label
        className="m-0 ms-2"
        htmlFor={`${fieldName}-${itemKey}`}
        style={{
          fontSize: '0.85rem',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        {fieldName}
      </Form.Label>
      
      <div
        style={{
          width: '100%',
          padding: '0.2rem 0.5rem',
          outline: 'none',
          color: '#212529',
          backgroundColor: isEditing ? 'white' : 'transparent',
          border: isEditing ? '2px solid rgb(30, 109, 206)' : '2px solid lightgrey',
        }}
      >
        <ListGroup className="d-flex flex-row flex-wrap gap-2 rounded-0">
          {valueList.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center gap-1 p-0 px-1 rounded-0"
              style={{
                width: 'fit-content',
                backgroundColor: isEditing ? 'white' : 'transparent',
                border: isEditing ? '1px solid lightgrey' : '1px solid transparent'
              }}
            >
              <p
                className="m-0"
                style={{
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}  
              >
                {item}
              </p>
              
              <div
                className="py-1"
                style={{
                  height: '100%',
                    minWidth: '14px',
                    maxWidth: '14px',
                }}
              >
                {isEditing && (
                  <Button
                    className="d-flex justify-content-center align-items-center p-0 rounded-circle"
                    variant="secondary"
                    onClick={() => handleValueRemoval(item)}
                    style={{
                      minWidth: '14px',
                      minHeight: '14px',
                      maxWidth: '14px',
                      maxHeight: '14px',
                    }}
                  >
                    <X size={11} />
                  </Button>
                )}
                
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {isEditing && (
          <InputGroup className="mt-1">
            <Form.Select
              value={valueToAdd}
              className="p-0 px-1 rounded-0"
              onChange={(e) => setValueToAdd(e.target.value)}
            >
              <option value=""></option>
              {availableValues.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </Form.Select>
            <Button
              variant="success"
              className="p-0 px-2 rounded-0"
              onClick={() => {
                handleValueAddition(valueToAdd);
                setValueToAdd("");
              }}
              disabled={!valueToAdd}
            >
              Add
            </Button>
          </InputGroup>
        )}
      </div>
    </Form.Group>
  );
}
