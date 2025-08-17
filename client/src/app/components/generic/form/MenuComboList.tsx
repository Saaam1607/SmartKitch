import React, { useEffect, useState } from 'react';

import { Form, Button, ListGroup, InputGroup } from 'react-bootstrap';

import Modal from '../modal/Modal';

import DishMiniCard from '../card/DishMiniCard';
import DishMicroCard from '../card/DishMicroCard';

import { X, SquarePlus } from 'lucide-react';

interface MenuComboListProps {
  valueList: string[];
  dataList: {dish: string, menuSection: string}[];
  handleArraySet: (newArray: string[], fieldName: string) => void;
  fieldName: string;
  itemKey: string;
  isEditing: boolean;
}

export default function MenuComboList({ valueList, dataList, handleArraySet, fieldName, itemKey, isEditing }: MenuComboListProps) {

  const [availableValues, setAvailableValues] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const data = dataList.map(item => ({
      ...item,
      isSelected: valueList?.includes(item.item) ?? false
    }));
    setAvailableValues(data);
  }, [valueList, dataList]);

  function closeModal() {
    setIsModalVisible(false);
  }

  function handleSelectionChange(item: string) {
    setAvailableValues(prev =>
      prev.map(el =>
        el.item === item ? { ...el, isSelected: !el.isSelected } : el
      )
    );
  }

  function saveChangesFromModal() {
    handleArraySet(
      availableValues.filter(el => el.isSelected).map(el => el.item),
      fieldName
    );
    closeModal();
  }

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
              <Button
                className="d-flex align-items-center p-1 px-2 m-0"
                onClick={() => setIsModalVisible(true)}
                style={{
                  borderColor: "rgb(219, 123, 33)",
                  backgroundColor: "transparent",
                  color: "rgb(219, 123, 33)",
                }}
              >
                <SquarePlus size={22} className="me-2" />
                <p className="m-0 p-0">
                  Add new
                </p>
              </Button>

              <Modal
                title="Add or Remove Dishes"
                show={isModalVisible}
                close={closeModal}
                saveItem={saveChangesFromModal}
              >
                <div className="d-flex flex-column gap-1">
                  {availableValues.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (item.menuSection === "")
                          handleSelectionChange(item.item);
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <DishMicroCard
                        dishName={item.item}
                        isSelected={item.isSelected}
                        menuSection={item.menuSection}
                      />
                    </div>
                  ))}
                </div>
              </Modal>
              
            </div>
          </InputGroup>
        )}
      </div>
    </Form.Group>
  );
}
