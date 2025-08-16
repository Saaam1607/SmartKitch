import React, { useEffect, useState } from 'react';

import { Form, Button, ListGroup, InputGroup } from 'react-bootstrap';

import DishMiniCard from '../card/DishMiniCard';
import DishMicroCard from '../card/DishMicroCard';

import { X } from 'lucide-react';

interface MenuComboListProps {
  valueList: string[];
  dataList: string[];
  handleValueAddition: (value: string) => void;
  handleValueRemoval: (value: string) => void;
  fieldName: string;
  itemKey: string;
  isEditing: boolean;
}

export default function MenuComboList({ valueList, dataList, handleValueAddition, handleValueRemoval, fieldName, itemKey, isEditing }: MenuComboListProps) {

  const [valueToAdd, setValueToAdd] = useState("");
  const [availableValues, SetAvailableValues] = useState(dataList.filter(el => !valueList?.includes(el)));

  const [open, setOpen] = useState(false);

  useEffect(() => {
    SetAvailableValues(dataList.filter(el => !valueList?.includes(el)));
  }, [valueList])

  return (
    <Form.Group className="mb-1 d-flex flex-column align-items-left">
      <div
        style={{
          width: '100%',
          outline: 'none',
          color: '#212529',
          backgroundColor: 'transparent',
        }}
      >
        <ListGroup className="d-flex flex-row flex-wrap gap-2 rounded-0">
          {valueList?.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center gap-1 p-0 rounded-0 border-0"
              style={{
                width: '100%',
                backgroundColor: 'transparent',
              }}
            >
              <div
                className="m-0 w-100"
                style={{
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}  
              >
                <DishMiniCard
                  dishName={item}
                />
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {isEditing && (
          <InputGroup className="mt-1">
            <div style={{ position: "relative", width: "100%" }}>
              <div
                className="p-0 px-1 rounded-0"
                style={{
                  border: "1px solid #ced4da",
                  padding: "0.375rem 0.75rem",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
                onClick={() => setOpen(!open)}
              >
                {valueToAdd || <span style={{ color: "#6c757d" }}>Seleziona un piatto</span>}
              </div>

              {/* Dropdown */}
              {open && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    maxHeight: "200px",
                    overflowY: "auto",
                    border: "1px solid #ced4da",
                    borderRadius: "0.25rem",
                    backgroundColor: "white",
                    zIndex: 100,
                  }}
                >
                  {availableValues.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleValueAddition(item);
                        setValueToAdd("");
                        setOpen(false);
                      }}
                      style={{
                        padding: "0.25rem 0.5rem",
                        cursor: "pointer",
                        borderBottom: "1px solid #f1f1f1",
                      }}
                    >
                      <DishMicroCard dishName={item} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </InputGroup>
        )}
      </div>
    </Form.Group>
  );
}
